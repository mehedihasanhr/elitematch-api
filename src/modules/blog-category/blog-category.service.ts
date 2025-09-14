import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import type { Prisma, BlogCategory } from '@prisma/client';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

/**
 * Shape of a blog_categories row returned from raw SQL.
 */
// Using Prisma model types instead of raw SQL records

@Injectable()
export class BlogCategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new blog category
   */
  async create(data: CreateBlogCategoryDto): Promise<BlogCategory> {
    const payload: Prisma.BlogCategoryCreateInput = {
      name: data.name,
      slug: data.slug,
    } as Prisma.BlogCategoryCreateInput;

    return this.prisma.blogCategory.create({ data: payload });
  }

  /**
   * List all blog categories
   */
  async findAll(): Promise<BlogCategory[]> {
    return this.prisma.blogCategory.findMany({ orderBy: { id: 'asc' } });
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
    if (data.slug !== undefined) payload.slug = data.slug;

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
