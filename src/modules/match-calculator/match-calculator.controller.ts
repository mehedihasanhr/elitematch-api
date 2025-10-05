import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMatchCalculatorDto } from './dto/create-match-calculator.dto';
import { MatchCalculatorService } from './match-calculator.service';
import { UpdateMatchCalculatorDto } from './dto/update-match-calculator.dto';

@ApiTags('match-calculator')
@Controller('match-calculator')
export class MatchCalculatorController {
  constructor(
    private readonly matchCalculatorService: MatchCalculatorService,
  ) {}

  /**
   * Creates a new match calculation.
   * @param createMatchCalculatorDto Data for creating the match calculation
   * @param authId ID of the authenticated user
   * @returns Created match calculation entry
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new match couple',
    description: 'Creates a new match couple with the provided details.',
  })
  @ApiBody({ type: CreateMatchCalculatorDto })
  create(
    @Body() createMatchCalculatorDto: CreateMatchCalculatorDto,
    @Auth('id') authId: number,
  ) {
    return this.matchCalculatorService.create(createMatchCalculatorDto, authId);
  }

  /**
   * Retrieves a list of all match calculations.
   * @param query Query parameters for filtering and pagination
   * @param authId ID of the authenticated user
   * @returns Paginated list of match calculations
   */
  @Get()
  @ApiOperation({
    summary: 'List all match calculations',
    description:
      'Retrieves a paginated list of match calculations with optional filtering.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@Query() query: Record<string, unknown>, @Auth('id') authId: number) {
    return this.matchCalculatorService.findAll(query, authId);
  }

  /**
   * Retrieves a list of all match couples.
   * @param query Query parameters for filtering and pagination
   * @returns Paginated list of match couples
   */
  @Get('/match-couples')
  @ApiOperation({
    summary: 'List all match couples',
    description:
      'Retrieves a list of all match couples created by match makers.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAllMatchCouples(@Query() query: Record<string, unknown>) {
    return this.matchCalculatorService.findAllMatchCouples(query);
  }

  /**
   * Updates a match couple by ID
   * @param id ID of the match couple to update
   * @param data Updated match couple data
   * @returns Updated match couple
   */
  @Patch('/match-couples/:id')
  @ApiOperation({
    summary: 'Update match couple',
    description: 'Updates the details of a specific match couple.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateMatchCouple(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMatchCalculatorDto,
  ) {
    return this.matchCalculatorService.updateMatchCouple(id, data);
  }

  /**
   * Deletes a match couple by ID
   * @param id ID of the match couple to delete
   * @returns Deleted match couple
   */
  @Delete('/match-couples/:id')
  @ApiOperation({
    summary: 'Delete match couple',
    description: 'Deletes a specific match couple by ID.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeMatchCouple(@Param('id', ParseIntPipe) id: number) {
    return this.matchCalculatorService.deleteMatchCouple(id);
  }

  /**
   * Calculate the match score between two users.
   * @param userAId ID of the first user
   * @param userBId ID of the second user
   * @returns Match score between the two users
   */
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
