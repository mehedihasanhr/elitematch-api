import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { multerOptions } from 'src/cores/config/multer.conf';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSiteMetadataDto } from './dto/create-site-metadata.dto';
import { UpdateSiteMetadataDto } from './dto/update-site-metadata.dto';
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
  @ApiBody({ type: CreateSiteMetadataDto })
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
    @Body() CreateSiteMetadataDto: CreateSiteMetadataDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
    },
  ) {
    return this.siteMetadataService.create(
      CreateSiteMetadataDto,
      files.logo?.[0],
      files.favicon?.[0],
    );
  }

  @Get()
  findOne() {
    return this.siteMetadataService.findOne();
  }

  @Put('/upsert')
  @ApiOperation({ summary: 'Create or update site metadata' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateSiteMetadataDto,
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
  upsert(
    @Body() createSiteMetadataDto: CreateSiteMetadataDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
    },
  ) {
    return this.siteMetadataService.upsert(
      createSiteMetadataDto,
      files.logo?.[0],
      files.favicon?.[0],
    );
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateSiteMetadataDto })
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
    @Body() updateSiteMetadataDto: UpdateSiteMetadataDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
    },
  ) {
    return this.siteMetadataService.update(
      updateSiteMetadataDto,
      files.logo?.[0],
      files.favicon?.[0],
    );
  }
}
