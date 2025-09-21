import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoogleScriptService } from './google-script.service';
import { CreateGoogleScriptDto } from './dto/create-google-script.dto';
import { UpdateGoogleScriptDto } from './dto/update-google-script.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('google-script')
@Controller('google-script')
export class GoogleScriptController {
  constructor(private readonly googleScriptService: GoogleScriptService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Google Script' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateGoogleScriptDto })
  create(@Body() createGoogleScriptDto: CreateGoogleScriptDto) {
    return this.googleScriptService.create(createGoogleScriptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Google Scripts' })
  findAll() {
    return this.googleScriptService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Google Script by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateGoogleScriptDto: UpdateGoogleScriptDto,
  ) {
    return this.googleScriptService.update(+id, updateGoogleScriptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Google Script by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.googleScriptService.remove(+id);
  }
}
