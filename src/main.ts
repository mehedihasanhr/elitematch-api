import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './cores/interceptors/response.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const corOrigins = process.env.CORS_ORIGINS ?? '*';

  // Serve static files for favicon and other assets
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  // Serve uploaded files (images, docs, kyc assets)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Enable CORS for development
  app.enableCors({
    origin: corOrigins.split(','),
    credentials: true,
  });
  // cookies
  app.use(cookieParser());

  // configure global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // configure global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Elite Match Africa API')
    .addServer(
      process.env.DEV_SERVER_URL || 'http://localhost:14001',
      'Development Server',
    )
    .addServer(
      process.env.PROD_SERVER_URL || 'http://localhost:14001',
      'Production Server',
    )
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token (without "Bearer" prefix)',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 14001, () => {
    const port = process.env.PORT ?? 14001;
    const logger = new Logger('Bootstrap');
    logger.log(`🚀 Server is running on http://localhost:${port}`);
    logger.log(
      `📚 API Documentation available at http://localhost:${port}/api/docs`,
    );
    logger.log(`🔍 API Base URL: http://localhost:${port}/api/v1`);
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
