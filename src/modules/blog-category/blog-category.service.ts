import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import type { Prisma, BlogCategory } from '@prisma/client';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { paginate } from 'src/utils/paginate';
import slugify from 'slugify';

@Injectable()
export class BlogCategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new blog category
   */
  async create(data: CreateBlogCategoryDto) {
    let slug = slugify(data.name);
    let counter = 1;
    while (
      await this.prisma.blog.findUnique({ where: { slug } }).catch(() => null)
    ) {
      slug = `${slug}-${counter++}`;
    }

    const category = await this.prisma.blogCategory.create({
      data: { ...data, slug },
    });
    return {
      data: category,
      message: 'Blog category created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * List all blog categories
   */
  async findAll(query: Record<string, any>) {
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const limit = query.limit ? parseInt(query.limit as string, 10) : 100;
    const skip = (page - 1) * limit;

    // default to returning paginated result for future compatibility
    const total = await this.prisma.blogCategory.count();
    const items = await this.prisma.blogCategory.findMany({
      skip,
      take: limit,
      orderBy: { id: 'asc' },
    });

    return paginate(items, { total, page: 1, limit: total });
  }

  /**
   * Get a category by id
   */
  async findOne(id: number): Promise<BlogCategory> {
    const item = await this.prisma.blogCategory.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Blog category not found');
    return item;
  }

  /**
   * Update a blog category
   */
  async update(id: number, data: UpdateBlogCategoryDto): Promise<BlogCategory> {
    const payload: Prisma.BlogCategoryUpdateInput =
      {} as Prisma.BlogCategoryUpdateInput;
    if (data.name !== undefined) payload.name = data.name;

    if (Object.keys(payload).length === 0) return this.findOne(id);

    return this.prisma.blogCategory.update({ where: { id }, data: payload });
  }

  /**
   * Delete a blog category
   */
  async remove(id: number): Promise<BlogCategory> {
    return this.prisma.blogCategory.delete({ where: { id } });
  }
}
