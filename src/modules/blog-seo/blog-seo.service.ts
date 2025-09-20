import { Injectable } from '@nestjs/common';
import { CreateBlogSeoDto } from './dto/create-blog-seo.dto';
import { UpdateBlogSeoDto } from './dto/update-blog-seo.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class BlogSeoService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogSeoDto: CreateBlogSeoDto) {
    const seo = await this.prisma.blogSEO.create({
      data: {
        ...createBlogSeoDto,
        metadata: createBlogSeoDto.metadata || {},
      },
    });

    return {
      data: seo,
      message: 'Blog SEO created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all blog SEOs with pagination and optional filtering.
   * @param query - Query parameters for pagination and filtering.
   */
  async findAll(query: Record<string, string | string[]>) {
    const page = parseInt((query.page as string) || '1', 10);
    const limit = parseInt((query.limit as string) || '10', 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    where['blogId'] = query.blogId
      ? parseInt(query.blogId as string, 10)
      : undefined;
    where['title'] = { contains: query.title };
    where['description'] = query.description;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.blogSEO.findMany({
        skip,
        take: limit,
        where,
        orderBy: { id: 'desc' },
      }),
      this.prisma.blogSEO.count(),
    ]);

    return paginate(items, { total, page, limit });
  }

  /**
   * Find one blog SEO by its ID.
   * @param id - The ID of the blog SEO to find.
   */
  findOne(id: number) {
    return this.prisma.blogSEO.findUnique({
      where: { id },
    });
  }

  /**
   * Update a blog SEO by its ID.
   * @param id - The ID of the blog SEO to update.
   * @param updateBlogSeoDto - The data to update the blog SEO with.
   */
  async update(id: number, updateBlogSeoDto: UpdateBlogSeoDto) {
    const existingSeo = await this.prisma.blogSEO.findUnique({
      where: { id },
    });

    if (!existingSeo) {
      throw new Error('Blog SEO not found');
    }

    const updatedSeo = await this.prisma.blogSEO.update({
      where: { id },
      data: updateBlogSeoDto,
    });

    return {
      data: updatedSeo,
      message: 'Blog SEO updated successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Remove a blog SEO by its ID.
   * @param id - The ID of the blog SEO to remove.
   */
  async remove(id: number) {
    const existingSeo = await this.prisma.blogSEO.findUnique({
      where: { id },
    });

    if (!existingSeo) {
      throw new Error('Blog SEO not found');
    }

    await this.prisma.blogSEO.delete({
      where: { id },
    });

    return {
      message: 'Blog SEO deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
