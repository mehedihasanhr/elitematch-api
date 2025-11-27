import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('chats')
@Controller('chats')
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

  @Get(':id')
  @ApiOperation({ summary: 'Get chat by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Auth('id') authId?: number) {
    return this.chatService.findOne(id, authId);
  }
}
