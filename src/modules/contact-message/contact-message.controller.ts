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
import { ContactMessageService } from './contact-message.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('contact-messages')
@Controller('contact-message')
export class ContactMessageController {
  constructor(private readonly contactMessageService: ContactMessageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact message' })
  @ApiBody({ type: CreateContactMessageDto })
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactMessageService.create(createContactMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: Record<string, any>) {
    return this.contactMessageService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact message by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.contactMessageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact message by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateContactMessageDto })
  update(
    @Param('id') id: string,
    @Body() updateContactMessageDto: UpdateContactMessageDto,
  ) {
    return this.contactMessageService.update(+id, updateContactMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact message by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.contactMessageService.remove(+id);
  }
}
