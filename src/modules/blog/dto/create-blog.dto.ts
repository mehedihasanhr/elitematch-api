import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'How to write clean code' })
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @ApiProperty({ example: 'Long content of the blog...' })
  @IsString()
  @IsNotEmpty({ message: 'Content must not be empty' })
  content: string;

  @ApiProperty({ example: false })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({
    name: 'isFeatured',
    nullable: true,
    example: true,
    required: false,
    description: 'Whether the blog is featured or not',
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({
    name: 'isPopular',
    nullable: true,
    required: false,
    example: false,
    description: 'Whether the blog is popular or not',
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;

  @ApiProperty({
    name: 'isTrending',
    nullable: true,
    required: false,
    example: true,
    description: 'Whether the blog is trending or not',
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isTrending?: boolean;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiProperty({ example: [1, 2], required: false, type: [Number] })
  @IsArray()
  @IsInt({ each: true }) // validate that each element is an int
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((id) => parseInt(id, 10));
    }
    if (typeof value === 'string') {
      // multiple values from FormData (tagIds=1&tagIds=2) will arrive as string | string[]
      return [parseInt(value, 10)];
    }
    return [];
  })
  tagIds?: number[];
}
