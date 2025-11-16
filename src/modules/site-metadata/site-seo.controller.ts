import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSiteMetaSeoDto } from './dto/create-site-meta-seo.dto';
import { SiteMetaSeoService } from './site-seo.service';

@ApiTags('site-seo')
@Controller('site-seo')
export class SiteMetaSeoController {
  constructor(private readonly siteMetaSeoService: SiteMetaSeoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateSiteMetaSeoDto })
  upsert(@Body() createSiteMetaSeoDto: CreateSiteMetaSeoDto) {
    return this.siteMetaSeoService.upsert(createSiteMetaSeoDto);
  }

  @Get()
  findOne() {
    return this.siteMetaSeoService.findOne();
  }
}
