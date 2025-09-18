import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { BlogSeoService } from './blog-seo.service';
import { CreateBlogSeoDto } from './dto/create-blog-seo.dto';
import { UpdateBlogSeoDto } from './dto/update-blog-seo.dto';

@ApiTags('blog-seo')
@Controller('blog-seo')
export class BlogSeoController {
  constructor(private readonly blogSeoService: BlogSeoService) {}

  @Post()
  @ApiOperation({ summary: 'Create blog SEO' })
  @ApiBody({ type: CreateBlogSeoDto })
  @ApiResponse({
    status: 201,
    description: 'Blog SEO created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid data',
  })
  create(@Body() createBlogSeoDto: CreateBlogSeoDto) {
    return this.blogSeoService.create(createBlogSeoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog SEOs' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'blogId',
    required: false,
    type: Number,
    description: 'Filter by blog ID',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'Filter by title (partial match)',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    type: String,
    description: 'Filter by description',
  })
  @ApiResponse({
    status: 200,
    description: 'List of blog SEOs returned successfully',
  })
  findAll(@Query() query: Record<string, string | string[]>) {
    return this.blogSeoService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog SEO by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Blog SEO ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog SEO found',
  })
  @ApiResponse({
    status: 404,
    description: 'Blog SEO not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogSeoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update blog SEO by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Blog SEO ID',
  })
  @ApiBody({ type: UpdateBlogSeoDto })
  @ApiResponse({
    status: 200,
    description: 'Blog SEO updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Blog SEO not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogSeoDto: UpdateBlogSeoDto,
  ) {
    return this.blogSeoService.update(id, updateBlogSeoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete blog SEO by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Blog SEO ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog SEO deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Blog SEO not found',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogSeoService.remove(id);
  }
}
