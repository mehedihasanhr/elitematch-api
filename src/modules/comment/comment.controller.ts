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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Auth } from '../auth/auth.decorator';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Auth('id') authId: number,
  ) {
    return this.commentService.create(createCommentDto, authId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'List of comments returned successfully',
  })
  findAll(@Query() query: Record<string, string | string[]>) {
    return this.commentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comment by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment found',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comment by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment ID',
  })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'Comment updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Comment ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
