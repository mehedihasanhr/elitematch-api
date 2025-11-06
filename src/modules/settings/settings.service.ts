import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { MailConfigCreateDto } from './dto/mail-config-create.dto';
import { UpdatePaymentConfigDto } from './dto/update-payment-config.dto';

@ApiTags('Settings')
@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Configures or retrieves the payment settings for the application.
   */
  async getPaymentConfigForUser() {
    return this.prisma.paymentConfig.findMany({
      where: { isActive: true },
      select: {
        id: true,
        provider: true,
      },
    });
  }

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

  /**************************************************/
  /*********** Mail Configuration ***********/

  /** Create or update mail configuration. */
  async updateMailConfig(dto: MailConfigCreateDto) {
    try {
      const data = await this.prisma.mailConfig.upsert({
        where: { id: 1 },
        update: dto,
        create: dto,
      });
      return {
        data,
        message: 'Mail configuration saved successfully',
        status: 'success',
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'A mail configuration with the same unique field already exists.',
          );
        }

        if (error.code === 'P2025') {
          throw new BadRequestException({
            message: 'Mail configuration not found for update.',
          });
        }
      }
    }
  }

  /**
   * Fetch the existing mail configuration.
   */
  async getMailConfig() {
    return this.prisma.mailConfig.findFirst();
  }
}
