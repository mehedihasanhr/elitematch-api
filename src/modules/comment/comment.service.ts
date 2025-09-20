import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new comment
   * @param createCommentDto - Data Transfer Object for creating a comment
   * @param authId - ID of the authenticated user
   */
  async create(createCommentDto: CreateCommentDto, authId: number) {
    const comment = await this.prisma.comment.create({
      data: {
        blog: { connect: { id: createCommentDto.blogId } },
        content: createCommentDto.content,
        user: { connect: { id: authId } },
      },
    });

    return {
      data: comment,
      message: 'Comment created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all comments
   * @param query - Query parameters for filtering comments
   */
  async findAll(query: Record<string, string | string[]>) {
    const page = parseInt((query.page as string) || '1', 10);
    const limit = parseInt((query.limit as string) || '10', 10);
    const skip = (page - 1) * limit;
    const sort = (query.sort || 'createdAt') as string;
    const order = (query.order as string) || 'desc';

    const [comments, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        skip,
        take: limit,
        orderBy: { [sort]: order },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          blog: true,
        },
      }),
      this.prisma.comment.count(),
    ]);

    return paginate(comments, { total, limit, page });
  }

  /**
   * Find a comment by ID
   * @param id - ID of the comment to find
   */
  findOne(id: number) {
    const comment = this.prisma.comment.findUnique({
      where: { id },
      include: {
        blog: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
    return comment;
  }

  /**
   * Update a comment by ID
   * @param id - ID of the comment to update
   * @param updateCommentDto - Data Transfer Object for updating a comment
   * @returns updated comment
   */
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const existing = await this.prisma.comment.findUnique({ where: { id } });

    if (!existing) throw new BadRequestException('Comment not found');

    const comment = this.prisma.comment.update({
      where: { id },
      data: { ...updateCommentDto },
    });

    return comment;
  }

  /**
   * Remove a comment by ID
   * @param id - ID of the comment to remove
   */
  async remove(id: number) {
    const existing = await this.prisma.comment.findUnique({ where: { id } });
    if (!existing) throw new BadRequestException('Comment not found');
    return this.prisma.comment.delete({ where: { id } });
  }
}
