import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { SubscriptionQueryDto } from '../subscription/dto/subscription-query.dto';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all transactions with optional pagination and filtering
   */
  async findAll(query: SubscriptionQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const userId = query.userId;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (userId) where['userId'] = userId;

    const [total, items] = await this.prisma.$transaction([
      this.prisma.transaction.count(),
      this.prisma.transaction.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          subscription: {
            include: { plan: true },
          },
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
    ]);

    return paginate(items, { total, page, limit });
  }
}
