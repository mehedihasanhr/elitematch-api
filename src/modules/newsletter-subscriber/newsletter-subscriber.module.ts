import { Module } from '@nestjs/common';
import { NewsletterSubscriberService } from './newsletter-subscriber.service';
import { NewsletterSubscriberController } from './newsletter-subscriber.controller';

@Module({
  controllers: [NewsletterSubscriberController],
  providers: [NewsletterSubscriberService],
})
export class NewsletterSubscriberModule {}
