import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Cms } from '@prisma/client';
import { CreateCmsDto } from './dto/create-cms.dto';
import { UpdateCmsDto } from './dto/update-cms.dto';
import { QueryCmsDto } from './dto/query-cms.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import slugify from 'slugify';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCmsDto): Promise<Cms> {
    let slug = slugify(dto.slug ?? dto.title, {
      lower: true,
      strict: true,
    });

    let counter = 1;
    while (
      await this.prisma.cms.findUnique({ where: { slug } }).catch(() => null)
    ) {
      slug = `${slug}-${counter++}`;
    }

    return this.prisma.cms.create({
      data: {
        type: dto.type.trim(),
        slug,
        title: dto.title.trim(),
        data: dto.data as Prisma.InputJsonValue,
      },
    });
  }

  async findAll(query: QueryCmsDto): Promise<PaginatedResult<Cms>> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 20));
    const skip = (page - 1) * limit;

    const where = this.buildWhere(query);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.cms.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.cms.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * Get cms data by cms id or slug
   * @param slugOrId - slug or id of the cms entry
   */
  async findOne(slugOrId: string) {
    const where: Prisma.CmsWhereUniqueInput =
      isNaN(Number(slugOrId)) === false
        ? { id: Number(slugOrId) }
        : { slug: slugOrId };

    const record = await this.prisma.cms.findUnique({ where });
    if (!record) throw new NotFoundException('CMS entry not found');
    return record;
  }

  async update(id: number, dto: UpdateCmsDto): Promise<Cms> {
    const existing = await this.prisma.cms.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('CMS entry not found');

    if (dto.data !== undefined) this.ensureJsonObject(dto.data);

    return this.prisma.cms.update({
      where: { id },
      data: {
        ...(dto.type !== undefined && { type: dto.type.trim() }),
        ...(dto.title !== undefined && { title: dto.title.trim() }),
        ...(dto.data !== undefined && {
          data: dto.data as Prisma.InputJsonValue,
        }),
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const existing = await this.prisma.cms.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('CMS entry not found');
    await this.prisma.cms.delete({ where: { id } });
    return { message: 'CMS entry deleted successfully' };
  }

  private buildWhere(query: QueryCmsDto): Prisma.CmsWhereInput {
    const where: Prisma.CmsWhereInput = {};
    if (query.type) where.type = query.type;
    if (query.search) {
      const s = query.search.trim();
      if (s) {
        where.OR = [
          { title: { contains: s } },
          { slug: { contains: s } },
          { type: { contains: s } },
        ];
      }
    }
    return where;
  }

  private ensureJsonObject(value: unknown) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new BadRequestException('data must be a JSON object');
    }
  }
}
