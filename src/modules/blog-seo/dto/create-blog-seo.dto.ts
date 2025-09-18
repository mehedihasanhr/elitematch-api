import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsObject,
} from 'class-validator';

export class CreateBlogSeoDto {
  @ApiProperty({
    example: 1,
    description: 'Blog ID that this SEO belongs to',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  blogId: number;

  @ApiProperty({
    example: 'Complete Guide to Dating in 2025',
    description: 'SEO title for the blog post',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @ApiProperty({
    example:
      'Learn everything about modern dating strategies and tips for success in 2025',
    description: 'SEO description for the blog post',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;

  @ApiProperty({
    example: 'dating, relationships, 2025, tips, guide',
    description: 'SEO keywords for the blog post',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Keywords should not be empty' })
  keywords: string;

  @ApiPropertyOptional({
    example: {
      'og:title': 'Custom Open Graph Title',
      'og:description': 'Custom description',
    },
    description: 'Additional metadata as JSON object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
