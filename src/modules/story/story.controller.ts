import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { multerOptions } from 'src/cores/config/multer.conf';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryService } from './story.service';

@ApiTags('stories')
@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new story' })
  @ApiBody({ type: CreateStoryDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  create(
    @Body() createStoryDto: CreateStoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.storyService.create(createStoryDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stories' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: Record<string, any>) {
    return this.storyService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a story by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a story by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateStoryDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoryDto: UpdateStoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.storyService.update(id, updateStoryDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a story by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storyService.remove(id);
  }
}
