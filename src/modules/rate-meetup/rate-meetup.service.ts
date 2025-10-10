import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRateMeetupDto } from './dto/create-rate-meetup.dto';
import { UpdateRateMeetupDto } from './dto/update-rate-meetup.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { Prisma } from '@prisma/client';

@Injectable()
export class RateMeetupService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new rate meetup entry
   * @param createRateMeetupDto - Data transfer object containing rate meetup details
   */
  async create(createRateMeetupDto: CreateRateMeetupDto) {
    const res = await this.prisma.rateMeetup.create({
      data: createRateMeetupDto,
    });
    if (!res) {
      throw new BadRequestException('Failed to create rate meetup');
    }
    return res;
  }

  /**
   * Find all rate meetup entries
   */
  async findAll(query: Record<string, any>) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 10;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.rateMeetup.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rateMeetup.count(),
    ]);

    return paginate(data, { total, page, limit });
  }

  /**
   * Find a single rate meetup entry by ID
   * @param id - ID of the rate meetup entry
   */
  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Rate meetup ID is required');
    }
    const data = await this.prisma.rateMeetup.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Rate meetup with ID ${id} not found`);
    }

    return data;
  }

  /**
   * Update a rate meetup entry by ID
   * @param id - ID of the rate meetup entry
   *
   * @param updateRateMeetupDto - Data transfer object containing updated rate meetup details
   */
  async update(id: number, updateRateMeetupDto: UpdateRateMeetupDto) {
    try {
      if (!id) {
        throw new NotFoundException('Rate meetup not found');
      }

      const data = await this.prisma.rateMeetup.update({
        where: { id },
        data: updateRateMeetupDto,
      });

      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Rate meetup not found');
        }
      }
      throw new InternalServerErrorException({
        message:
          "Something went wrong, can't update rate meetup. Contact support",
      });
    }
  }

  /**
   * Remove a rate meetup entry by ID
   * @param id - ID of the rate meetup entry
   */
  async remove(id: number) {
    try {
      const data = await this.prisma.rateMeetup.delete({
        where: { id },
      });
      return {
        data,
        message: 'Rate meetup deleted successfully',
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Rate meetup not found');
        }
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Cannot delete rate meetup as it is referenced by other records',
          );
        }
      }
      throw new InternalServerErrorException({
        message:
          "Something went wrong, can't delete rate meetup. Contact support",
      });
    }
  }
}
