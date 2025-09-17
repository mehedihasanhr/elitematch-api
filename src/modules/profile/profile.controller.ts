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
  @ApiResponse({
    status: 201,
    description: 'Profile created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid data',
  })
  create(
    @Body() dto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(dto, file);
  }

  @Get()
  @ApiOperation({ summary: 'List profiles' })
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
  @ApiResponse({
    status: 200,
    description: 'List of profiles returned successfully',
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.service.findAll(page ?? 1, limit ?? 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Profile ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile found',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update profile' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Profile ID',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete profile' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Profile ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
