import { Module } from '@nestjs/common';
import { SiteMetadataController } from './site-metadata.controller';
import { SiteMetadataService } from './site-metadata.service';
import { SiteMetaSeoController } from './site-seo.controller';
import { SiteMetaSeoService } from './site-seo.service';

@Module({
  controllers: [SiteMetadataController, SiteMetaSeoController],
  providers: [SiteMetadataService, SiteMetaSeoService],
})
export class SiteMetadataModule {}
