import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MatchCalculatorService } from './match-calculator.service';
import { CreateMatchCalculatorDto } from './dto/create-match-calculator.dto';
import { UpdateMatchCalculatorDto } from './dto/update-match-calculator.dto';

@ApiTags('match-calculator')
@Controller('match-calculator')
export class MatchCalculatorController {
  constructor(
    private readonly matchCalculatorService: MatchCalculatorService,
  ) {}

  @Post()
  create(@Body() createMatchCalculatorDto: CreateMatchCalculatorDto) {
    return this.matchCalculatorService.create(createMatchCalculatorDto);
  }

  @Get()
  findAll() {
    return this.matchCalculatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchCalculatorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchCalculatorDto: UpdateMatchCalculatorDto,
  ) {
    return this.matchCalculatorService.update(+id, updateMatchCalculatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchCalculatorService.remove(+id);
  }

  @Get('calculate/:userAId/:userBId')
  @ApiOperation({
    summary: 'Calculate match score between two users',
    description:
      'Computes overall match percentage and individual attribute scores based on profile data.',
  })
  @ApiParam({
    name: 'userAId',
    description: 'ID of the first user',
    type: Number,
  })
  @ApiParam({
    name: 'userBId',
    description: 'ID of the second user',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Match score calculated successfully',
    schema: {
      type: 'object',
      properties: {
        overallMatch: {
          type: 'number',
          description: 'Overall match percentage (0-100)',
          example: 75,
        },
        attributeScores: {
          type: 'object',
          description: 'Individual scores for each attribute',
          example: {
            occupation: 100,
            educationLevel: 0,
            height: 80,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found for one or both users',
  })
  async calculateMatch(
    @Param('userAId') userAId: string,
    @Param('userBId') userBId: string,
  ) {
    return this.matchCalculatorService.calculateMatchScore(+userAId, +userBId);
  }
}
