import { ApiProperty } from '@nestjs/swagger';
import { MatchStage, MatchStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchCalculatorDto {
  @ApiProperty({
    description: 'ID of the match maker creating the couple',
    example: 1,
  })
  @Type(() => Number)
  @IsInt({ message: 'matchMakerId must be an integer' })
  @IsNotEmpty({ message: 'matchMakerId should not be empty' })
  matchMakerId: number;

  @ApiProperty({
    description: 'ID of the first couple',
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'coupleAId should not be empty' })
  coupleAId: number;

  @ApiProperty({
    description: 'ID of the second couple',
    example: 3,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'coupleBId should not be empty' })
  coupleBId: number;

  @ApiProperty({
    description: 'Status of the match',
    example: 'PENDING',
    enum: MatchStatus,
  })
  @IsEnum(MatchStatus)
  @IsNotEmpty({ message: 'matchStatus should not be empty' })
  matchStatus: MatchStatus;

  @ApiProperty({
    description: 'Stage of the match',
    example: 'INITIAL',
    enum: MatchStage,
  })
  @IsEnum(MatchStage)
  @IsNotEmpty({ message: 'matchStage should not be empty' })
  matchStage: MatchStage;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'isActive should not be empty' })
  isActive: boolean;
}
