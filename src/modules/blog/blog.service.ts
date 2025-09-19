import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { FileService } from 'src/cores/modules/file/file.service';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  /**
   * @param prisma - PrismaService instance for DB operations
   */
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  /**
   * Create a new blog post.
   * @param data - DTO containing blog fields
   * @returns The created blog record
   */
  async create(
    data: CreateBlogDto,
    file?: Express.Multer.File,
    authId?: number,
  ) {
    let coverId: number | null = null;

    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      coverId = savedFile.id;
    }

    let slug = slugify(data.title);
    let counter = 1;
    while (
      await this.prisma.blog.findUnique({ where: { slug } }).catch(() => null)
    ) {
      slug = `${slug}-${counter++}`;
    }

    const payload: Prisma.BlogUncheckedCreateInput = {
      title: data.title,
      slug,
      content: data.content,
      authorId: authId,
      isPublished: data.isPublished ?? false,
      categoryId: data.categoryId ?? null,
      coverImageId: coverId,
    } as Prisma.BlogUncheckedCreateInput;

    const blog = await this.prisma.blog.create({ data: payload });

    if (coverId) {
      // create file usage record
      await this.prisma.fileUsage.create({
        data: {
          fileId: coverId,
          model: 'blog',
          modelId: blog.id,
        },
      });
    }

    return {
      data: blog,
      message: 'Blog created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Retrieve all blog posts.
   * @returns Array of blog records
   */
  async findAll(page = 1, limit = 20) {
    const take = Math.max(1, Number(limit));
    const currentPage = Math.max(1, Number(page));

    const total = await this.prisma.blog.count();
    const items = await this.prisma.blog.findMany({
      skip: (currentPage - 1) * take,
      take,
      orderBy: { id: 'desc' },
    });

    return paginate(items, { total, page: currentPage, limit: take });
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
  async update(id: number, data: UpdateBlogDto, file?: Express.Multer.File) {
    const existing = await this.prisma.blog.findUnique({ where: { id } });

    if (!existing) throw new NotFoundException('Blog not found');
    let coverId: number | null = existing.coverImageId;

    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      coverId = savedFile.id;

      if (existing.coverImageId) {
        await this.prisma.fileUsage.updateMany({
          where: { model: 'blog', modelId: id, fileId: existing.coverImageId },
          data: { fileId: savedFile.id },
        });
      } else {
        await this.prisma.fileUsage.create({
          data: {
            fileId: savedFile.id,
            model: 'blog',
            modelId: id,
          },
        });
      }
    }

    const payload: Prisma.BlogUncheckedUpdateInput =
      {} as Prisma.BlogUncheckedUpdateInput;
    if (data.title !== undefined) payload.title = data.title;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.content !== undefined) payload.content = data.content;
    if (data.isPublished !== undefined) payload.isPublished = data.isPublished;
    if (data.categoryId !== undefined) payload.categoryId = data.categoryId;

    const blog = await this.prisma.blog.update({
      where: { id },
      data: {
        ...payload,
        ...(coverId !== null ? { coverImageId: coverId } : {}),
      },
    });

    return {
      data: blog,
      message: 'Blog updated successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Delete a blog post permanently.
   * @param id - blog id
   * @returns deleted record
   */
  async remove(id: number) {
    const existing = await this.prisma.blog.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Blog not found');
    // remove file usese  record
    await this.prisma.fileUsage.deleteMany({
      where: { model: 'blog', modelId: id, fileId: existing.coverImageId },
    });

    const deleted = await this.prisma.blog.delete({ where: { id } });

    await this.fileService.removeExistingFile(existing.coverImageId);
    return deleted;
  }
}
