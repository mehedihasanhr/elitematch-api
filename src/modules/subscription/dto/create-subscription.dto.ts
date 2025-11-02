import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from '@prisma/client';
import { ToNumber } from 'src/cores/decorators/to-number.dto';

export class CreateSubscriptionDto {
  @IsEnum(PaymentProvider, {
    message: `Provider must be one of the following values: ${Object.values(PaymentProvider).join(', ')}`,
  })
  @ApiProperty({
    type: String,
    enum: PaymentProvider,
    description: 'The payment provider to be used',
    example: PaymentProvider.STRIPE,
  })
  @IsNotEmpty({ message: 'Payment provider must not be empty' })
  provider: PaymentProvider;

  @ApiProperty({
    example: 1,
    description: 'The ID of the subscription plan',
  })
  @ToNumber()
  @IsNumber()
  @IsNotEmpty({ message: 'Subscription plan ID must not be empty' })
  planId: number;

  @ApiProperty({
    example: 'https://example.com/success',
    description: 'The URL to redirect to upon successful subscription',
  })
  @IsString()
  @IsNotEmpty({ message: 'Success URL must not be empty' })
  successUrl: string;

  @ApiProperty({
    example: 'https://example.com/cancel',
    description: 'The URL to redirect to if the subscription is cancelled',
  })
  @IsString()
  @IsNotEmpty({ message: 'Cancel URL must not be empty' })
  cancelUrl: string;
}
