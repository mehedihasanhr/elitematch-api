import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApiKeyMiddleware } from 'src/cores/middlewares/api-key.middleware';

@Module({ imports: [] })
export class ApiKeyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*path');
  }
}
