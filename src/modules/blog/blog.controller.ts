import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../cores/config/multer.conf';
import { Auth } from '../auth/auth.decorator';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly service: BlogService) {}

  /**
   * Create a new blog post
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  @ApiOperation({ summary: 'Create blog' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Blog Title' },
        slug: { type: 'string', example: 'blog-slug' },
        content: { type: 'string', example: 'Blog content...' },
        authorId: { type: 'number', example: 1 },
        isPublished: { type: 'boolean', example: true },
        categoryId: { type: 'number', example: 1 },
        coverImage: {
          type: 'string',
          format: 'binary',
          description: 'Cover image file',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Blog created' })
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
    @Auth('id') authId?: number,
  ) {
    return this.service.create(dto, file, authId);
  }

  @Get()
  @ApiOperation({ summary: 'List blogs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of blogs' })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.service.findAll(page ?? 1, limit ?? 20);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get blog by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Update blog' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Blog Title' },
        slug: { type: 'string', example: 'updated-blog-slug' },
        content: { type: 'string', example: 'Updated blog content...' },
        isPublished: { type: 'boolean', example: true },
        categoryId: { type: 'number', example: 1 },
        coverImage: {
          type: 'string',
          format: 'binary',
          description: 'Cover image file (optional)',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Blog updated' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, file);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete blog' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
