import { Module } from '@nestjs/common';
import { BlogSeoService } from './blog-seo.service';
import { BlogSeoController } from './blog-seo.controller';

@Module({
  controllers: [BlogSeoController],
  providers: [BlogSeoService],
})
export class BlogSeoModule {}
