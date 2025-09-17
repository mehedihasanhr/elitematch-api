import { PartialType } from '@nestjs/swagger';
import { CreateMatchCalculatorDto } from './create-match-calculator.dto';

export class UpdateMatchCalculatorDto extends PartialType(CreateMatchCalculatorDto) {}
