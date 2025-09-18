import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, IsObject } from 'class-validator';

export class UpdateBlogSeoDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Blog ID that this SEO belongs to',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  blogId?: number;

  @ApiPropertyOptional({
    example: 'Updated Guide to Dating in 2025',
    description: 'SEO title for the blog post',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Updated description for modern dating strategies',
    description: 'SEO description for the blog post',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'dating, relationships, 2025, updated, tips',
    description: 'SEO keywords for the blog post',
    required: false,
  })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiPropertyOptional({
    example: {
      'og:title': 'Updated Open Graph Title',
      'og:description': 'Updated description',
    },
    description: 'Additional metadata as JSON object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
