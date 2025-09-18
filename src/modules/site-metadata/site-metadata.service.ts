import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSiteMetadatumDto } from './dto/create-site-metadatum.dto';
import { UpdateSiteMetadatumDto } from './dto/update-site-metadatum.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { FileService } from 'src/cores/modules/file/file.service';

@Injectable()
export class SiteMetadataService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  /**
   * Create a new site metadata entry.
   * @param createSiteMetadatumDto - Data Transfer Object containing site metadata details.
   * @param logo - Optional logo file.
   * @param favicon - Optional favicon file.
   */
  async create(
    createSiteMetadatumDto: CreateSiteMetadatumDto,
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
        ...createSiteMetadatumDto,
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

  findOne() {
    return this.prisma.siteMetadata.findFirst();
  }

  /***
   * Update site metadata entry.
   * @param id - ID of the site metadata to update.
   * @param updateSiteMetadatumDto - Data Transfer Object containing updated site metadata details.
   * @param logo - Optional new logo file.
   * @param favicon - Optional new favicon file.
   */
  async update(
    id: number,
    updateSiteMetadatumDto: UpdateSiteMetadatumDto,
    logo?: Express.Multer.File,
    favicon?: Express.Multer.File,
  ) {
    const exittingSiteMetadata = await this.prisma.siteMetadata.findUnique({
      where: { id },
    });

    if (!exittingSiteMetadata)
      throw new BadRequestException('Site Metadata not found');

    let logoId = exittingSiteMetadata.logoId;
    let faviconId = exittingSiteMetadata.faviconId;

    if (logo) {
      const logoFile = await this.fileService.processAndSaveFile(logo);
      logoId = logoFile.id;

      // update file usage
      await this.prisma.fileUsage.updateMany({
        where: {
          fileId: exittingSiteMetadata.logoId || undefined,
          model: 'SiteMetadata',
          modelId: id,
        },
        data: { fileId: logoFile.id },
      });

      await this.fileService.removeExistingFile(exittingSiteMetadata.logoId!);
    }

    if (favicon) {
      const file = await this.fileService.processAndSaveFile(favicon);
      faviconId = file.id;

      // update file usage
      await this.prisma.fileUsage.updateMany({
        where: {
          fileId: exittingSiteMetadata.faviconId || undefined,
          model: 'SiteMetadata',
          modelId: id,
        },
        data: { fileId: file.id },
      });

      await this.fileService.removeExistingFile(
        exittingSiteMetadata.faviconId!,
      );
    }

    const update = await this.prisma.siteMetadata.update({
      where: { id },
      data: {
        ...updateSiteMetadatumDto,
        logo: { connect: { id: logoId || undefined } },
        favicon: { connect: { id: faviconId || undefined } },
      },
    });

    return update;
  }
}
