import { MatchStage, MatchStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchCalculatorDto {
  @Type(() => Number)
  @IsInt({ message: 'matchMakerId must be an integer' })
  @IsNotEmpty({ message: 'matchMakerId should not be empty' })
  matchMakerId: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'coupleAId should not be empty' })
  coupleAId: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'coupleBId should not be empty' })
  coupleBId: number;

  @IsEnum(MatchStatus)
  @IsNotEmpty({ message: 'matchStatus should not be empty' })
  matchStatus: MatchStatus;

  @IsEnum(MatchStage)
  @IsNotEmpty({ message: 'matchStage should not be empty' })
  matchStage: MatchStage;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'isActive should not be empty' })
  isActive: boolean;
}
