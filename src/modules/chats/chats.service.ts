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
    });

    return chats;
  }
}
