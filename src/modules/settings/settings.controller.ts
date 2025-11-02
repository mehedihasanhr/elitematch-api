import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

  // update payment configuration
  @Patch('/payment-config/update')
  @ApiOperation({ summary: 'Update payment configuration' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePaymentConfigDto })
  updatePaymentConfig(@Body() body: UpdatePaymentConfigDto) {
    return this.settingsService.updatePaymentConfig(body);
  }
}
