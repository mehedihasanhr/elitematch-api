import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentProvider } from '@prisma/client';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { StripeService } from 'src/cores/modules/stripe/stripe.service';
import Stripe from 'stripe';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionGateway } from './subscription.gateway';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
    private readonly gateway: SubscriptionGateway,
  ) {}

  /**
   * Create a subscription checkout session
   *  @param data - The subscription creation data
   *  @param authId - The authenticated user ID
   */
  async create(data: CreateSubscriptionDto, authId?: number) {
    const { provider, planId } = data;

    if (!authId) throw new BadRequestException({ message: 'Unauthorized' });

    const planDetails = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    // throw error if planDetails is null
    if (!planDetails)
      throw new BadRequestException({ message: 'Invalid plan ID' });

    const user = await this.prisma.user.findUnique({
      where: { id: authId },
    });

    switch (provider) {
      case PaymentProvider.STRIPE: {
        const price = await this.stripeService.createSubscriptionPrice({
          planName: planDetails.name,
          currency: 'usd',
          unitAmount: planDetails.price * 100,
          interval: 'month',
          metadata: {
            planId: planId.toString(),
          },
        });

        const checkoutSession =
          await this.stripeService.createSubscriptionCheckoutSession({
            priceId: price.id,
            userId: authId,
            successUrl: data.successUrl,
            cancelUrl: data.cancelUrl,
            customerId: user?.skCustomerId || undefined,
            metadata: {
              planId: planId.toString(),
              userId: authId.toString(),
              userEmail: user?.email || '',
            },
          });

        return checkoutSession;
      }
      default:
        throw new BadRequestException({
          message: 'Unsupported payment provider',
        });
    }
  }

  /**
   * Stripe webhook handler
   */
  async handleStripeWebhook(payload: string, sig: string) {
    const event = await this.stripeService.webhookEvent(payload, sig);
    console.log({ event });
    if (!event)
      throw new BadRequestException({ message: 'Invalid Stripe webhook' });

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSessionCompleted(event.data.object);
        break;
      default:
        break;
    }
  }

  /**
   * Handle Stripe checkout session completed event
   * @param session - The Stripe checkout session object
   */
  async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const { metadata } = session;
    if (!metadata) return;
    const userId = parseInt(metadata.userId || '0', 10);
    const planId = parseInt(metadata.planId || '0', 10);

    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!userId || !planId || !plan) return;

    if (session.payment_status === 'paid' && plan) {
      // create subscription record in the database
      const subscribed = await this.prisma.subscription.create({
        data: {
          userId,
          planId,
          startDate: new Date(),
          endDate: new Date(session.expires_at),
          profileViewsLeft: plan.maxProfileView,
          messagesLeft: plan.maxMessages,
          isActive: true,
        },
      });

      setTimeout(() => {
        this.gateway.sendPaymentSuccess(userId.toString(), {
          subscriptionId: subscribed.id,
          plan,
          ...subscribed,
        });
      }, 1000);
    }
    return;
  }
}
