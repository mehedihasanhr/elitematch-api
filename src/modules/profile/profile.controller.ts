import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
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
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../cores/config/multer.conf';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  /**
   * ProfileController constructor
   * @param service - Service layer providing profile CRUD operations.
   */
  constructor(private readonly service: ProfileService) {}

  /**
   * HTTP POST /profiles
   *
   * Create a new profile resource. The request body is validated by DTO
   * annotations and then delegated to the service layer for persistence.
   *
   * @param dto - CreateProfileDto containing the profile payload.
   * @returns The created profile record.
   */
  @Post()
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @ApiOperation({ summary: 'Create profile' })
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201, description: 'Profile created' })
  create(
    @Body() dto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(dto, file);
  }

  @Get()
  @ApiOperation({ summary: 'List profiles' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of profiles' })
  /**
   * HTTP GET /profiles
   *
   * Return a list of all profiles. Consider adding query parameters for
   * pagination and filtering in future iterations.
   *
   * @returns Array of profile records.
   */
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.service.findAll(page ?? 1, limit ?? 20);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Get profile by id' })
  /**
   * HTTP GET /profiles/:id
   *
   * Retrieve a single profile by its id. Returns 404 when not found.
   *
   * @param id - Numeric identifier parsed by ParseIntPipe.
   * @returns The requested profile record.
   */
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOperation({ summary: 'Update profile' })
  /**
   * HTTP PUT /profiles/:id
   *
   * Update an existing profile. Only provided fields in the body will be
   * updated. The service layer performs a partial update.
   *
   * @param id - Numeric identifier of the profile to update.
   * @param dto - UpdateProfileDto with fields to modify.
   * @returns The updated profile record.
   */
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Delete profile' })
  /**
   * HTTP DELETE /profiles/:id
   *
   * Permanently remove a profile. Use with caution — consider soft-delete if
   * a recoverable or auditable delete is required.
   *
   * @param id - Numeric identifier of the profile to delete.
   * @returns The deleted profile record.
   */
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
