import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 1, description: 'User id owning the profile' })
  userId: number;

  @ApiProperty({ example: 'https://cdn.example.com/avatar.jpg' })
  avatar: string;

  @ApiProperty({ example: 'Software Engineer' })
  occupation: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dateOfBirth: string;

  @ApiProperty({ example: 'A short bio', description: 'Profile bio' })
  bio: string;

  @ApiProperty({ example: 'Lagos' })
  city: string;
}
