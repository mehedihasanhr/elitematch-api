import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/session')
  @ApiOperation({ summary: 'Create a subscription checkout session' })
  @UseGuards(JwtAuthGuard)
  async createSubscriptionSession(
    @Body() data: CreateSubscriptionDto,
    @Auth('id') authId: number,
  ) {
    return this.subscriptionService.create(data, authId);
  }
}
