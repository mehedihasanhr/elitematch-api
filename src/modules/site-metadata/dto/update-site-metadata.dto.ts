import { PartialType } from '@nestjs/swagger';
import { CreateSiteMetadataDto } from './create-site-metadata.dto';

export class UpdateSiteMetadataDto extends PartialType(CreateSiteMetadataDto) {}
