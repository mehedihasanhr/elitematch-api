import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(private readonly jwtService: JwtService) {}

  async generateToken(
    payload: Record<string, any>,
    secret: string,
    expiresIn: string | number = '1h',
  ) {
    if (!secret) {
      this.logger.error(
        'Secret key is required to generate token. Please check your environment variables (JWT_ACCESS_SECRET, JWT_REFRESH_TOKEN)',
      );
      throw new InternalServerErrorException(
        'Something went wrong! Please try again later or contact support.',
      );
    }

    try {
      this.logger.debug(`Generating token with expiration: ${expiresIn}`);
      const token = await this.jwtService.signAsync(payload, {
        secret,
        expiresIn,
      });

      this.logger.debug('Token generated successfully');
      return token;
    } catch (error) {
      this.logger.error('Error generating token', error);
      throw new InternalServerErrorException(
        'Something went wrong! Please try again later or contact support.',
      );
    }
  }
}
