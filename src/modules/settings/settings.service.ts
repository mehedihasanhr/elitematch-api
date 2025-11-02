import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { UpdatePaymentConfigDto } from './dto/update-payment-config.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Settings')
@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Configures or retrieves the payment settings for the application.
   */
  async getPaymentConfig() {
    return this.prisma.paymentConfig.findMany();
  }

  /**
   * Configures or updates the payment settings for a specified provider.
   * @param data - The payment configuration data to be updated.
   */
  async updatePaymentConfig(data: UpdatePaymentConfigDto) {
    try {
      const updateData = await this.prisma.paymentConfig.update({
        where: { provider: data.provider },
        data,
      });

      return {
        data: updateData,
        message: 'Payment configuration updated successfully',
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Payment configuration for provider ${data.provider} not found.`,
          );
        }
        if (error.code === 'P2002') {
          throw new BadRequestException({
            message: `Payment configuration with provider ${data.provider} already exists.`,
          });
        }
      }
    }
  }
}
