import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

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
