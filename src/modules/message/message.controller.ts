import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Send a new message' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Auth('id') authId?: number,
  ) {
    return this.messageService.create(createMessageDto, authId);
  }

  @Get('/chat/:chatId')
  @ApiOperation({ summary: 'Get messages for a chat' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findByChat(
    @Param('chatId') chatId: string,
    // @Query('page') page = '1',
    @Query('limit') limit = '500',
    @Query('cursor') cursor?: number,
    @Auth('id') authId?: number,
  ) {
    // const p = Number(page) || 1;
    const l = Math.min(200, Math.max(1, Number(limit) || 50));
    return this.messageService.findByChat(chatId, authId, l, cursor);
  }

  @Put('/read/:chatId')
  @ApiOperation({
    summary: "Mark a chat's messages as read by the authenticated user",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async markChatAsRead(
    @Param('chatId') chatId: string,
    @Auth('id') authId?: number,
  ) {
    return this.messageService.markChatAsSeen(chatId, authId);
  }

  @Put('/delivered/:chatId')
  @ApiOperation({
    summary: "Mark a chat's messages as read by the authenticated user",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async markChatAsDelivered(
    @Param('chatId') chatId: string,
    @Auth('id') authId?: number,
  ) {
    return this.messageService.markChatAsDelivered(chatId, authId);
  }
}
