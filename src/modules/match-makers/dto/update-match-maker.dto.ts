import { PartialType } from '@nestjs/swagger';
import { CreateMatchMakerDto } from './create-match-maker.dto';

export class UpdateMatchMakerDto extends PartialType(CreateMatchMakerDto) {}
