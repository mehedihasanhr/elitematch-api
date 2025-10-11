import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStoryDto {
  @ApiProperty({
    example: 'My First Story',
    description: 'Title of the story',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MaxLength(255, {
    message: (args) =>
      `Content is too long. Please shorten it — the maximum allowed length is ${args.constraints[0]} characters.`,
  })
  title: string;

  @ApiProperty({
    example: 'Once upon a time...',
    description: 'Content of the story',
  })
  @IsString()
  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the story is published',
  })
  @Type(() => Boolean)
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Cover image for the story',
  })
  @IsOptional()
  coverImage?: any;
}
