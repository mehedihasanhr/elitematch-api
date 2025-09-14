import { Module } from '@nestjs/common';
import { ProfileRelationsService } from './profile-relations.service';
import { ProfileRelationsController } from './profile-relations.controller';
import { PrismaModule } from 'src/cores/modules/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [ProfileRelationsService],
  controllers: [ProfileRelationsController],
})
export class ProfileRelationsModule {}
