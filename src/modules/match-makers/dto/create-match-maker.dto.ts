import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchMakerDto {
  @ApiProperty({
    example: 8,
    description: 'User ID associated with the match maker',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'Experience year is required' })
  experienceYear: number;

  @ApiProperty({
    example: true,
    description: 'Active status of the match maker',
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty({ message: 'Active status is required' })
  active?: true;
}
