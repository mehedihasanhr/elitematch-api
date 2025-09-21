import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { UserRoleUpdateDto } from './dto/user-role-update.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Fetch all users with pagination.
   * @param query - filtering and pagination parameters.
   */
  async findAll(query: Record<string, string>) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    where['firstName'] = { contains: query.search };
    where['lastName'] = { contains: query.search };

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarId: true,
          avatar: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          profile: {
            select: {
              avatars: true,
            },
          },
        },
        where: { ...where },
      }),
      this.prisma.user.count(),
    ]);

    return paginate(users, { total, page, limit });
  }

  /**
   * Find a user by their ID.
   * @param id - The ID of the user to find.
   */
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  /**
   * Update a user's role by their ID.
   * @param id - The ID of the user to update.
   * @param dto - Data Transfer Object containing the new role ID.
   */
  async updateUserRole(id: number, dto: UserRoleUpdateDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) throw new NotFoundException('User not found');

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        role: dto.roleId ? { connect: { id: dto.roleId } } : undefined,
      },
    });
    return user;
  }
}
