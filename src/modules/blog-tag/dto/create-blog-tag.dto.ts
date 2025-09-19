import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogTagDto {
  @ApiProperty({ example: 'technology' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
