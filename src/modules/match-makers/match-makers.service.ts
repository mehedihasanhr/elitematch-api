import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateMatchMakerDto } from './dto/create-match-maker.dto';
import { UpdateMatchMakerDto } from './dto/update-match-maker.dto';

@Injectable()
export class MatchMakersService {
  private basicSelect = {
    id: true,
    experienceYears: true,
    active: true,
    user: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarId: true,
        email: true,
        avatar: true,
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new MatchMaker associated with a user.
   * @param createMatchMakerDto - Data Transfer Object containing MatchMaker details.
   * @param userId - ID of the user to associate with the MatchMaker.
   */
  async create(createMatchMakerDto: CreateMatchMakerDto) {
    const matcher = await this.prisma.matchMaker.create({
      data: {
        user: { connect: { id: createMatchMakerDto.userId } },
        experienceYears: createMatchMakerDto.experienceYear,
        active: createMatchMakerDto.active,
      },
    });

    return {
      message: 'MatchMaker created successfully',
      data: matcher,
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Fatch all MatchMakers with pagination.
   * @param query - filtering and pagination parameters.
   */
  async findAll(query: Record<string, string>) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const [matcher, total] = await this.prisma.$transaction([
      this.prisma.matchMaker.findMany({
        where: {},
        select: this.basicSelect,
      }),
      this.prisma.matchMaker.count(),
    ]);

    return {
      data: paginate(matcher, { page, limit, total }),
      message: 'MatchMakers retrieved successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Find a MatchMaker by ID.
   * @param id - ID of the MatchMaker to find.
   */
  async findOne(id: number) {
    const matcher = await this.prisma.matchMaker.findUnique({
      where: { id },
      select: this.basicSelect,
    });
    return {
      data: matcher,
      message: 'MatchMaker retrieved successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Update a MatchMaker's details.
   * @param id - ID of the MatchMaker to update.
   * @param updateMatchMakerDto - Data Transfer Object containing updated details.
   */
  async update(id: number, updateMatchMakerDto: UpdateMatchMakerDto) {
    const matcher = await this.prisma.matchMaker.update({
      where: { id },
      data: {
        experienceYears: updateMatchMakerDto.experienceYear || undefined,
        active: updateMatchMakerDto.active || true,
      },
    });
    return {
      data: matcher,
      message: 'MatchMaker updated successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Remove a MatchMaker by ID.
   * @param id - ID of the MatchMaker to remove.
   */
  async remove(id: number) {
    const matcher = await this.prisma.matchMaker.delete({ where: { id } });
    return {
      data: matcher,
      message: 'MatchMaker deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
