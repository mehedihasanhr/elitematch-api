import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuickLinkService } from './quick-link.service';
import { CreateQuickLinkDto } from './dto/create-quick-link.dto';
import { UpdateQuickLinkDto } from './dto/update-quick-link.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quick-link')
@Controller('quick-link')
export class QuickLinkController {
  constructor(private readonly quickLinkService: QuickLinkService) {}

  @Post()
  create(@Body() createQuickLinkDto: CreateQuickLinkDto) {
    return this.quickLinkService.create(createQuickLinkDto);
  }

  @Get()
  findAll() {
    return this.quickLinkService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuickLinkDto: UpdateQuickLinkDto,
  ) {
    return this.quickLinkService.update(+id, updateQuickLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quickLinkService.remove(+id);
  }
}
