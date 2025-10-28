import { Body, Get, Injectable, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('chats')
@Injectable()
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateChatDto, @Auth('id') authId?: number) {
    return this.chatService.create(dto, authId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chats of authenticated user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Auth('id') authId?: number) {
    return this.chatService.findAll(authId);
  }
}
