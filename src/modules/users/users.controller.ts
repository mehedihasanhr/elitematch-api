import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  /**
   * Get all users with optional pagination.
   * @param query - Filtering and pagination parameters.
   */
  @Get()
  async findAll(@Query() query: Record<string, string>) {
    return this.service.findAll(query);
  }

  /**
   * Get a user by their ID.
   * @param id - The ID of the user to retrieve.
   */
  @Get('/id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}
