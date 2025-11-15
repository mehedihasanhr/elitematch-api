import { PartialType } from '@nestjs/swagger';
import { CreateSiteMetaSeoDto } from './create-site-meta-seo.dto';

export class UpdateSiteMetaSeoDto extends PartialType(CreateSiteMetaSeoDto) {}
