import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'How to write clean code' })
  title: string;

  @ApiProperty({ example: 'how-to-write-clean-code' })
  slug: string;

  @ApiProperty({ example: 'Long content of the blog...' })
  content: string;

  @ApiProperty({ example: 1 })
  authorId: number;

  @ApiProperty({ example: false })
  isPublished?: boolean;

  @ApiProperty({ example: 1, required: false })
  categoryId?: number;
}
