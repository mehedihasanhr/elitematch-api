import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({
    example: 'Alice Johnson',
    description: 'Name of the contact person',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty({
    example: 'alicejohnson@example.com',
    description: 'Email address of the contact person',
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @ApiProperty({
    example: '+1234567890',
    maxLength: 20,
    description: 'Phone number of the contact person (optional)',
  })
  @IsString({ message: 'Phone must be a string' })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'Inquiry about services',
    description: 'Subject of the contact message',
  })
  @IsString({ message: 'Subject must be a string' })
  @IsNotEmpty({ message: 'Subject should not be empty' })
  subject: string;

  @ApiProperty({
    example: 'I would like to know more about your services.',
    description: 'Content of the contact message',
  })
  @IsString({ message: 'Message must be a string' })
  @IsNotEmpty({ message: 'Message should not be empty' })
  message: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the message has been read',
  })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
