import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the person giving the testimonial',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Author of the testimonial',
  })
  @IsString()
  @IsNotEmpty({ message: 'Author should not be empty' })
  author: string;

  @ApiProperty({
    example: 'This product changed my life!',
    description: 'Content of the testimonial',
  })
  @IsString()
  @IsNotEmpty({ message: 'Content should not be empty' })
  @MaxLength(1000, {
    message: (args) =>
      `Content is too long. Please shorten it — the maximum allowed length is ${args.constraints[0]} characters.`,
  })
  content: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the testimonial is active',
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'boolean') return value;
    const v = String(value).toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(v)) return true;
    if (['false', '0', 'no', 'off'].includes(v)) return false;
    return Boolean(value);
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Thumbnail image for the testimonial',
  })
  @IsOptional()
  thumbnail?: any;
}
