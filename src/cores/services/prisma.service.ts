import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger('PrismaService');

  async onModuleInit() {
    this.logger.debug('Connecting to the database...');
    await this.$connect();
  }

  async onModuleDestroy() {
    this.logger.debug('Disconnecting from the database...');
    await this.$disconnect();
  }
}
