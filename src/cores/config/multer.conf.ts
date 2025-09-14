import { type Options, type FileFilterCallback, memoryStorage } from 'multer';
import type { Request } from 'express';

export const multerOptions: Options = {
  storage: memoryStorage() as unknown as NonNullable<Options['storage']>,

  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ): void => {
    const f = file as { mimetype: string };
    if (!f.mimetype.startsWith('image/')) {
      // Use a plain Error to conform to multer's expected callback signature

      cb(new Error('Only image files are allowed!'));
      return;
    }

    cb(null, true);
  },

  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
};
