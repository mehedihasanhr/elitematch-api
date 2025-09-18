import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';

@Injectable()
export class NewsletterSubscriberService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new newsletter subscriber.
   * @param createNewsletterSubscriberDto - Data Transfer Object containing subscriber details.
   */
  async create(createNewsletterSubscriberDto: CreateNewsletterSubscriberDto) {
    const newsletterSubscriber = await this.prisma.newsletterSubscriber.create({
      data: createNewsletterSubscriberDto,
    });

    return {
      data: newsletterSubscriber,
      message: 'Newsletter Subscriber created successfully',
      status: 'success',
      statusCode: 201,
    };
  }

  /**
   * Find all newsletter subscribers.
   * @param query - Query parameters for filtering and pagination.
   */
  async findAll(query: Record<string, string | string[]>) {
    const page = parseInt((query.page as string) || '1', 10);
    const limit = parseInt((query.limit as string) || '10', 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    where['email'] = query.email;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.newsletterSubscriber.findMany({
        skip,
        take: limit,
        where,
        orderBy: { id: 'desc' },
      }),
      this.prisma.newsletterSubscriber.count(),
    ]);

    return paginate(items, { total, page, limit });
  }

  /**
   * Remove a newsletter subscriber by ID.
   * @param id - The ID of the subscriber to remove.
   */
  async remove(id: number) {
    const data = await this.prisma.newsletterSubscriber.delete({
      where: { id },
    });

    return data;
  }
}
