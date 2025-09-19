import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'How to write clean code' })
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @ApiProperty({ example: 'Long content of the blog...' })
  @IsString()
  @IsNotEmpty({ message: 'Content must not be empty' })
  content: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiProperty({ example: [1, 2], required: false })
  @Type(() => Number)
  @IsArray({ each: true })
  @IsNotEmpty({ message: 'Tag IDs must not be empty' })
  tagIds?: number[];
}
