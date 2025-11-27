import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { MessageGateway } from '../message/message.gateway';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: MessageGateway,
  ) {}

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
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarId: true,
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    // --- FIX NORMALIZE LOGIC ---
    const unread = await this.prisma.message.count({
      where: { chatId: chat.id, receiverId: authId, isSeen: false },
    });

    const counterpart = chat.users.find((u) => u.id !== authId) ?? null;

    const normalized = {
      id: chat.id,
      users: chat.users,
      counterpart,
      lastMessage: chat.messages?.length ? chat.messages[0] : null,
      unreadCount: unread,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };

    // --- BROADCAST TO RECEIVER ---
    try {
      this.gateway.sendToUser(createChatDto.receiverId, 'chat:new', normalized);
    } catch {
      // ignore socket error
    }

    return normalized;
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
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        };
      }),
    );

    return normalized;
  }

  /**
   * Find one chat list of authenticated user.
   */
  async findOne(id: string, authId?: number) {
    if (!authId) throw new BadRequestException('User not authenticated');
    const chat = await this.prisma.chat.findFirst({
      where: {
        users: {
          some: { id: authId },
        },
        id,
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

    if (!chat) throw new NotFoundException('Chat not found');

    const unread = await this.prisma.message.count({
      where: { chatId: chat.id, receiverId: authId, isSeen: false },
    });

    const counterpart = chat.users.find((u) => u.id !== authId) ?? null;

    return {
      id: chat.id,
      users: chat.users,
      counterpart,
      lastMessage:
        chat.messages && chat.messages.length ? chat.messages[0] : null,
      unreadCount: unread,
    };
  }
}
