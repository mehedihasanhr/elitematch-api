import { BadRequestException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new role with a unique slug.
   * @param createRoleDto - DTO containing role fields
   */
  async create(createRoleDto: CreateRoleDto) {
    const { permissionIds, name } = createRoleDto;
    let slug = slugify(name, { lower: true });
    let counter = 1;
    while (
      await this.prisma.role.findUnique({ where: { slug } }).catch(() => null)
    ) {
      slug = `${slug}-${counter++}`;
    }

    const role = await this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        slug,
        permissions: permissionIds
          ? {
              connect: permissionIds.map((permissionId) => ({
                id: permissionId,
              })),
            }
          : undefined,
      },
    });

    return {
      data: role,
      message: 'Role created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all roles.
   * @param query - Query parameters for filtering, pagination, etc.
   */
  async findAll(query: Record<string, string | string[] | undefined>) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;

    const [roles, total] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: { permissions: true },
      }),
      this.prisma.role.count(),
    ]);

    return paginate(roles, { total, page, limit });
  }

  /**
   * Find a role by its ID.
   * @param id - The ID of the role to find
   */
  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });

    return role;
  }

  /**
   * Update a role by its ID.
   * @param id - The ID of the role to update
   * @param updateRoleDto - DTO containing updated role fields
   */
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissionIds, ...data } = updateRoleDto;
    const existingRole = await this.prisma.role.findUnique({ where: { id } });
    if (!existingRole) throw new BadRequestException('Role not found');

    const payload: Prisma.RoleUpdateInput = {
      ...data,
      permissions: permissionIds
        ? {
            connect: permissionIds.map((permissionId) => ({
              id: permissionId,
            })),
          }
        : undefined,
    };

    const role = this.prisma.role.update({
      where: { id },
      data: payload,
    });

    return role;
  }

  /**
   * Delete a role by its ID.
   * @param id - The ID of the role to delete
   */
  async remove(id: number) {
    const existingRole = await this.prisma.role.findUnique({ where: { id } });
    if (!existingRole) throw new BadRequestException('Role not found');
    await this.prisma.role.delete({ where: { id } });
    return {
      data: null,
      message: 'Role deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
