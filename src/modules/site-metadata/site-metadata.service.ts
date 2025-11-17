import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    dto: CreateSiteMetadataDto,
    logo?: Express.Multer.File,
    favicon?: Express.Multer.File,
  ) {
    // Process files only if provided
    const logoFile = logo
      ? await this.fileService.processAndSaveFile(logo)
      : null;
    const faviconFile = favicon
      ? await this.fileService.processAndSaveFile(favicon)
      : null;

    const payload = {
      ...(dto as any),
      ...(logoFile ? { logo: { connect: { id: logoFile.id } } } : {}),
      ...(faviconFile ? { favicon: { connect: { id: faviconFile.id } } } : {}),
    } as Prisma.SiteMetadataCreateInput;

    const siteMetadata = await this.prisma.siteMetadata.create({
      data: payload,
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
    return this.prisma.siteMetadata.findFirst({
      include: { favicon: true, logo: true },
    });
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
    const existingSiteMetadata = await this.prisma.siteMetadata.findFirst();

    if (!existingSiteMetadata) {
      throw new Error('Site Metadata not found');
    }

    let logoId = existingSiteMetadata.logoId;
    let faviconId = existingSiteMetadata.faviconId;

    if (logo) {
      const logoFile = await this.fileService.processAndSaveFile(logo);
      logoId = logoFile.id;

      if (existingSiteMetadata.logoId) {
        if (existingSiteMetadata.logoId !== logoId) {
          await this.prisma.fileUsage.updateMany({
            where: {
              fileId: existingSiteMetadata.logoId,
              model: 'SiteMetadata',
              modelId: existingSiteMetadata.id,
            },
            data: { fileId: logoId },
          });

          await this.fileService.removeExistingFile(
            existingSiteMetadata.logoId,
          );
        }
      } else {
        // create file usage
        await this.prisma.fileUsage.create({
          data: {
            fileId: logoFile.id,
            model: 'SiteMetadata',
            modelId: existingSiteMetadata.id,
          },
        });
      }
    }

    if (favicon) {
      const file = await this.fileService.processAndSaveFile(favicon);
      faviconId = file.id;

      if (existingSiteMetadata.faviconId) {
        if (existingSiteMetadata.faviconId !== faviconId) {
          // update file usage
          await this.prisma.fileUsage.updateMany({
            where: {
              fileId: existingSiteMetadata.faviconId,
              model: 'SiteMetadata',
              modelId: existingSiteMetadata.id,
            },
            data: { fileId: faviconId },
          });

          await this.fileService.removeExistingFile(
            existingSiteMetadata.faviconId,
          );
        }
      } else {
        // create file usage
        await this.prisma.fileUsage.create({
          data: {
            fileId: file.id,
            model: 'SiteMetadata',
            modelId: existingSiteMetadata.id,
          },
        });
      }
    }

    const updateData = {
      ...(updateSiteMetadataDto as any),
      ...(logoId ? { logo: { connect: { id: logoId } } } : {}),
      ...(faviconId ? { favicon: { connect: { id: faviconId } } } : {}),
    } as Prisma.SiteMetadataUpdateInput;

    const update = await this.prisma.siteMetadata.update({
      where: { id: existingSiteMetadata.id },
      data: updateData,
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
