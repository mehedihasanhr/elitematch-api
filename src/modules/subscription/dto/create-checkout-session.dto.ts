import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CheckoutLineItemDto } from './checkout-line-item.dto';

export class CreateCheckoutSessionDto {
  @ApiProperty({
    enum: ['subscription', 'payment'] as const,
    example: 'subscription',
  })
  @IsEnum(['subscription', 'payment'])
  mode!: 'subscription' | 'payment';

  @ApiPropertyOptional({
    description: 'Required when mode is subscription',
    example: 'price_123',
  })
  @IsString()
  priceId?: string;

  @ApiPropertyOptional({
    type: [CheckoutLineItemDto],
    description: 'Required when mode is payment',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutLineItemDto)
  lineItems?: CheckoutLineItemDto[];

  @ApiProperty({
    example: 'https://example.com/success',
  })
  @IsUrl()
  successUrl!: string;

  @ApiProperty({ example: 'https://example.com/cancel' })
  @IsUrl()
  cancelUrl!: string;
}
