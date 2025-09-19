import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMatchCalculatorDto } from './dto/create-match-calculator.dto';
import { MatchCalculatorService } from './match-calculator.service';

@ApiTags('match-calculator')
@Controller('match-calculator')
export class MatchCalculatorController {
  constructor(
    private readonly matchCalculatorService: MatchCalculatorService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createMatchCalculatorDto: CreateMatchCalculatorDto,
    @Auth('id') authId: number,
  ) {
    return this.matchCalculatorService.create(createMatchCalculatorDto, authId);
  }

  @Get()
  findAll() {
    return this.matchCalculatorService.findAll();
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
