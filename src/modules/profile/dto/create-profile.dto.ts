import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    example: 1,
    description: 'User ID owning the profile',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'https://cdn.example.com/avatar.jpg',
    description: 'Profile avatar URL',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'Introduction video link',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  introductionVideoLink: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'User occupation',
    required: true,
  })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({
    example: 3,
    description: 'Occupation id (preferred)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  occupationId?: number;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Date of birth in ISO format',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({
    example: "Bachelor's Degree",
    description: 'Education level',
    required: true,
  })
  @IsOptional()
  @IsString()
  educationLevel?: string;

  @ApiProperty({
    example: 2,
    description: 'Education level id (preferred)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  educationLevelId?: number;

  @ApiProperty({
    example: '$50,000 - $100,000',
    description: 'Income range',
    required: true,
  })
  @IsOptional()
  @IsString()
  incomeRange?: string;

  @ApiProperty({
    example: 4,
    description: 'Income range id (preferred)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  incomeRangeId?: number;

  @ApiProperty({
    example: 'Single',
    description: 'Relationship status',
    required: true,
  })
  @IsOptional()
  @IsString()
  relationshipStatus?: string;

  @ApiProperty({
    example: 1,
    description: 'Relationship status id (preferred)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  relationshipStatusId?: number;

  @ApiProperty({
    example: 'Male',
    description: 'Gender',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: 'A short bio about the user',
    description: 'Profile bio',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({
    example: 'Lagos',
    description: 'City',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Lagos State',
    description: 'State',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: '100001',
    description: 'Zip code',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    example: 'Nigeria',
    description: 'Country',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: '5\'10"',
    description: 'Height',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  height: string;

  @ApiProperty({
    example: '70kg',
    description: 'Weight',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  weight: string;

  @ApiProperty({
    example: 0,
    description: 'Number of children',
    required: false,
  })
  @IsOptional()
  @IsInt()
  noOfChildren?: number;

  @ApiProperty({
    example: 'Looking for someone who shares my values',
    description: 'Specific partner preferences',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  specificPartnerPreferences: string;

  @ApiProperty({
    example: 'Help me find the right match',
    description: 'Expectations from matchmaker',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  expectationsFromMatchmaker: string;

  @ApiProperty({
    example: 'What should I know about finding love?',
    description: 'Question for matchmaker',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  questionForMatchmaker: string;

  @ApiProperty({
    example: 'Previous relationships taught me...',
    description: 'Past relationship experience',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  pastRelationshipExperience: string;

  @ApiProperty({
    example: 'Communication is key',
    description: 'Lessons learned from past relationships',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lessonsLearnedFromPastRelationships: string;

  @ApiProperty({
    example: 'Avoid rushing into commitments',
    description: 'Patterns to avoid in relationships',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  patternsToAvoidInRelationships: string;
}
