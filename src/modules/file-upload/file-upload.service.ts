import { BadRequestException, Injectable } from '@nestjs/common';
import { FileService } from 'src/cores/modules/file/file.service';

@Injectable()
export class FileUploadService {
  constructor(private fileService: FileService) {}

  /**
   * Upload a file and save its metadata to the database.
   * @param file The file to upload.
   */
  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');

    const savedFile = await this.fileService.processAndSaveFile(file);
    return savedFile;
  }

  /**
   * Remove a file by its ID.
   * @param fileId The ID of the file to remove.
   */
  async deleteFile(fileId: number) {
    if (!fileId) throw new BadRequestException('No file ID provided');
    await this.fileService.removeExistingFile(fileId);
    return {
      data: null,
      message: 'File deleted successfully',
      status: 'success',
      statusCode: 200,
    };
  }
}
