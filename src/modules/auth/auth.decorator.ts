import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTUser } from '../../global';

/**
 * Usage:
 *  - @Auth() user: JWTUser
 *  - @Auth('userId') userId: number
 *  - @Auth('email') email:string
 */
export const Auth = createParamDecorator(
  (
    data: keyof JWTUser | undefined,
    ctx: ExecutionContext,
  ): JWTUser | JWTUser[keyof JWTUser] | null => {
    const request = ctx.switchToHttp().getRequest<{ user?: JWTUser }>();
    const user = request.user;
    if (!user) return null;
    if (!data) return user;
    return user[data] ?? null;
  },
);
