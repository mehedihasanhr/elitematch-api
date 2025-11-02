import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { CreateSubscriptionPlanDto } from 'src/modules/subscription-plan/dto/create-subscription-plan.dto';

export class UpdatePaymentConfigDto extends PartialType(
  CreateSubscriptionPlanDto,
) {
  @ApiProperty({
    example: PaymentProvider.STRIPE,
    description: 'The payment provider to be used',
  })
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;
}
