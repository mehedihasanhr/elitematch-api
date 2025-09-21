import { ApiProperty } from '@nestjs/swagger';
import { GoogleScriptType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleScriptDto {
  @ApiProperty({ required: true, name: 'title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, name: 'gtype', enum: GoogleScriptType })
  @IsEnum(GoogleScriptType)
  @IsNotEmpty()
  gtype: GoogleScriptType;

  @ApiProperty({ required: true, name: 'script' })
  @IsString()
  @IsNotEmpty()
  script: string;
}
