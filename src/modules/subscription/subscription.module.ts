import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionGateway } from './subscription.gateway';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionGateway],
})
export class SubscriptionModule {}
