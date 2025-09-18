import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoogleScriptService } from './google-script.service';
import { CreateGoogleScriptDto } from './dto/create-google-script.dto';
import { UpdateGoogleScriptDto } from './dto/update-google-script.dto';

@Controller('google-script')
export class GoogleScriptController {
  constructor(private readonly googleScriptService: GoogleScriptService) {}

  @Post()
  create(@Body() createGoogleScriptDto: CreateGoogleScriptDto) {
    return this.googleScriptService.create(createGoogleScriptDto);
  }

  @Get()
  findAll() {
    return this.googleScriptService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoogleScriptDto: UpdateGoogleScriptDto,
  ) {
    return this.googleScriptService.update(+id, updateGoogleScriptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googleScriptService.remove(+id);
  }
}
