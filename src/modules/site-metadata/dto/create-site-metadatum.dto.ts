import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSiteMetadatumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  organization: string;

  @IsString()
  @IsOptional()
  description?: string;
}
