import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ description: 'The recipient user ID', example: 123 })
  @IsInt()
  receiverId: number;
}
