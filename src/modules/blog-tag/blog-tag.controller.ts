import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogTagService } from './blog-tag.service';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('tags')
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  @ApiOperation({ summary: 'Create blog tag' })
  @Post()
  create(@Body() createBlogTagDto: CreateBlogTagDto) {
    return this.blogTagService.create(createBlogTagDto);
  }

  @Get()
  findAll() {
    return this.blogTagService.findAll();
  }
}
