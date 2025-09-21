import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';
import { NewsletterSubscriberService } from './newsletter-subscriber.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('newsletter-subscriber')
@Controller('newsletter-subscriber')
export class NewsletterSubscriberController {
  constructor(
    private readonly newsletterSubscriberService: NewsletterSubscriberService,
  ) {}

  @Post()
  create(@Body() createNewsletterSubscriberDto: CreateNewsletterSubscriberDto) {
    return this.newsletterSubscriberService.create(
      createNewsletterSubscriberDto,
    );
  }

  @Get()
  findAll(@Query() query: Record<string, string | string[]>) {
    return this.newsletterSubscriberService.findAll(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsletterSubscriberService.remove(+id);
  }
}
