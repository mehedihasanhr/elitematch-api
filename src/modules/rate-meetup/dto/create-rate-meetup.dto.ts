import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRateMeetupDto {
  @ApiProperty({ example: 1, description: 'ID of the meetup being rated' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'Meetup ID is required' })
  meetupId: number;

  @ApiProperty({
    example: 5,
    description: 'Rating score for the meetup (1-5)',
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'Rating score is required' })
  rating: number;

  @ApiProperty({
    example: 'Great meetup!',
    description: 'Optional comment about the meetup',
    required: false,
  })
  @IsString()
  @IsOptional()
  review?: string;

  @ApiProperty({ example: 1, description: 'User ID' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: number;
}
