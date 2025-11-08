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
import { StripeModule } from './cores/modules/stripe/stripe.module';
import { UsersModule } from './modules/users/users.module';
import { MatchMakersModule } from './modules/match-makers/match-makers.module';
import { NoteModule } from './modules/note/note.module';
import { MatchCalculatorModule } from './modules/match-calculator/match-calculator.module';
import { CommentModule } from './modules/comment/comment.module';
import { BlogSeoModule } from './modules/blog-seo/blog-seo.module';
import { NewsletterSubscriberModule } from './modules/newsletter-subscriber/newsletter-subscriber.module';
import { SiteMetadataModule } from './modules/site-metadata/site-metadata.module';
import { GoogleScriptModule } from './modules/google-script/google-script.module';
import { QuickLinkModule } from './modules/quick-link/quick-link.module';
import { BlogTagModule } from './modules/blog-tag/blog-tag.module';
import { RoleModule } from './modules/role-management/role/role.module';
import { PermissionModule } from './modules/role-management/permission/permission.module';
import { MeetupModule } from './modules/meetup/meetup.module';
import { RateMeetupModule } from './modules/rate-meetup/rate-meetup.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { ContactMessageModule } from './modules/contact-message/contact-message.module';
import { StoryModule } from './modules/story/story.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MessageModule } from './modules/message/message.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { NotificationGateway } from './cores/modules/notification/notification.gateway';
import { ReportsModule } from './modules/reports/reports.module';
import { TransactionModule } from './modules/transaction/transaction.module';

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
    BlogSeoModule,
    NewsletterSubscriberModule,
    SiteMetadataModule,
    GoogleScriptModule,
    QuickLinkModule,
    BlogTagModule,
    RoleModule,
    PermissionModule,
    MeetupModule,
    RateMeetupModule,
    TestimonialModule,
    ContactMessageModule,
    StoryModule,
    ChatsModule,
    MessageModule,
    SettingsModule,
    ReportsModule,
    TransactionModule,
  ],
  providers: [NotificationGateway],
})
export class AppModule {}
