import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [MessageModule],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
