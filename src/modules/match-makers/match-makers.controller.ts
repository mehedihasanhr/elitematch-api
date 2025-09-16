import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MatchMakersService } from './match-makers.service';
import { CreateMatchMakerDto } from './dto/create-match-maker.dto';
import { UpdateMatchMakerDto } from './dto/update-match-maker.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Auth } from '../auth/auth.decorator';

@Controller('match-makers')
export class MatchMakersController {
  constructor(private readonly matchMakersService: MatchMakersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createMatchMakerDto: CreateMatchMakerDto,
    @Auth('id') userId: number,
  ) {
    return this.matchMakersService.create(createMatchMakerDto, userId);
  }

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.matchMakersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchMakersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchMakerDto: UpdateMatchMakerDto,
  ) {
    return this.matchMakersService.update(+id, updateMatchMakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchMakersService.remove(+id);
  }
}
