import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupService } from './meetup.service';

@ApiTags('meetups')
@Controller('meetups')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meetup' })
  @ApiBody({ type: CreateMeetupDto })
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupService.create(createMeetupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meetups with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: Record<string, any>) {
    return this.meetupService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meetup by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a meetup by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateMeetupDto })
  update(@Param('id') id: string, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(+id, updateMeetupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a meetup by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.meetupService.remove(+id);
  }
}
