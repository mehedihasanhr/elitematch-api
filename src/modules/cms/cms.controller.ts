import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ApiQuery, ApiBody } from '@nestjs/swagger';
import { CmsService, PaginatedResult } from './cms.service';
import { Cms } from '@prisma/client';
import { CreateCmsDto } from './dto/create-cms.dto';
import { UpdateCmsDto } from './dto/update-cms.dto';
import { QueryCmsDto } from './dto/query-cms.dto';

@ApiTags('cms')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post()
  @ApiOperation({ summary: 'Create CMS entry' })
  @ApiCreatedResponse({ description: 'CMS entry created' })
  @ApiBody({ type: CreateCmsDto })
  @ApiBadRequestResponse({ description: 'Validation error / slug exists' })
  create(@Body() dto: CreateCmsDto) {
    return this.cmsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List CMS entries (paginated)' })
  @ApiOkResponse({ description: 'List returned' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query() query: QueryCmsDto): Promise<PaginatedResult<Cms>> {
    return this.cmsService.findAll(query);
  }

  /**
   * Get cms data by cms id or slug
   */
  @Get(':slugOrId')
  @ApiOperation({ summary: 'Get CMS entry by id' })
  @ApiOkResponse({ description: 'CMS entry found' })
  @ApiNotFoundResponse({ description: 'Not found' })
  findOne(@Param('slugOrId') slugOrId: string) {
    return this.cmsService.findOne(slugOrId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update CMS entry' })
  @ApiOkResponse({ description: 'CMS entry updated' })
  @ApiBody({ type: UpdateCmsDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCmsDto) {
    return this.cmsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete CMS entry' })
  @ApiOkResponse({ description: 'CMS entry deleted' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.remove(id);
  }
}
