import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsArray,
  IsNumber,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Avatar file ID',
    required: false,
  })
  @IsOptional()
  @IsInt()
  avatarId?: number;

  @ApiPropertyOptional({
    example: 'https://example.com/video.mp4',
    description: 'Introduction video link',
    required: false,
  })
  @IsOptional()
  @IsString()
  introductionVideoLink?: string;

  @ApiPropertyOptional({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Date of birth in ISO format',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'Occupation ID reference',
    required: false,
  })
  @IsOptional()
  @IsInt()
  occupationId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Education level ID reference',
    required: false,
  })
  @IsOptional()
  @IsInt()
  educationLevelId?: number;

  @ApiPropertyOptional({
    example: 4,
    description: 'Income range ID reference',
    required: false,
  })
  @IsOptional()
  @IsInt()
  incomeRangeId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Relationship status ID reference',
    required: false,
  })
  @IsOptional()
  @IsInt()
  relationshipStatusId?: number;

  @ApiPropertyOptional({
    example: 'Male',
    description: 'Gender',
    required: false,
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    example: 'A short bio about the user',
    description: 'Profile bio',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    example: 'Lagos',
    description: 'City',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: 'Lagos State',
    description: 'State',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: '100001',
    description: 'Zip code',
    required: false,
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiPropertyOptional({
    example: 'Nigeria',
    description: 'Country',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    example: '5\'10"',
    description: 'Height',
    required: false,
  })
  @IsOptional()
  @IsString()
  height?: string;

  @ApiPropertyOptional({
    example: '70kg',
    description: 'Weight',
    required: false,
  })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Number of children',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  noOfChildren?: number;

  @ApiPropertyOptional({
    example: 'Looking for someone who shares my values',
    description: 'Specific partner preferences',
    required: false,
  })
  @IsOptional()
  @IsString()
  specificPartnerPreferences?: string;

  @ApiPropertyOptional({
    example: 'Help me find the right match',
    description: 'Expectations from matchmaker',
    required: false,
  })
  @IsOptional()
  @IsString()
  expectationsFromMatchmaker?: string;

  @ApiPropertyOptional({
    example: 'What should I know about finding love?',
    description: 'Question for matchmaker',
    required: false,
  })
  @IsOptional()
  @IsString()
  questionForMatchmaker?: string;

  @ApiPropertyOptional({
    example: 'Previous relationships taught me...',
    description: 'Past relationship experience',
    required: false,
  })
  @IsOptional()
  @IsString()
  pastRelationshipExperience?: string;

  @ApiPropertyOptional({
    example: 'Communication is key',
    description: 'Lessons learned from past relationships',
    required: false,
  })
  @IsOptional()
  @IsString()
  lessonsLearnedFromPastRelationships?: string;

  @ApiPropertyOptional({
    example: 'Avoid rushing into commitments',
    description: 'Patterns to avoid in relationships',
    required: false,
  })
  @IsOptional()
  @IsString()
  patternsToAvoidInRelationships?: string;

  // Many-to-many relationship arrays
  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'Array of ethnicity IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  ethnicities?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Array of religion IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  religions?: number[];

  @ApiPropertyOptional({
    example: [1, 3, 5],
    description: 'Array of partner quality IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  partnerQualities?: number[];

  @ApiPropertyOptional({
    example: [2, 4],
    description: 'Array of background preference IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  backgroundPreferences?: number[];

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'Array of physical attribute IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  physicalAttributes?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Array of age preference IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  agePreferences?: number[];

  @ApiPropertyOptional({
    example: [1, 3],
    description: 'Array of lifestyle IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  lifeStyle?: number[];

  @ApiPropertyOptional({
    example: [2, 4, 6],
    description: 'Array of core value IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  coreValues?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Array of cultural/religious preference IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  culturalReligiousPreferences?: number[];

  @ApiPropertyOptional({
    example: [1, 3, 5],
    description: 'Array of social activity IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  socialActivities?: number[];

  @ApiPropertyOptional({
    example: [2, 4],
    description: 'Array of relocation IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  relocation?: number[];

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'Array of relationship expectation IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  relationshipExpectations?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Array of ideal relationship IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  idealRelationships?: number[];

  @ApiPropertyOptional({
    example: [1, 3],
    description: 'Array of relationship timeline IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  relationshipTimeline?: number[];

  @ApiPropertyOptional({
    example: [2, 4],
    description: 'Array of family aspiration IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  familyAspirations?: number[];

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'Array of personality trait IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  personalityTraits?: number[];

  @ApiPropertyOptional({
    example: [1, 3, 5],
    description: 'Array of personal interest IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  personalInterests?: number[];

  @ApiPropertyOptional({
    example: [2, 4],
    description: 'Array of intellectual interest IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  intellectualInterests?: number[];

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'Array of wellness interest IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  wellnessInterests?: number[];

  @ApiPropertyOptional({
    example: [1, 3],
    description: 'Array of social circle IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  socialCircles?: number[];

  @ApiPropertyOptional({
    example: [2, 4],
    description: 'Array of luxury alignment IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  luxuryAlignment?: number[];

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Array of allergy IDs',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  allergies?: number[];
}
