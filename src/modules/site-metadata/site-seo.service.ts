import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateSiteMetaSeoDto } from './dto/create-site-meta-seo.dto';

@Injectable()
export class SiteMetaSeoService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new site metadata entry.
   * @param createSiteMetaSeoDto - Data Transfer Object containing site metadata details.
   * @param logo - Optional logo file.
   * @param favicon - Optional favicon file.
   */
  async upsert(createSiteMetaSeoDto: CreateSiteMetaSeoDto) {
    const existingSiteMetaSeo = await this.prisma.siteSeo.findFirst();

    if (existingSiteMetaSeo) {
      const updatedSiteMetaSeo = await this.prisma.siteSeo.update({
        where: { id: existingSiteMetaSeo.id },
        data: createSiteMetaSeoDto,
      });
      return {
        data: updatedSiteMetaSeo,
        message: 'Site Seo updated successfully',
        status: 'success',
        statusCode: 200,
      };
    }

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
}
