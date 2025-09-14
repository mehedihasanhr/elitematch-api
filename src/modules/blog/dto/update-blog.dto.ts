import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  @ApiProperty({ example: 'How to write clean code', required: false })
  title?: string;

  @ApiProperty({ example: 'how-to-write-clean-code', required: false })
  slug?: string;

  @ApiProperty({ example: 'Updated content', required: false })
  content?: string;

  @ApiProperty({ example: false, required: false })
  isPublished?: boolean;

  @ApiProperty({ example: 'cover.jpg', required: false })
  coverImage?: string;

  @ApiProperty({ example: 1, required: false })
  categoryId?: number | null;
}
