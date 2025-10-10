import { Module } from '@nestjs/common';
import { RateMeetupService } from './rate-meetup.service';
import { RateMeetupController } from './rate-meetup.controller';

@Module({
  controllers: [RateMeetupController],
  providers: [RateMeetupService],
})
export class RateMeetupModule {}
