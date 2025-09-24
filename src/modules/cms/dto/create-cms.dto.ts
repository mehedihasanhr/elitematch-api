import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateCmsDto {
  @ApiProperty({ example: 'page', description: 'Type/category of CMS entry' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ example: 'about-us', description: 'Unique slug identifier' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'About Us', description: 'Title of the CMS entry' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Arbitrary JSON data payload',
    example: { body: '<p>Content</p>' },
  })
  @IsObject()
  data!: Record<string, unknown>;
}
