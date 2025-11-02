import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}

  /*
   * Create a new chat between the authenticated user and the receiver.
   */
  async create(createChatDto: CreateChatDto, authId?: number) {
    if (!authId) throw new BadRequestException('User not authenticated');

    const chat = await this.prisma.chat.create({
      data: {
        users: {
          connect: [{ id: authId }, { id: Number(createChatDto.receiverId) }],
        },
      },
    });

    return chat;
  }

  /**
   * Find all chats list of authenticated user.
   */
  async findAll(authId?: number) {
    if (!authId) throw new BadRequestException('User not authenticated');
    const chats = await this.prisma.chat.findMany({
      where: {
        users: {
          some: { id: authId },
        },
      },
      include: {
        users: {
          select: { id: true, firstName: true, lastName: true, avatarId: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const normalized = await Promise.all(
      chats.map(async (c) => {
        const unread = await this.prisma.message.count({
          where: { chatId: c.id, receiverId: authId, isSeen: false },
        });

        const counterpart = c.users.find((u) => u.id !== authId) ?? null;

        return {
          id: c.id,
          users: c.users,
          counterpart,
          lastMessage: c.messages && c.messages.length ? c.messages[0] : null,
          unreadCount: unread,
        };
      }),
    );

    return normalized;
  }
}
