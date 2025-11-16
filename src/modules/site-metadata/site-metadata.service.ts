import { BadRequestException, Injectable } from '@nestjs/common';
import { FileService } from 'src/cores/modules/file/file.service';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateSiteMetadataDto } from './dto/create-site-metadata.dto';
import { UpdateSiteMetadataDto } from './dto/update-site-metadata.dto';

@Injectable()
export class SiteMetadataService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  /**
   * Create a new site metadata entry.
   * @param CreateSiteMetadataDto - Data Transfer Object containing site metadata details.
   * @param logo - Optional logo file.
   * @param favicon - Optional favicon file.
   */
  async create(
    CreateSiteMetadataDto: CreateSiteMetadataDto,
    logo?: Express.Multer.File,
    favicon?: Express.Multer.File,
  ) {
    if (!logo || !favicon) {
      throw new BadRequestException('Logo and Favicon are required');
    }

    const logoFile = await this.fileService.processAndSaveFile(logo);
    const faviconFile = await this.fileService.processAndSaveFile(favicon);

    const siteMetadata = await this.prisma.siteMetadata.create({
      data: {
        ...CreateSiteMetadataDto,
        logo: { connect: { id: logoFile.id } },
        favicon: { connect: { id: faviconFile.id } },
      },
    });

    // record file usage
    if (logoFile) {
      await this.prisma.fileUsage.create({
        data: {
          fileId: logoFile.id,
          model: 'SiteMetadata',
          modelId: siteMetadata.id,
        },
      });
    }

    if (faviconFile) {
      await this.prisma.fileUsage.create({
        data: {
          fileId: faviconFile.id,
          model: 'SiteMetadata',
          modelId: siteMetadata.id,
        },
      });
    }

    return {
      data: siteMetadata,
      message: 'Site Metadata created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  async findOne() {
    return this.prisma.siteMetadata.findFirst();
  }

  /***
   * Update site metadata entry.
   * @param id - ID of the site metadata to update.
   * @param updateSiteMetadataDto - Data Transfer Object containing updated site metadata details.
   * @param logo - Optional new logo file.
   * @param favicon - Optional new favicon file.
   */
  async update(
    updateSiteMetadataDto: UpdateSiteMetadataDto,
    logo?: Express.Multer.File,
    favicon?: Express.Multer.File,
  ) {
    let existingSiteMetadata = await this.prisma.siteMetadata.findFirst();

    if (!existingSiteMetadata) {
      existingSiteMetadata = await this.prisma.siteMetadata.create({
        data: {
          companyName: 'Company Name',
          tagline: '',
          description: '',
          email: '',
          phone: '',
          address: '',
          meta: {},
        },
      });
    }

    let logoId = existingSiteMetadata.logoId;
    let faviconId = existingSiteMetadata.faviconId;

    if (logo) {
      const logoFile = await this.fileService.processAndSaveFile(logo);
      logoId = logoFile.id;

      // update file usage
      await this.prisma.fileUsage.upsert({
        where: {
          fileId_model_modelId: {
            fileId: existingSiteMetadata.logoId as number,
            model: 'SiteMetadata',
            modelId: existingSiteMetadata.id,
          },
        },
        update: { fileId: logoFile.id },
        create: {
          fileId: logoFile.id,
          model: 'SiteMetadata',
          modelId: existingSiteMetadata.id,
        },
      });

      await this.fileService.removeExistingFile(existingSiteMetadata.logoId!);
    }

    if (favicon) {
      const file = await this.fileService.processAndSaveFile(favicon);
      faviconId = file.id;

      // update file usage
      await this.prisma.fileUsage.upsert({
        where: {
          fileId_model_modelId: {
            fileId: existingSiteMetadata.faviconId as number,
            model: 'SiteMetadata',
            modelId: existingSiteMetadata.id,
          },
        },
        update: { fileId: file.id },
        create: {
          fileId: file.id,
          model: 'SiteMetadata',
          modelId: existingSiteMetadata.id,
        },
      });

      await this.fileService.removeExistingFile(
        existingSiteMetadata.faviconId!,
      );
    }

    const update = await this.prisma.siteMetadata.update({
      where: { id: existingSiteMetadata.id },
      data: {
        ...updateSiteMetadataDto,
        logo: { connect: { id: logoId || undefined } },
        favicon: { connect: { id: faviconId || undefined } },
      },
    });

    return update;
  }

  /**
   *
   * Upsert site metadata entry.
   * @param CreateSiteMetadataDto - Data Transfer Object containing site metadata details.
   */
  async upsert(
    dto: CreateSiteMetadataDto,
    logo?: Express.Multer.File,
    favicon?: Express.Multer.File,
  ) {
    const existingSiteMetadata = await this.prisma.siteMetadata.findFirst();
    if (existingSiteMetadata) {
      return await this.update({ ...dto }, logo, favicon);
    } else {
      return await this.create(dto, logo, favicon);
    }
  }
}
