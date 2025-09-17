import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: '32' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'Blog ID is required' })
  blogId: number;

  @ApiProperty({ example: 'This is a comment.' })
  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;
}
