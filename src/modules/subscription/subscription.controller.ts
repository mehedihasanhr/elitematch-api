import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';
import { UserSubscriptionQueryDto } from './dto/user-subscription-query.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /** Get user subscription details */
  @ApiOperation({ summary: 'Get user subscription details' })
  @Get()
  @ApiQuery({ name: 'userId', required: true, type: String })
  async getUserSubscription(@Query() query: UserSubscriptionQueryDto) {
    return this.subscriptionService.getUserSubscription(Number(query.userId));
  }

  /** Create a subscription checkout session */
  @Post('/session')
  @ApiOperation({ summary: 'Create a subscription checkout session' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createSubscriptionSession(
    @Body() data: CreateSubscriptionDto,
    @Auth('id') authId: number,
  ) {
    console.log({ authId });
    return this.subscriptionService.create(data, authId);
  }

  /** Handle Stripe webhook events */
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  @Post('/stripe/webhook')
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    const payload = req.rawBody?.toString('utf8');
    if (!payload) {
      return;
    }
    return this.subscriptionService.handleStripeWebhook(payload, sig);
  }
}
