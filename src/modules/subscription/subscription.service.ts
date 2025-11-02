import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { StripeService } from 'src/cores/modules/stripe/stripe.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PaymentProvider } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
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
}
