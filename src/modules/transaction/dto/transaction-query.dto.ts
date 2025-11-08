import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { ToNumber } from 'src/cores/decorators/to-number.dto';

export class TransactionQueryDto {
  @ApiProperty({
    type: String,
    description: 'Page number for pagination',
    required: true,
  })
  @ToNumber()
  @IsNumber({}, { message: 'page must be a number string' })
  page?: number;

  @ApiProperty({
    type: String,
    description: 'Number of items per page for pagination',
    required: true,
  })
  @ToNumber()
  @IsNumber({}, { message: 'limit must be a number string' })
  limit?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'User ID to filter transactions',
    required: false,
  })
  @ToNumber()
  @IsNumber({}, { message: 'userId must be a number string' })
  @IsOptional()
  userId?: number;
}
