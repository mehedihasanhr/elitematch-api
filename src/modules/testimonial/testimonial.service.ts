import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FileService } from 'src/cores/modules/file/file.service';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  /**
   * Create a new testimonial
   * @param createTestimonialDto - Data Transfer Object for creating a testimonial
   */
  async create(
    createTestimonialDto: CreateTestimonialDto,
    file?: Express.Multer.File,
  ) {
    try {
      let fileId: number | undefined;

      if (file) {
        const savedFile = await this.fileService.processAndSaveFile(file);
        if (savedFile && savedFile.id) {
          fileId = savedFile.id;
        }
      }

      const testimonial = await this.prisma.testimonial.create({
        data: {
          ...createTestimonialDto,
          thumbnail: fileId ? { connect: { id: fileId } } : undefined,
        },
      });

      // track file usage
      if (testimonial.thumbnailId) {
        await this.prisma.fileUsage.create({
          data: {
            fileId: testimonial.thumbnailId,
            model: 'Testimonial',
            modelId: testimonial.id,
          },
        });
      }

      return {
        data: testimonial,
        message: 'Testimonial created successfully',
        status: 'success',
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // file too large
        if (error.code === 'P2000') {
          const columnName =
            typeof error.meta?.column_name === 'string'
              ? error.meta.column_name
              : undefined;

          throw new BadRequestException(
            columnName
              ? `Provided data is too long for the "${columnName}" column.`
              : 'Provided data is too long for one of the fields.',
          );
        }
      }

      throw new InternalServerErrorException({
        message: 'An error occurred while creating the testimonial',
      });
    }
  }

  /**
   * Find all testimonials
   * query - Query parameters for filtering testimonials
   */
  async findAll(query: Record<string, any>) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 10;
    const isActive =
      query.isActive === 'true'
        ? true
        : query.isActive === 'false'
          ? false
          : undefined;

    let where = {};

    if (typeof isActive === 'boolean') {
      where = { ...where, isActive };
    }

    try {
      const [testimonials, total] = await this.prisma.$transaction([
        this.prisma.testimonial.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where,
          orderBy: { createdAt: 'desc' },
          include: { thumbnail: true },
        }),
        this.prisma.testimonial.count({ where }),
      ]);

      return paginate(testimonials, { total, page, limit });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2023') {
          throw new BadRequestException('Invalid query parameter');
        }
      }
      throw new InternalServerErrorException({
        message: 'An error occurred while fetching testimonials',
      });
    }
  }

  /**
   * Find a testimonial by ID
   * @param id - ID of the testimonial to find
   */
  async findOne(id: number) {
    if (!id) throw new BadRequestException('ID is required');
    try {
      const testimonial = await this.prisma.testimonial.findUniqueOrThrow({
        where: { id },
        include: { thumbnail: true },
      });
      return testimonial;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Testimonial not found');
        }
        if (error.code === 'P2023') {
          throw new BadRequestException('Invalid ID format');
        }
      }

      throw new InternalServerErrorException({
        message: 'An error occurred while fetching the testimonial',
      });
    }
  }

  /**
   * Update a testimonial by ID
   * @param id - ID of the testimonial to update
   * @param updateTestimonialDto - Data Transfer Object for updating a testimonial
   */
  async update(
    id: number,
    updateTestimonialDto: UpdateTestimonialDto,
    file?: Express.Multer.File,
  ) {
    try {
      const existingTestimonial = await this.findOne(id);
      let fileId = existingTestimonial.thumbnailId;
      if (file) {
        const savedFile = await this.fileService.processAndSaveFile(file);
        if (savedFile && savedFile.id) {
          fileId = savedFile.id;
        }
      }

      const updatedTestimonial = await this.prisma.testimonial.update({
        where: { id },
        data: {
          ...updateTestimonialDto,
          thumbnail: fileId ? { connect: { id: fileId } } : undefined,
        },
      });

      // update fileusage

      if (existingTestimonial.thumbnailId && fileId) {
        await this.prisma.fileUsage.upsert({
          where: {
            fileId_model_modelId: {
              fileId: existingTestimonial.thumbnailId,
              model: 'Testimonial',
              modelId: existingTestimonial.id,
            },
          },
          create: {
            fileId,
            model: 'Testimonial',
            modelId: existingTestimonial.id,
          },
          update: { fileId },
        });

        // attampt to delete old file if not used elsewhere
        await this.fileService.removeExistingFile(
          existingTestimonial.thumbnailId,
        );
      }

      return {
        data: updatedTestimonial,
        message: 'Testimonial updated successfully',
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Testimonial not found');
        }

        if (error.code === 'P2023') {
          throw new BadRequestException('Invalid ID format');
        }

        if (error.code === 'P2003') {
          throw new BadRequestException({
            message: 'Foreign key constraint failed',
          });
        }
      }

      throw new InternalServerErrorException({
        message: 'An error occurred while updating the testimonial',
      });
    }
  }

  /**
   * Remove a testimonial by ID
   * @param id - ID of the testimonial to remove
   */
  async remove(id: number) {
    try {
      const existingTestimonial = await this.findOne(id);
      if (existingTestimonial.thumbnailId) {
        // Remove file usage
        await this.prisma.fileUsage.deleteMany({
          where: {
            fileId: existingTestimonial.thumbnailId,
            model: 'Testimonial',
            modelId: existingTestimonial.id,
          },
        });

        // attampt to delete old file if not used elsewhere
        await this.fileService.removeExistingFile(
          existingTestimonial.thumbnailId,
        );
      }

      const deletedTestimonial = await this.prisma.testimonial.delete({
        where: { id },
      });

      return {
        data: deletedTestimonial,
        message: 'Testimonial deleted successfully',
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Testimonial not found');
        }
        if (error.code === 'P2023') {
          throw new BadRequestException('Invalid ID format');
        }

        if (error.code === 'P2003') {
          throw new BadRequestException({
            message:
              'This testimonial can’t be deleted because it’s currently associated with other records. Please detach or update those linked records before trying again.',
          });
        }
      }
    }
  }
}
