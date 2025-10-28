import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 2, description: 'ID of the receiver user' })
  @Type(() => Number)
  @IsInt()
  receiverId: number;

  @ApiProperty({ example: 1, description: 'ID of the chat' })
  @IsString()
  chatId: string;

  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'Content of the message',
  })
  @IsString()
  @MaxLength(600, {
    message: 'Content is too long. Maximum length is 600 characters.',
  })
  content: string;
}
