import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new permission
   * @param createPermissionDto
   */
  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.prisma.permission.create({
      data: createPermissionDto,
    });

    return {
      data: permission,
      message: 'Permission created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all permissions
   */
  async findAll() {
    const permissions = await this.prisma.permission.findMany();

    const grouped = permissions.reduce(
      (acc, perm) => {
        if (!acc[perm.model]) {
          acc[perm.model] = [];
        }
        acc[perm.model].push(perm);
        return acc;
      },
      {} as Record<string, typeof permissions>,
    );

    return grouped;
  }

  /**
   * Delete permission by id
   */
  async remove(id: number) {
    const permission = await this.prisma.permission.delete({ where: { id } });
    return {
      data: permission,
      message: 'Permission deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
