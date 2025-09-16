import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionPlanService } from './subscription-plan.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subcription-plan.dto';

@ApiTags('subscription-plans')
@Controller('subscription-plans')
export class SubscriptionPlanController {
  constructor(private readonly service: SubscriptionPlanService) {}

  @Get()
  @ApiOperation({ summary: 'List all subscription plans' })
  @ApiOkResponse({
    description: 'List of subscription plans returned successfully',
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subscription plan by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Subscription plan fetched successfully' })
  @ApiNotFoundResponse({ description: 'Subscription plan not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a subscription plan (admin only)' })
  @ApiCreatedResponse({ description: 'Subscription plan created successfully' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateSubscriptionPlanDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a subscription plan (admin only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Subscription plan updated successfully' })
  @ApiNotFoundResponse({ description: 'Subscription plan not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubscriptionPlanDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a subscription plan (admin only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Subscription plan deleted successfully' })
  @ApiNotFoundResponse({ description: 'Subscription plan not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
