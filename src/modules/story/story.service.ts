import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import slugify from 'slugify';
import { paginate } from 'src/utils/paginate';
import { FileService } from 'src/cores/modules/file/file.service';

@Injectable()
export class StoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Create a new story
   * @param createStoryDto - Data Transfer Object for creating a story
   *@param file - Optional file upload for the story cover image
   */
  async create(createStoryDto: CreateStoryDto, file?: Express.Multer.File) {
    let coverImageId: number | undefined = undefined;
    let slug = slugify(createStoryDto.title, { lower: true, strict: true });
    let counter = 1;
    while (
      await this.prisma.story.findUnique({ where: { slug } }).catch(() => null)
    ) {
      slug = `${slug}-${counter++}`;
    }

    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      if (savedFile && savedFile.id) {
        coverImageId = savedFile.id;
      }
    }

    const story = await this.prisma.story.create({
      data: {
        ...createStoryDto,
        slug,
        coverImage: coverImageId
          ? { connect: { id: coverImageId } }
          : undefined,
      },
    });

    if (story.coverImageId) {
      await this.prisma.fileUsage.create({
        data: {
          fileId: story.coverImageId,
          model: 'Story',
          modelId: story.id,
        },
      });
    }

    return {
      data: story,
      message: 'Story created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all stories.
   * @param query - Query parameters for filtering and pagination.
   */
  async findAll(query: Record<string, any>) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 10;

    const [stories, total] = await this.prisma.$transaction([
      this.prisma.story.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        include: { coverImage: true },
      }),
      this.prisma.story.count(),
    ]);

    return paginate(stories, { total, page, limit });
  }

  /**
   * Find a story by its ID.
   * @param id - The ID of the story to find.
   */
  async findOne(id: number) {
    if (!id) throw new BadRequestException('ID is required');
    const story = await this.prisma.story.findUnique({
      where: { id },
      include: { coverImage: true },
    });

    if (!story) throw new BadRequestException('Story not found');
    return story;
  }

  /**
   * Update a story by its ID.
   * @param id - The ID of the story to update.
   * @param updateStoryDto - Data Transfer Object for updating a story.
   * @param file - Optional file upload for the story cover image.
   */
  async update(
    id: number,
    updateStoryDto: UpdateStoryDto,
    file?: Express.Multer.File,
  ) {
    if (!id) throw new BadRequestException('ID is required');
    const existingStory = await this.prisma.story.findUnique({
      where: { id },
    });

    let coverImageId = existingStory?.coverImageId;

    // if file is provided, process and save it
    if (file) {
      const savedFile = await this.fileService.processAndSaveFile(file);
      if (savedFile && savedFile.id) {
        coverImageId = savedFile.id;
      }
    }

    // Update the story
    const updatedStory = await this.prisma.story.update({
      where: { id },
      data: {
        ...updateStoryDto,
        coverImage: coverImageId
          ? { connect: { id: coverImageId } }
          : undefined,
      },
    });

    // ensure file usage is upserted
    if (coverImageId && coverImageId !== existingStory?.coverImageId) {
      await this.prisma.fileUsage.upsert({
        where: {
          fileId_model_modelId: {
            fileId: existingStory?.coverImageId || 0,
            model: 'Story',
            modelId: id,
          },
        },
        create: {
          fileId: coverImageId,
          model: 'Story',
          modelId: id,
        },
        update: {
          fileId: coverImageId,
        },
      });

      // attempt to delete old file usage if exists
      if (existingStory?.coverImageId) {
        await this.fileService.removeExistingFile(existingStory?.coverImageId);
      }
    }

    return updatedStory;
  }

  /**
   * Remove a story by its ID.
   * @param id - The ID of the story to remove.
   */
  async remove(id: number) {
    if (!id) throw new BadRequestException('ID is required');
    await this.findOne(id);

    const deleted = await this.prisma.story.delete({ where: { id } });

    if (deleted.coverImageId) {
      // rmove associated file usage and possibly the file
      await this.prisma.fileUsage.deleteMany({
        where: { model: 'Story', modelId: id, fileId: deleted.coverImageId },
      });

      // attempt to delete the file if not used elsewhere
      await this.fileService.removeExistingFile(deleted.coverImageId);
    }

    return deleted;
  }
}
