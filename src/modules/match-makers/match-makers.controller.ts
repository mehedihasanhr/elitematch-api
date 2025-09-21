import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMatchMakerDto } from './dto/create-match-maker.dto';
import { UpdateMatchMakerDto } from './dto/update-match-maker.dto';
import { MatchMakersService } from './match-makers.service';

@ApiTags('match-makers')
@Controller('match-makers')
export class MatchMakersController {
  constructor(private readonly matchMakersService: MatchMakersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new MatchMaker' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateMatchMakerDto })
  create(@Body() createMatchMakerDto: CreateMatchMakerDto) {
    return this.matchMakersService.create(createMatchMakerDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all MatchMakers with pagination' })
  findAll(@Query() query: Record<string, string>) {
    return this.matchMakersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a MatchMaker by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ required: true, name: 'id', description: 'MatchMaker ID' })
  findOne(@Param('id') id: string) {
    return this.matchMakersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a MatchMaker by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ required: true, name: 'id', description: 'MatchMaker ID' })
  @ApiBody({ type: UpdateMatchMakerDto })
  update(
    @Param('id') id: string,
    @Body() updateMatchMakerDto: UpdateMatchMakerDto,
  ) {
    return this.matchMakersService.update(+id, updateMatchMakerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a MatchMaker by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ required: true, name: 'id', description: 'MatchMaker ID' })
  remove(@Param('id') id: string) {
    return this.matchMakersService.remove(+id);
  }
}
