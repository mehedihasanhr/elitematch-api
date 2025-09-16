import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { StripeService } from 'src/cores/modules/stripe/stripe.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
  ) {}

  async getStripeSubscriptionIntent(
    dto: CreateCheckoutSessionDto,
    userId?: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    const customer = await this.stripe.getOrCreateCustomer(user.id, user.email);

    const session = await this.stripe.createCheckoutSession({
      mode: dto.mode,
      priceId: dto.priceId,
      lineItems: dto.lineItems,
      successUrl: `${dto.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: dto.cancelUrl,
      customerId: customer.id,
    });
    return { id: session.id, url: session.url };
  }
}
