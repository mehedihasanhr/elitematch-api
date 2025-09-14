import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/cores/modules/prisma/prisma.module';
import { FileModule } from './cores/modules/file/file.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './cores/modules/token/token.module';
import { ProfileRelationsModule } from 'src/modules/profile-relations/profile-relations.module';
import { ProfileModule } from 'src/modules/profile/profile.module';
import { BlogModule } from 'src/modules/blog/blog.module';
import { BlogCategoryModule } from 'src/modules/blog-category/blog-category.module';
import { MailModule } from './cores/modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    PrismaModule,
    MailModule,
    AuthModule,
    TokenModule,
    ProfileModule,
    ProfileRelationsModule,
    BlogModule,
    BlogCategoryModule,
    FileModule,
  ],
  // AuthService and AuthController are provided by AuthModule
})
export class AppModule {}
