import { GoogleScriptType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleScriptDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(GoogleScriptType)
  @IsNotEmpty()
  gtype: GoogleScriptType;

  @IsString()
  @IsNotEmpty()
  script: string;
}
