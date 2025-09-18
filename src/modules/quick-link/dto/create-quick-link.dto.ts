import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateQuickLinkDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsUrl()
  link: string;
}
