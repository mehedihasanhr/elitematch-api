import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { ProfileRelationsService } from './profile-relations.service';
import { Auth } from '../auth/auth.decorator';

@ApiTags('profile-relations')
@Controller('profile-relations')
export class ProfileRelationsController {
  constructor(private readonly service: ProfileRelationsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create relation entry for profile (model in path)',
  })
  @ApiParam({
    name: 'model',
    description: 'The relation model name (see supported list)',
    required: true,
  })
  @ApiBody({ type: CreateRelationDto, required: true })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid request or unsupported model',
  })
  @Post(':model')
  async create(
    @Param('model') model: string,
    @Body() dto: CreateRelationDto,
    @Auth('id') userId: number,
  ) {
    return await this.service.create(model, dto, userId);
  }

  @Get(':model')
  @ApiOperation({ summary: 'List relation entries for model' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiParam({
    name: 'model',
    description: 'The relation model name (see supported list)',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'List of records returned' })
  async findAll(
    @Param('model') model: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<any> {
    return await this.service.findAll(model, page ?? 1, limit ?? 20);
  }

  @Get(':model/:id')
  @ApiOperation({ summary: 'Get one relation entry' })
  @ApiParam({
    name: 'model',
    description: 'The relation model name',
    required: true,
  })
  @ApiParam({ name: 'id', description: 'Record id', required: true })
  @ApiResponse({ status: 200, description: 'Record found' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async findOne(
    @Param('model') model: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.service.findOne(model, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':model/:id')
  @ApiOperation({ summary: 'Update relation entry' })
  @ApiParam({
    name: 'model',
    description: 'The relation model name',
    required: true,
  })
  @ApiParam({ name: 'id', description: 'Record id', required: true })
  @ApiBody({ type: CreateRelationDto, required: true })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async update(
    @Param('model') model: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRelationDto,
    @Auth('id') userId: number,
  ): Promise<any> {
    return await this.service.update(model, id, dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':model/:id')
  @ApiOperation({ summary: 'Remove relation entry' })
  @ApiParam({
    name: 'model',
    description: 'The relation model name',
    required: true,
  })
  @ApiParam({ name: 'id', description: 'Record id', required: true })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async remove(
    @Param('model') model: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.service.remove(model, id);
  }
}
