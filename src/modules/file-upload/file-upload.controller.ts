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

@Controller('file-upload')
export class FileUploadController {
  constructor(private service: FileUploadService) {}

  /**
   * Upload a file.
   * @param file The file to upload.
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }

  /**
   * Delete a file by its ID.
   * @param fileId The ID of the file to delete.
   */
  @Delete('/:fileId')
  async deleteFile(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.service.deleteFile(fileId);
  }
}
