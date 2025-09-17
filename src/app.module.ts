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
import { CmsModule } from './modules/cms/cms.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { SubscriptionPlanModule } from './modules/subscription-plan/subscription-plan.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { StripeModule } from './cores/modules/stripe/stripe.module';
import { UsersModule } from './modules/users/users.module';
import { MatchMakersModule } from './modules/match-makers/match-makers.module';
import { NoteModule } from './modules/note/note.module';
import { MatchCalculatorModule } from './modules/match-calculator/match-calculator.module';
import { CommentModule } from './modules/comment/comment.module';

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
    CmsModule,
    FileUploadModule,
    SubscriptionPlanModule,
    SubscriptionModule,
    StripeModule,
    UsersModule,
    MatchMakersModule,
    NoteModule,
    MatchCalculatorModule,
    CommentModule,
  ],
  providers: [],
  // AuthService and AuthController are provided by AuthModule
})
export class AppModule {}
