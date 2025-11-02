import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
    @Query('page') page = '1',
    @Query('limit') limit = '50',
    @Auth('id') authId?: number,
  ) {
    const p = Number(page) || 1;
    const l = Math.min(200, Math.max(1, Number(limit) || 50));
    return this.messageService.findByChat(chatId, authId, p, l);
  }

  @Put('/chat/:chatId/read')
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
}
