import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { MessageGateway } from './message.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: MessageGateway,
  ) {}

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
        isActive: true,
      },
      include: { plan: true },
      orderBy: { endDate: 'asc' },
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

      // decrement messagesLeft on subscription (if present)
      if (subscription && typeof subscription.messagesLeft === 'number') {
        try {
          await this.prisma.subscription.update({
            where: { id: subscription.id },
            data: { messagesLeft: Math.max(0, subscription.messagesLeft - 1) },
          });
        } catch {
          // non-fatal: continue
        }
      }

      // Broadcast message to receiver via websocket (if connected)
      try {
        this.gateway.sendToUser(
          createMessageDto.receiverId,
          'message:new',
          message,
        );
      } catch {
        // ignore gateway errors (will still return created message)
      }

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
   * Get messages for a chat. Validates the authenticated user is a member
   * and marks unread messages addressed to the user as seen.
   */
  async findByChat(chatId: string, authId?: number, page = 1, limit = 50) {
    if (!authId) throw new BadRequestException('User not authenticated');

    // ensure chat exists and user is a member
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { users: true },
    });

    if (!chat) throw new BadRequestException('Chat not found');

    const member = chat.users.some((u) => u.id === authId);
    if (!member) throw new BadRequestException('Not a member of this chat');

    // fetch messages with pagination, ordered ascending by createdAt
    const skip = Math.max(0, (page - 1) * limit);
    const messages = await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      skip,
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarId: true,
          },
        },
      },
    });

    // mark unread messages addressed to authId as seen
    const unreadIds = messages
      .filter((m) => m.receiverId === authId && !m.isSeen)
      .map((m) => m.id);

    let updated = 0;
    if (unreadIds.length > 0) {
      const res = await this.prisma.message.updateMany({
        where: { id: { in: unreadIds } },
        data: { isSeen: true },
      });
      updated = res.count ?? 0;

      // notify other chat members that messages were seen
      const otherUsers = chat.users
        .filter((u) => u.id !== authId)
        .map((u) => u.id);
      for (const uid of otherUsers) {
        try {
          this.gateway.sendToUser(uid, 'message:seen', {
            chatId,
            seenBy: authId,
          });
        } catch {
          /* ignore gateway errors */
        }
      }
    }

    return { messages, markedSeen: updated };
  }

  /**
   * Mark all unseen messages for authenticated user in a chat as seen
   */
  async markChatAsSeen(chatId: string, authId?: number) {
    if (!authId) throw new BadRequestException('User not authenticated');

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { users: true },
    });
    if (!chat) throw new BadRequestException('Chat not found');
    const member = chat.users.some((u) => u.id === authId);
    if (!member) throw new BadRequestException('Not a member of this chat');

    const res = await this.prisma.message.updateMany({
      where: { chatId, receiverId: authId, isSeen: false },
      data: { isSeen: true },
    });

    // notify other members
    const otherUsers = chat.users
      .filter((u) => u.id !== authId)
      .map((u) => u.id);
    for (const uid of otherUsers) {
      try {
        this.gateway.sendToUser(uid, 'message:seen', {
          chatId,
          seenBy: authId,
        });
      } catch {
        /* ignore */
      }
    }

    return { updated: res.count ?? 0 };
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
