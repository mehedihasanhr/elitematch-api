import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { GoogleScriptService } from './google-script.service';
import { CreateGoogleScriptDto } from './dto/create-google-script.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('google-script')
@Controller('google-script')
export class GoogleScriptController {
  constructor(private readonly googleScriptService: GoogleScriptService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Google Scripts' })
  findAll() {
    return this.googleScriptService.findAll();
  }

  @Patch(':gtype')
  @ApiOperation({ summary: 'Update a Google Script by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('gtype') gtype: string, @Body() dto: CreateGoogleScriptDto) {
    return this.googleScriptService.update(gtype, dto);
  }
}
