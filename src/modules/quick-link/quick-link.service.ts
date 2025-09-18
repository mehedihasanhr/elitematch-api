import { Injectable } from '@nestjs/common';
import { CreateQuickLinkDto } from './dto/create-quick-link.dto';
import { UpdateQuickLinkDto } from './dto/update-quick-link.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';

@Injectable()
export class QuickLinkService {
  constructor(private prisma: PrismaService) {}

  async create(createQuickLinkDto: CreateQuickLinkDto) {
    const quickLink = await this.prisma.quickLink.create({
      data: { ...createQuickLinkDto },
    });

    return {
      data: quickLink,
      message: 'Quick Link created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  findAll() {
    return this.prisma.quickLink.findMany();
  }

  async update(id: number, updateQuickLinkDto: UpdateQuickLinkDto) {
    const quickLink = await this.prisma.quickLink.update({
      where: { id },
      data: { ...updateQuickLinkDto },
    });

    return quickLink;
  }

  async remove(id: number) {
    await this.prisma.quickLink.delete({ where: { id } });
    return {
      data: null,
      message: 'Quick Link deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
