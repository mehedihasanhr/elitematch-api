import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface AuthUser {
  userId: number;
  role?: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();
    return request.user;
  },
);
