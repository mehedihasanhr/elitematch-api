import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/cores/config/multer.conf';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSiteMetadatumDto } from './dto/create-site-metadatum.dto';
import { UpdateSiteMetadatumDto } from './dto/update-site-metadatum.dto';
import { SiteMetadataService } from './site-metadata.service';

@Controller('site-metadata')
export class SiteMetadataController {
  constructor(private readonly siteMetadataService: SiteMetadataService) {}

  /**
   * Create a new site metadata entry.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  create(
    @Body() createSiteMetadatumDto: CreateSiteMetadatumDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
    },
  ) {
    return this.siteMetadataService.create(
      createSiteMetadatumDto,
      files.logo?.[0],
      files.favicon?.[0],
    );
  }

  @Get()
  findOne() {
    return this.siteMetadataService.findOne();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  update(
    @Param('id') id: string,
    @Body() updateSiteMetadatumDto: UpdateSiteMetadatumDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
    },
  ) {
    return this.siteMetadataService.update(
      +id,
      updateSiteMetadatumDto,
      files.logo?.[0],
      files.favicon?.[0],
    );
  }
}
