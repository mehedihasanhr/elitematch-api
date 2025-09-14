import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  /**
   * @param prisma - PrismaService instance for DB operations
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new blog post.
   * @param data - DTO containing blog fields
   * @returns The created blog record
   */
  async create(data: CreateBlogDto) {
    const payload: Prisma.BlogUncheckedCreateInput = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      authorId: data.authorId,
      isPublished: data.isPublished ?? false,
      coverImage: data.coverImage ?? null,
      categoryId: data.categoryId ?? null,
    } as Prisma.BlogUncheckedCreateInput;

    return this.prisma.blog.create({ data: payload });
  }

  /**
   * Retrieve all blog posts.
   * @returns Array of blog records
   */
  async findAll() {
    return this.prisma.blog.findMany();
  }

  /**
   * Retrieve a single blog by id.
   * @param id - blog id
   * @throws NotFoundException if not found
   * @returns blog record
   */
  async findOne(id: number) {
    const item = await this.prisma.blog.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Blog not found');
    return item;
  }

  /**
   * Update a blog post partially.
   * @param id - blog id
   * @param data - update DTO
   * @returns updated blog
   */
  async update(id: number, data: UpdateBlogDto) {
    const payload: Prisma.BlogUncheckedUpdateInput =
      {} as Prisma.BlogUncheckedUpdateInput;
    if (data.title !== undefined) payload.title = data.title;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.content !== undefined) payload.content = data.content;
    if (data.isPublished !== undefined) payload.isPublished = data.isPublished;
    if (data.coverImage !== undefined) payload.coverImage = data.coverImage;
    if (data.categoryId !== undefined) payload.categoryId = data.categoryId;

    return this.prisma.blog.update({ where: { id }, data: payload });
  }

  /**
   * Delete a blog post permanently.
   * @param id - blog id
   * @returns deleted record
   */
  async remove(id: number) {
    return this.prisma.blog.delete({ where: { id } });
  }
}
