import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ description: 'The recipient user ID', example: 123 })
  @IsString()
  receiverId: string;
}
