import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateQuickLinkDto {
  @ApiProperty({ required: true, name: 'label' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ required: true, name: 'link', type: String })
  @IsString()
  @IsUrl()
  link: string;
}
