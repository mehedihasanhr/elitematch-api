import { Module } from '@nestjs/common';
import { MatchCalculatorService } from './match-calculator.service';
import { MatchCalculatorController } from './match-calculator.controller';

@Module({
  controllers: [MatchCalculatorController],
  providers: [MatchCalculatorService],
})
export class MatchCalculatorModule {}
