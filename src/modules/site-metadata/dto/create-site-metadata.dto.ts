import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSiteMetadataDto {
  @ApiProperty({ description: 'Title of the site' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'Title of the site' })
  @IsString()
  @IsOptional()
  tagline: string;

  @ApiProperty({ description: 'Organization name for the site' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false, description: 'Meta description of the site' })
  @IsString()
  @IsOptional()
  meta?: string;
}
