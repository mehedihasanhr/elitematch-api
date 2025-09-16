import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CheckoutLineItemDto {
  @ApiProperty({ description: 'Stripe Price ID', example: 'price_123' })
  @IsString()
  price!: string;

  @ApiPropertyOptional({
    description: 'Quantity for one-time items',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
