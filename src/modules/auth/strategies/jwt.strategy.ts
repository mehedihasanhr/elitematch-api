import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

// Define interface for JWT payload (type safety)
interface JwtPayload {
  id: number; // User ID
  email: string;
  iat?: number; // Issued at
  exp?: number; // Expiration
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization: Bearer <token>
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') ?? 'dev-secret',
    });
  }

  /**
   * Validates the JWT payload and returns user data for the request context.
   * @param payload - Decoded JWT payload
   * @returns User object with role for guards
   * @throws UnauthorizedException if user is not found or invalid
   */
  async validate(payload: JwtPayload) {
    // Validate user existence via AuthService
    const user = await this.authService.validateUser(payload.id);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    // Return user data with role for downstream guards
    return { id: user.id, email: user.email };
  }
}
