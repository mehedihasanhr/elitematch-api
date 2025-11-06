import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MailConfigCreateDto } from './dto/mail-config-create.dto';
import { UpdatePaymentConfigDto } from './dto/update-payment-config.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/payment-config')
  @ApiOperation({ summary: 'Get payment configuration' })
  async getPaymentConfig() {
    return this.settingsService.getPaymentConfig();
  }

  @Get('/payment-config/user')
  @ApiOperation({ summary: 'Get payment configuration for user' })
  async getPaymentConfigForUser() {
    return this.settingsService.getPaymentConfigForUser();
  }

  // update payment configuration
  @Patch('/payment-config/update')
  @ApiOperation({ summary: 'Update payment configuration' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePaymentConfigDto })
  updatePaymentConfig(@Body() body: UpdatePaymentConfigDto) {
    return this.settingsService.updatePaymentConfig(body);
  }

  /*********************************/
  /************ Mail Config ********/
  @Post('/mail-configs/update')
  @ApiOperation({ summary: 'Create mail configuration' })
  @ApiBody({ type: MailConfigCreateDto })
  async updateMailconfig(@Body() dto: MailConfigCreateDto) {
    return this.settingsService.updateMailConfig(dto);
  }

  @Get('/mail-configs')
  @ApiOperation({ summary: 'Get mail configuration' })
  async getMailConfig() {
    return this.settingsService.getMailConfig();
  }
}
