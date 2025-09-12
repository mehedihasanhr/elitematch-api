import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FileService } from './file.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
