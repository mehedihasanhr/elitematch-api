import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import { extname, join } from 'path';
import sharp from 'sharp';
import { PrismaService } from 'src/cores//services/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  // handle file storing
  async processAndSaveFile(file: Express.Multer.File) {
    const uploadDir = join(process.cwd(), 'uploads');

    // if upload dir not exist create new one
    await fs.mkdir(uploadDir, { recursive: true });

    // Explicitly type fields from Multer file to satisfy strict lint rules
    const f = file as unknown as {
      buffer: Buffer;
      originalname: string;
      mimetype: string;
    };
    const fileBuffer: Buffer = f.buffer;
    const originalName: string = f.originalname;
    const mimeType: string = f.mimetype;

    const fileHash = crypto
      .createHash('sha256')
      .update(fileBuffer)
      .digest('hex');

    // Check for duplicate file
    const existingFile = await this.prisma.file.findUnique({
      where: { hash: fileHash },
    });
    if (existingFile) {
      return existingFile;
    }

    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    // Save original width and height
    const originalWidth = metadata.width ?? 0;
    const originalHeight = metadata.height ?? 0;

    // Resize or optimize image
    const optimizedBuffer: Buffer = await image
      .resize({ width: 1024, withoutEnlargement: true })
      .toBuffer();

    // Save to disk
    const ext = extname(originalName).toLowerCase();
    const filenameHash = crypto
      .createHash('sha256')
      .update(`${Date.now()}-${crypto.randomUUID()}`)
      .digest('hex')
      .slice(0, 16);
    const fileName = `${filenameHash}${ext}`;
    const filePath = join(uploadDir, fileName);
    await fs.writeFile(filePath, optimizedBuffer);

    // Save to DB
    const saved = await this.prisma.file.create({
      data: {
        originalName,
        mimeType,
        fileSize: optimizedBuffer.length,
        extension: ext.replace('.', ''),
        width: originalWidth,
        height: originalHeight,
        url: `/uploads/${fileName}`,
        path: filePath,
        hash: fileHash,
      },
    });

    return saved;
  }

  // Handle to remove unused file
  async removeExistingFile(fileId: number) {
    // checked this file is used by other model or items
    const fileUsageCount = await this.prisma.fileUsage.count({
      where: { fileId },
    });

    if (fileUsageCount === 0) {
      // Get the file information
      const file = await this.prisma.file.findUnique({ where: { id: fileId } });

      if (file) {
        try {
          await fs.unlink(file.path);

          // Remove Record form DB
          await this.prisma.file.delete({ where: { id: file.id } });
        } catch (err) {
          const e = err as NodeJS.ErrnoException;
          if (e.code !== 'ENOENT') {
            console.warn(`Failed to delete file from disk: ${file.path}`, e);
            throw e;
          }
        }
      }
    }
  }
}
