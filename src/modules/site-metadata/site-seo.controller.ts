import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSiteMetaSeoDto } from './dto/create-site-meta-seo.dto';
import { UpdateSiteMetaSeoDto } from './dto/update-site-meta-seo.dto';
import { SiteMetaSeoService } from './site-seo.service';

@ApiTags('site-seo')
@Controller('site-seo')
export class SiteMetaSeoController {
  constructor(private readonly siteMetaSeoService: SiteMetaSeoService) {}

  /**
   * Create a new site metadata entry.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateSiteMetaSeoDto })
  create(@Body() createSiteMetaSeoDto: CreateSiteMetaSeoDto) {
    return this.siteMetaSeoService.create(createSiteMetaSeoDto);
  }

  @Get()
  findOne() {
    return this.siteMetaSeoService.findOne();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateSiteMetaSeoDto })
  update(
    @Param('id') id: string,
    @Body() updateSiteMetaSeoDto: UpdateSiteMetaSeoDto,
  ) {
    return this.siteMetaSeoService.update(+id, updateSiteMetaSeoDto);
  }
}
