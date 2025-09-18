import { PartialType } from '@nestjs/swagger';
import { CreateGoogleScriptDto } from './create-google-script.dto';

export class UpdateGoogleScriptDto extends PartialType(CreateGoogleScriptDto) {}
