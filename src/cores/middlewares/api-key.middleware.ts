import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const adminApiKey = this.config.get<string>('ADMIN_API_KEY');

    req['userType'] = apiKey === adminApiKey ? 'admin' : 'user';

    next();
  }
}
