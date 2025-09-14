import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRelationDto {
  @ApiProperty({
    type: String,
    description: 'Name of the relation entry',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
