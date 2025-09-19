import { Module } from '@nestjs/common';
import { BlogTagService } from './blog-tag.service';
import { BlogTagController } from './blog-tag.controller';

@Module({
  controllers: [BlogTagController],
  providers: [BlogTagService],
})
export class BlogTagModule {}
