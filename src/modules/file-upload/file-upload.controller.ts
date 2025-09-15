import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('file-upload')
export class FileUploadController {
  constructor(private service: FileUploadService) {}

  /**
   * Upload a file.
   * @param file The file to upload.
   */
  @Post()
  @ApiTags('file-upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'File uploaded' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }

  /**
   * Delete a file by its ID.
   * @param fileId The ID of the file to delete.
   */
  @Delete('/:fileId')
  @ApiOperation({ summary: 'Delete a file by id' })
  @ApiOkResponse({ description: 'File deleted' })
  async deleteFile(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.service.deleteFile(fileId);
  }
}
