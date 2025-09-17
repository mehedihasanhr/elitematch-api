import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  /**
   * Get all users with optional pagination.
   * @param query - Filtering and pagination parameters.
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
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
    name: 'search',
    required: false,
    type: String,
    description: 'Search term',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users returned successfully',
  })
  async findAll(@Query() query: Record<string, string>) {
    return this.service.findAll(query);
  }

  /**
   * Get a user by their ID.
   * @param id - The ID of the user to retrieve.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}
