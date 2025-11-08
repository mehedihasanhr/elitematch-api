import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { ToNumber } from 'src/cores/decorators/to-number.dto';

export class SubscriptionQueryDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Page number for pagination',
    required: false,
  })
  @ToNumber()
  @IsNumber({}, { message: 'page must be a number string' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Number of items per page for pagination',
    required: false,
  })
  @ToNumber()
  @IsNumber({}, { message: 'limit must be a number string' })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'User ID to filter subscriptions',
    required: false,
  })
  @ToNumber()
  @IsNumber({}, { message: 'userId must be a number string' })
  @IsOptional()
  userId?: number;
}
