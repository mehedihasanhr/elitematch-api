import { Module } from '@nestjs/common';
import { MatchMakersService } from './match-makers.service';
import { MatchMakersController } from './match-makers.controller';

@Module({
  controllers: [MatchMakersController],
  providers: [MatchMakersService],
})
export class MatchMakersModule {}
