import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateSiteMetaSeoDto } from './dto/create-site-meta-seo.dto';
import { UpdateSiteMetaSeoDto } from './dto/update-site-meta-seo.dto';

@Injectable()
export class SiteMetaSeoService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new site metadata entry.
   * @param createSiteMetaSeoDto - Data Transfer Object containing site metadata details.
   * @param logo - Optional logo file.
   * @param favicon - Optional favicon file.
   */
  async create(createSiteMetaSeoDto: CreateSiteMetaSeoDto) {
    const siteMetaSeo = await this.prisma.siteSeo.create({
      data: createSiteMetaSeoDto,
    });

    return {
      data: siteMetaSeo,
      message: 'Site Seo created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  async findOne() {
    return this.prisma.siteSeo.findFirst();
  }

  /***
   * Update site metadata entry.
   * @param id - ID of the site metadata to update.
   * @param updateSiteMetadatumDto - Data Transfer Object containing updated site metadata details.
   * @param logo - Optional new logo file.
   * @param favicon - Optional new favicon file.
   */
  async update(id: number, updateSiteMetaSeoDto: UpdateSiteMetaSeoDto) {
    const exittingSiteMetaSeo = await this.prisma.siteSeo.findUnique({
      where: { id },
    });

    if (!exittingSiteMetaSeo)
      throw new BadRequestException('Site Metadata not found');

    const update = await this.prisma.siteSeo.update({
      where: { id },
      data: {
        ...updateSiteMetaSeoDto,
      },
    });

    return update;
  }
}
