import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';
import { CreateCmsDto } from './create-cms.dto';

export class UpdateCmsDto extends PartialType(CreateCmsDto) {
  @ApiPropertyOptional({ example: 'updated-title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'new-slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'page' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'JSON payload updates',
    example: { body: '<p>Updated</p>' },
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}
