import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new message
   * @param createMessageDto
   * @param authId
   */
  async create(createMessageDto: CreateMessageDto, authId?: number) {
    // throw authentication error if no authId
    if (!authId) throw new BadRequestException('User not authenticated');

    // check already have active subscription and limit message sending
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId: authId,
        endDate: { gt: new Date() },
      },
      include: { plan: true },
    });

    // throw error if no active subscription
    if (!subscription) throw new BadRequestException('No active subscription!');

    // throw error if message limit exceeded
    if (subscription.messagesLeft <= 0) {
      throw new BadRequestException('Message limit exceeded!');
    }

    // senitize content
    this.sanitizeContent(createMessageDto.content);

    try {
      // create message
      const message = await this.prisma.message.create({
        data: {
          senderId: authId,
          chatId: createMessageDto.chatId,
          receiverId: createMessageDto.receiverId,
          content: createMessageDto.content,
        },
      });

      // TODO: broadcast message to receiver via websocket

      return message;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Invalid chatId or receiverId');
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }
    }

    return 'This action adds a new message';
  }

  /**
   * Find all messages
   */
  findAll() {
    return `This action returns all message`;
  }

  /**
   * sanitize content to prevent email, url, phone/bank/credit card numbers
   */
  sanitizeContent(content: string): string {
    if (!content) return content;

    // Email
    if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i.test(content)) {
      throw new BadRequestException(
        'Warning: Content contains an email address, which is not allowed.',
      );
    }

    // URL
    if (
      /\b((http|https):\/\/)?[A-Za-z0-9.-]+\.[A-Za-z]{2,}\/?\S*\b/i.test(
        content,
      )
    ) {
      throw new BadRequestException(
        'Warning: Content contains a website URL, which is not allowed.',
      );
    }

    // 9–16 digit numbers (phone/bank/credit card)
    if (/\b\d{9,16}\b/.test(content)) {
      throw new BadRequestException(
        'Warning: Content contains sensitive numeric data, which is not allowed.',
      );
    }

    return content;
  }
}
