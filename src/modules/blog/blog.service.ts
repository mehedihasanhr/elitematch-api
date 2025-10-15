import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { FileService } from 'src/cores/modules/file/file.service';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

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
    let coverId: number | undefined = undefined;

    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      coverId = savedFile.id;
    }

    let slug = slugify(data.title, { lower: true, strict: true });
    let counter = 1;
    while (
      await this.prisma.blog.findUnique({ where: { slug } }).catch(() => null)
    ) {
      slug = `${slug}-${counter++}`;
    }

    // ensure category exists
    const category = await this.prisma.blogCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // if tags are provided, ensure they exist
    if (data.tagIds && data.tagIds.length > 0) {
      const tags = await this.prisma.blogTag.findMany({
        where: { id: { in: data.tagIds } },
      });

      if (tags.length !== data.tagIds.length) {
        throw new NotFoundException('One or more tags not found');
      }
    }

    const payload = {
      title: data.title,
      slug,
      content: data.content,
      author: { connect: { id: authId || undefined } },
      isPublished: data.isPublished ?? false,
      isFeatured: data.isFeatured ?? false,
      isPopular: data.isPopular ?? false,
      isTrending: data.isTrending ?? false,
      category: { connect: { id: data.categoryId } },
      coverImage: coverId ? { connect: { id: coverId } } : undefined,
      blogTags: data.tagIds
        ? { connect: data.tagIds.map((id) => ({ id })) }
        : undefined,
    };

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
  async findAll(query: Record<string, string | string[]>) {
    const limit = Number(query.limit || 10);
    const take = Math.max(1, limit);
    const currentPage = Math.max(1, Number(query.page || 1));
    const isFeatured = this.checkIsBoolean(query.isFeatured as string);
    const isPopular = this.checkIsBoolean(query.isPopular as string);
    const isTrending = this.checkIsBoolean(query.isTrending as string);

    const where: Record<string, unknown> = {};

    if (isFeatured !== undefined) where['isFeatured'] = isFeatured;
    if (isPopular !== undefined) where['isPopular'] = isPopular;
    if (isTrending !== undefined) where['isTrending'] = isTrending;

    if (query.search && typeof query.search === 'string') {
      where['title'] = { contains: query.search };
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        skip: (currentPage - 1) * take,
        take,
        orderBy: { id: 'desc' },
        where,
        include: {
          author: { select: { id: true, firstName: true, lastName: true } },
          category: true,
          coverImage: true,
          blogTags: true,
        },
      }),
      this.prisma.blog.count({ where }),
    ]);

    return paginate(items, { total, page: currentPage, limit: take });
  }

  /**
   * Retrieve a single blog by id.
   * @param id - blog id
   * @throws NotFoundException if not found
   * @returns blog record
   */
  async findOne(idOrSlug: string) {
    const parsedId = Number(idOrSlug);

    const item = await this.prisma.blog.findUnique({
      where: { ...(isNaN(parsedId) ? { slug: idOrSlug } : { id: parsedId }) },
      include: {
        author: true,
        category: true,
        coverImage: true,
        blogTags: true,
      },
    });
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
    if (data.content !== undefined) payload.content = data.content;
    if (data.isPublished !== undefined) payload.isPublished = data.isPublished;
    if (data.categoryId !== undefined) payload.categoryId = data.categoryId;
    if (data.isFeatured !== undefined) payload.isFeatured = data.isFeatured;
    if (data.isPopular !== undefined) payload.isPopular = data.isPopular;
    if (data.isTrending !== undefined) payload.isTrending = data.isTrending;
    if (data.tagIds !== undefined)
      payload.blogTags = { connect: data.tagIds.map((id) => ({ id })) };

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

    if (existing.coverImageId) {
      await this.prisma.fileUsage.deleteMany({
        where: { model: 'blog', modelId: id, fileId: existing.coverImageId },
      });
    }

    const deleted = await this.prisma.blog.delete({ where: { id } });

    if (existing.coverImageId) {
      await this.fileService.removeExistingFile(existing.coverImageId);
    }
    return deleted;
  }

  checkIsBoolean = (value: string): boolean | undefined => {
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return undefined;
  };
}
