import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'boolean') return value;
    const v = String(value).toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(v)) return true;
    if (['false', '0', 'no', 'off'].includes(v)) return false;
    return Boolean(value);
  })
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
