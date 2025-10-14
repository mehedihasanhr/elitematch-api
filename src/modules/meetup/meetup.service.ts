import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Injectable()
export class MeetupService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new meetup
   * @param createMeetupDto - Data Transfer Object for creating a meetup
   */
  async create(createMeetupDto: CreateMeetupDto) {
    try {
      const data = await this.prisma.meetup.create({
        data: createMeetupDto,
      });

      return {
        data,
        message: 'Meetup created successfully',
        status: 'success',
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('MatchCouple not found');
        }
      }
      throw new InternalServerErrorException('Failed to create meetup');
    }
  }

  /*
   * Find all meetups
   * @ query - Query parameters for filtering meetups
   */
  async findAll(query: Record<string, any>) {
    const page = query.page ? parseInt(String(query.page), 10) : 1;
    const limit = query.limit ? parseInt(String(query.limit), 10) : 10;
    const search =
      typeof query?.search === 'string'
        ? String(query.search).trim().toLowerCase()
        : null;

    const where: Record<string, any> = {};

    // search by coupleA or coupleB firstName or lastName
    if (search) {
      const splitedSearch = search.split(' ');

      const orCondition = splitedSearch.flatMap((term) => [
        {
          matchCouple: {
            OR: [
              {
                coupleA: {
                  OR: [
                    { firstName: { contains: term } },
                    { lastName: { contains: term } },
                    { email: { contains: term } },
                  ],
                },
              },
              {
                coupleB: {
                  OR: [
                    { firstName: { contains: term } },
                    { lastName: { contains: term } },
                    { email: { contains: term } },
                  ],
                },
              },
            ],
          },
        },
      ]);

      where.OR = orCondition;
    }

    try {
      const [data, total] = await this.prisma.$transaction([
        this.prisma.meetup.findMany({
          take: limit,
          skip: (page - 1) * limit,
          orderBy: { createdAt: 'desc' },
          where,
          include: {
            matchCouple: {
              include: {
                coupleA: {
                  select: { id: true, firstName: true, lastName: true },
                },
                coupleB: {
                  select: { id: true, firstName: true, lastName: true },
                },
              },
            },
          },
        }),
        this.prisma.meetup.count({ where }),
      ]);

      return paginate(data, { total, page, limit });
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2023') {
          throw new BadRequestException('Invalid query parameters');
        }
      }

      throw new InternalServerErrorException('Failed to fetch meetups');
    }
  }

  /**
   * Find a meetup by ID
   * @param id - Meetup ID
   */
  async findOne(id: number) {
    try {
      const data = await this.prisma.meetup.findUniqueOrThrow({
        where: { id },
      });

      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Meetup not found');
        }
      }
      throw new InternalServerErrorException('Failed to fetch meetup');
    }
  }

  /**
   * Update a meetup by ID
   * @param id - Meetup ID
   * @param updateMeetupDto - Data Transfer Object for updating a meetup
   */
  async update(id: number, updateMeetupDto: UpdateMeetupDto) {
    try {
      const data = await this.prisma.meetup.update({
        where: { id },
        data: updateMeetupDto,
      });

      return {
        data,
        message: 'Meetup updated successfully',
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Meetup not found');
        }
        if (error.code === 'P2003') {
          throw new BadRequestException('MatchCouple not found');
        }
      }

      throw new InternalServerErrorException('Failed to update meetup');
    }
  }

  /**
   * Remove a meetup by ID
   * @param id - Meetup ID
   */
  remove(id: number) {
    try {
      const data = this.prisma.meetup.delete({
        where: { id },
      });

      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Meetup not found');
        }
      }
      throw new InternalServerErrorException('Failed to delete meetup');
    }
  }
}
