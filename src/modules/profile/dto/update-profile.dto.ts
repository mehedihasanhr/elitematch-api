import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    example: 1,
    description: 'User id owning the profile',
    required: false,
  })
  userId?: number;

  @ApiProperty({
    example: 'https://cdn.example.com/avatar.jpg',
    required: false,
  })
  avatar?: string;

  @ApiProperty({ example: 'Software Engineer', required: false })
  occupation?: string;
  @ApiProperty({ example: 3, required: false })
  occupationId?: number;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z', required: false })
  dateOfBirth?: string;

  @ApiProperty({ example: 2, required: false })
  educationLevelId?: number;

  @ApiProperty({ example: 4, required: false })
  incomeRangeId?: number;

  @ApiProperty({ example: 1, required: false })
  relationshipStatusId?: number;

  @ApiProperty({
    example: 'A short bio',
    description: 'Profile bio',
    required: false,
  })
  bio?: string;

  @ApiProperty({ example: 'Lagos', required: false })
  city?: string;
}
