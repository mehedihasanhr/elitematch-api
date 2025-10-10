import { PartialType } from '@nestjs/swagger';
import { CreateRateMeetupDto } from './create-rate-meetup.dto';

export class UpdateRateMeetupDto extends PartialType(CreateRateMeetupDto) {}
