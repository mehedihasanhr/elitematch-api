import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { Auth } from '../auth/auth.decorator';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/checkout-session')
  @ApiOperation({
    summary: 'Create a checkout session for subscription',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateCheckoutSessionDto,
  })
  async createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto,
    @Auth('id') userId: number,
  ) {
    return this.subscriptionService.getStripeSubscriptionIntent(dto, userId);
  }
}
