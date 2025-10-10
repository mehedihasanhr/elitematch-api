import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMeetupDto {
  @ApiProperty({
    example: 'Tech Conference 2023',
    description: 'The name of the meetup',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: 'Restaurant at 123 Main St, Springfield, USA',
    description: 'Where the meetup will take place',
  })
  @IsString()
  @IsNotEmpty({ message: 'Location is required.' })
  location: string;

  @ApiProperty({
    example: '2023-09-15T18:00:00Z',
    description: 'The date and time of the meetup in ISO 8601 format',
  })
  @IsDateString({}, { message: 'Date must be in ISO 8601 format' })
  @IsNotEmpty({ message: 'Date is required.' })
  date: Date;

  @ApiProperty({
    example: 'A meetup to discuss the latest in technology.',
    description: 'A brief description of the meetup',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 42,
    description: 'The ID of the associated match couple',
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'Match couple ID is required.' })
  matchCoupleId: number;
}
