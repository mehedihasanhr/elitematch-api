import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogTagService } from './blog-tag.service';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('blog-tags')
@Controller('tags')
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  @Post()
  @ApiOperation({ summary: 'Create blog tag' })
  @ApiBody({ type: CreateBlogTagDto })
  create(@Body() createBlogTagDto: CreateBlogTagDto) {
    return this.blogTagService.create(createBlogTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog tags' })
  findAll() {
    return this.blogTagService.findAll();
  }
}
