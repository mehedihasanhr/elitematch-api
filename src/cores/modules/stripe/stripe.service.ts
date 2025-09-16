import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private readonly stripe: Stripe;

  constructor(config: ConfigService) {
    const apiKey = config.get<string>('STRIPE_SECRET_KEY');
    if (!apiKey) {
      this.logger.warn(
        'STRIPE_SECRET_KEY is not set. Stripe features disabled.',
      );
    }
    this.stripe = new Stripe(apiKey ?? 'sk_test_placeholder', {
      apiVersion: '2025-08-27.basil',
    });
  }

  // Create or get a Stripe customer for a user
  async getOrCreateCustomer(
    userId: number,
    email?: string,
  ): Promise<Stripe.Customer> {
    // In a real app, store stripeCustomerId on your User model
    // For now, search by email if provided, otherwise create new
    if (!email) {
      return this.stripe.customers.create({
        metadata: { appUserId: String(userId) },
      });
    }

    const existing = await this.stripe.customers.search({
      query: `email:'${email}'`,
    });
    if (existing.data[0]) return existing.data[0];

    return this.stripe.customers.create({
      email,
      metadata: { appUserId: String(userId) },
    });
  }

  // Create a Checkout Session for one-time payment or subscription
  async createCheckoutSession(params: {
    mode: 'payment' | 'subscription';
    priceId?: string;
    lineItems?: { price: string; quantity?: number }[];
    successUrl: string;
    cancelUrl: string;
    customerId?: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Checkout.Session> {
    const {
      mode,
      priceId,
      lineItems,
      successUrl,
      cancelUrl,
      customerId,
      metadata,
    } = params;

    const items =
      mode === 'subscription'
        ? [{ price: priceId as string, quantity: 1 }]
        : (lineItems ?? []);

    const session = await this.stripe.checkout.sessions.create({
      mode,
      customer: customerId,
      line_items: items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      allow_promotion_codes: true,
    });

    return session;
  }

  // Create/attach a Payment Method to a customer
  async attachPaymentMethod(
    customerId: string,
    paymentMethodId: string,
  ): Promise<void> {
    await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    await this.stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  }

  // Create subscription for a customer
  async createSubscription(
    customerId: string,
    priceId: string,
    trialDays = 0,
  ): Promise<Stripe.Subscription> {
    const sub = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays || undefined,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    return sub;
  }

  // Handle webhook verification
  verifyWebhookSignature(
    payload: string | Buffer,
    signature: string,
    endpointSecret: string,
  ): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret,
    );
  }
}
