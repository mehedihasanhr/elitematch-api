import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/cores/config/multer.conf';

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new testimonial' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateTestimonialDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.testimonialService.create(createTestimonialDto, file);
  }

  /**
   * Get all testimonials with optional filtering and pagination.
   * @param query - Query parameters for filtering and pagination.
   */
  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
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
  findAll(@Query() query: Record<string, any>) {
    return this.testimonialService.findAll(query);
  }

  /**
   * Get a single testimonial by its ID.
   * @param id - The ID of the testimonial to retrieve.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Testimonial ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialService.findOne(id);
  }

  /**
   * Update a testimonial by its ID.
   * @param id - The ID of the testimonial to update.
   * @param updateTestimonialDto - Data Transfer Object for updating a testimonial.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update testimonial by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'Testimonial ID' })
  @ApiBody({ type: UpdateTestimonialDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.testimonialService.update(+id, updateTestimonialDto, file);
  }

  /**
   * Delete a testimonial by its ID.
   * @param id - The ID of the testimonial to delete.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete testimonial by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'Testimonial ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialService.remove(id);
  }
}
