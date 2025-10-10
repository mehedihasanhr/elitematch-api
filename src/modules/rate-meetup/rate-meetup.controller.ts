import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RateMeetupService } from './rate-meetup.service';
import { CreateRateMeetupDto } from './dto/create-rate-meetup.dto';
import { UpdateRateMeetupDto } from './dto/update-rate-meetup.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('rate-meetup')
@Controller('rate-meetup')
export class RateMeetupController {
  constructor(private readonly rateMeetupService: RateMeetupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rate meetup entry' })
  @ApiBody({ type: CreateRateMeetupDto })
  create(@Body() createRateMeetupDto: CreateRateMeetupDto) {
    return this.rateMeetupService.create(createRateMeetupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rate meetup entries' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: Record<string, any>) {
    return this.rateMeetupService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rate meetup entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.rateMeetupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rate meetup entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRateMeetupDto })
  update(
    @Param('id') id: string,
    @Body() updateRateMeetupDto: UpdateRateMeetupDto,
  ) {
    return this.rateMeetupService.update(+id, updateRateMeetupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rate meetup entry by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.rateMeetupService.remove(+id);
  }
}
