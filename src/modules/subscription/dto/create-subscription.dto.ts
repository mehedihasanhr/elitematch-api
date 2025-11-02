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

  @ToNumber()
  @IsNumber()
  @IsNotEmpty({ message: 'Subscription plan ID must not be empty' })
  planId: number;

  @IsString()
  @IsNotEmpty({ message: 'Success URL must not be empty' })
  successUrl: string;

  @IsString()
  @IsNotEmpty({ message: 'Cancel URL must not be empty' })
  cancelUrl: string;
}
