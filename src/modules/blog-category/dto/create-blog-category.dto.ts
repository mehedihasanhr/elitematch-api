import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCategoryDto {
  @ApiProperty({ example: 'Technology' })
  name: string;

  @ApiProperty({ example: 'technology' })
  slug: string;
}
