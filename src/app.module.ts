import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/cores/modules/prisma/prisma.module';
import { FileModule } from './cores/modules/file/file.module';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthService } from 'src/modules/auth/auth.service';
import { TokenModule } from './cores/modules/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    PrismaModule,
    AuthModule,
    TokenModule,
    FileModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AppModule {}
