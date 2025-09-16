import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Meeting notes', description: 'Title of the note' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Summary of the meeting...',
    description: 'Content of the note',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: false,
    required: false,
    description: 'Is the note pinned?',
  })
  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @ApiProperty({
    example: '2025-09-17T12:00:00Z',
    required: false,
    description: 'Publish date',
  })
  @IsOptional()
  @IsDateString()
  publish?: string;
}
