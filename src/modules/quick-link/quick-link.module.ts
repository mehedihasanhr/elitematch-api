import { Module } from '@nestjs/common';
import { QuickLinkService } from './quick-link.service';
import { QuickLinkController } from './quick-link.controller';

@Module({
  controllers: [QuickLinkController],
  providers: [QuickLinkService],
})
export class QuickLinkModule {}
