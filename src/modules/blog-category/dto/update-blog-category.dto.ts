import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogCategoryDto {
  @ApiProperty({ example: 'Technology', required: false })
  name?: string;

  @ApiProperty({ example: 'technology', required: false })
  slug?: string;
}
