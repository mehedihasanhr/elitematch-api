import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ToBoolean } from 'src/cores/decorators/to-boolean.dto';

export class CreatePaymentConfigDto {
  @ApiProperty({
    example: PaymentProvider.STRIPE,
    description: 'The payment provider to be used',
  })
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @ApiProperty({
    example: 'secret Api key',
    description: 'The API key for the payment provider',
  })
  @IsString()
  secretApiKey: string;

  @ApiProperty({
    example: 'public api key',
    description: 'The Public API key for the payment provider',
  })
  @IsString()
  @IsOptional()
  publicApiKey: string;

  @ApiProperty({
    example: 'webhook secret',
    description: 'The webhook secret for the payment provider',
  })
  @IsString()
  webhookSecret: string;

  @ApiProperty({
    example: 'v1',
    description: 'Api version if applicable',
  })
  @IsString()
  @IsOptional()
  version: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if this payment configuration is active',
  })
  @ToBoolean()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates if this payment configuration is active',
  })
  @IsEnum(['test', 'live'])
  @IsOptional()
  mode: string;
}
