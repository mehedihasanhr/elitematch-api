import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentProvider } from '@prisma/client';

@Injectable()
export class StripeService {
  private logger = new Logger(StripeService.name);
  private stripe: Stripe;
  private config: {
    apiVersion: Stripe.LatestApiVersion;
    apiKey: string;
    webhookSecret: string;
  };

  constructor(private readonly prisma: PrismaService) {}

  // Dynamically initialize Stripe client from DB
  private async initStripe(): Promise<Stripe> {
    const credentials = await this.prisma.paymentConfig.findFirst({
      where: { provider: PaymentProvider.STRIPE },
    });

    if (!credentials || !credentials.secretApiKey) {
      this.logger.error('Stripe credentials not found in DB.');
      throw new Error('Stripe not initialized');
    }

    const apiVersion = (credentials.version ||
      '2025-08-27.basil') as Stripe.LatestApiVersion;

    this.config = {
      apiVersion,
      apiKey: credentials.secretApiKey,
      webhookSecret: credentials.webhookSecret || '',
    };
    this.stripe = new Stripe(credentials.secretApiKey, { apiVersion });
    return this.stripe;
  }

  // Create or get a Stripe customer
  async getOrCreateCustomer(
    userId: number,
    email?: string,
  ): Promise<Stripe.Customer> {
    const stripe = await this.initStripe();

    if (!email) {
      return stripe.customers.create({
        metadata: { appUserId: String(userId) },
      });
    }

    const existing = await stripe.customers.search({
      query: `email:'${email}'`,
    });
    if (existing.data[0]) return existing.data[0];

    return stripe.customers.create({
      email,
      metadata: { appUserId: String(userId) },
    });
  }

  // Create a subscription price dynamically
  async createSubscriptionPrice(params: {
    planName: string;
    unitAmount: number; // in cents
    currency: string;
    interval?: 'day' | 'week' | 'month' | 'year';
    intervalCount?: number;
    nickname?: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Price> {
    const stripe = await this.initStripe();

    const price = await stripe.prices.create({
      unit_amount: params.unitAmount,
      currency: params.currency,
      recurring: {
        interval: params.interval || 'month',
        interval_count: params.intervalCount || 1,
      },
      product_data: {
        name: params.planName || 'Subscription Plan',
      },
      nickname: params.nickname,
      metadata: params.metadata,
    });

    return price;
  }

  // Create subscription checkout session
  async createSubscriptionCheckoutSession(params: {
    userId: number;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    customerId?: string;
    metadata?: Record<string, string>;
  }): Promise<{ session: Stripe.Checkout.Session; url: string }> {
    const stripe = await this.initStripe();

    let customerId = params.customerId;
    if (!customerId) {
      const customer = await this.getOrCreateCustomer(
        params.userId,
        params?.metadata?.userEmail,
      );
      customerId = customer.id;
      await this.prisma.user.update({
        where: { id: params.userId },
        data: { skCustomerId: customerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      throw new Error('Failed to create Stripe checkout session URL');
    }

    return { session, url: session.url };
  }

  // webhook handler can be added here
  async webhookEvent(payload: string, sig: string) {
    if (!this.stripe) {
      await this.initStripe();
    }

    const webhookSecret = this.config.webhookSecret;

    if (!webhookSecret) {
      this.logger.error('Stripe webhook secret not configured.');
      return;
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err) {
      this.logger.error('Error verifying Stripe webhook signature:', err);
      throw new Error('Webhook verification failed');
    }

    return event;
  }
}
