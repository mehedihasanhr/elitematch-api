import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSiteMetaSeoDto {
  @ApiProperty({ description: 'Title of the site' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  keywords?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  ogTitle?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  ogType?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  ogDescription?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  canonicalUrl?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  meta?: string;
}
