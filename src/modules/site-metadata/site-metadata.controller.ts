import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/cores/config/multer.conf';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSiteMetadatumDto } from './dto/create-site-metadatum.dto';
import { UpdateSiteMetadatumDto } from './dto/update-site-metadatum.dto';
import { SiteMetadataService } from './site-metadata.service';

@ApiTags('site-metadata')
@Controller('site-metadata')
export class SiteMetadataController {
  constructor(private readonly siteMetadataService: SiteMetadataService) {}

  /**
   * Create a new site metadata entry.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateSiteMetadatumDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: { type: 'string', format: 'binary' },
        favicon: { type: 'string', format: 'binary' },
      },
    },
  })
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

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateSiteMetadatumDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: { type: 'string', format: 'binary' },
        favicon: { type: 'string', format: 'binary' },
      },
      required: [],
    },
  })
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
    @Body() updateSiteMetadatumDto: UpdateSiteMetadatumDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
    },
  ) {
    return this.siteMetadataService.update(
      updateSiteMetadatumDto,
      files.logo?.[0],
      files.favicon?.[0],
    );
  }
}
