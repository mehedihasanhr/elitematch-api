import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { multerOptions } from '../../cores/config/multer.conf';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  /**
   * ProfileController constructor
   * @param service - Service layer providing profile CRUD operations.
   */
  constructor(private readonly service: ProfileService) {}

  /**
   * @param dto - CreateProfileDto containing the profile payload.
   * @returns The created profile record.
   */
  @Post()
  @UseInterceptors(FilesInterceptor('avatars', 10, multerOptions))
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
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.create(dto, files);
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

  @Get('/unlocked')
  @ApiOperation({ summary: 'List unlocked profiles by user' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUnlockedProfiles(@Auth('id') userId: number) {
    return this.service.getUnlockedProfiles(userId);
  }

  @Get('/by/user_id/:id')
  @ApiOperation({ summary: 'Get profile by user id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  findByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByUserId(id);
  }

  @Get('/details/:id')
  @ApiOperation({ summary: 'Get profile by id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  findOne(@Param('id', ParseIntPipe) id: number, @Auth('id') userId: number) {
    return this.service.findOne(id, userId);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('avatars', 10, multerOptions))
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.update(id, dto, files);
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

  @Patch(':id/unlock')
  @ApiOperation({ summary: 'Unlock profile' })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'Profile ID to unlock',
  })
  async unlockProfile(
    @Param('id', ParseIntPipe) id: number,
    @Auth('id') userId: number,
  ) {
    await this.service.unlockProfile(id, userId);
  }

  @Delete(':id/avatar/:avatarId')
  @ApiOperation({ summary: 'Delete profile avatar' })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    description: 'Profile ID',
  })
  @ApiParam({
    name: 'avatarId',
    description: 'Avatar ID',
  })
  async removeAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Param('avatarId', ParseIntPipe) avatarId: number,
  ) {
    return this.service.deleteProfileFile(id, avatarId);
  }
}
