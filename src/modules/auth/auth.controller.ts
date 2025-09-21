import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/password-update.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    private config: ConfigService,
  ) {}

  /**
   * Get current user info
   * @param userId - Extracted from JWT token
   */

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@Auth('id') userId: number) {
    return this.service.getUser(userId);
  }

  /**
   * Register a new user
   * @param data - RegisterDto
   */
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.service.register(data);
  }

  /**
   * Login user and return JWT token
   * @param data - LoginDto
   */
  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const result = await this.service.login(data);
    if (!result?.refreshToken) {
      throw new BadRequestException('Login failed, no refresh token provided');
    }
    const { refreshToken, ...rest } = result;
    this.setRefreshCookie(res, refreshToken);
    return res.json(rest);
  }

  /**
   * Forgot Password - send reset link to email
   * @param data - ForgotPasswordDto
   */
  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.service.forgotPassword(data);
  }

  /**
   * Reset Password using token from email
   * @param data - ResetPasswordDto
   */
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.service.resetPassword(data);
  }

  /**
   * Update Password for logged-in user
   * @param data - UpdatePasswordDto
   */
  @UseGuards(JwtAuthGuard)
  @Patch('/update-password')
  async updatePassword(
    @Body() data: UpdatePasswordDto,
    @Auth('id') userId: number,
  ) {
    return this.service.updatePassword(data, userId);
  }

  /**
   * Logout user by clearing refresh token cookie
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.clearRefreshCookie(res);
    return {
      message: 'Logged out successfully',
    };
  }

  /**
   * Refresh access token using refresh token from cookie or body.
   * Side effects: Rotates HttpOnly refresh-token cookie when refreshed.
   */
  @Post('refresh')
  async refresh(
    @Req() req: { cookies?: Record<string, string> },
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookieName =
      this.config.get<string>('REFRESH_TOKEN_KEY') ?? 'refreshToken';
    const oldRefreshToken = req?.cookies ? req.cookies[cookieName] : undefined;

    console.log('Old Refresh Token:', oldRefreshToken);

    if (!oldRefreshToken) {
      throw new BadRequestException('Invalid Session, please log in again');
    }

    const r = await this.service.refreshAccessToken(oldRefreshToken);

    const { refreshToken, ...restResponse } = r;

    if (refreshToken) this.setRefreshCookie(res, refreshToken);

    return restResponse;
  }

  /*=================================*/
  /*============ Utils ===============*/
  /*=================================*/

  private setRefreshCookie(res: Response, token: string) {
    const secure = this.config.get<string>('NODE_ENV') === 'production';
    const sameSiteEnv = this.config.get<string>('COOKIE_SAME_SITE') ?? 'Lax';
    const sameSite = ['Lax', 'Strict', 'None'].includes(sameSiteEnv)
      ? sameSiteEnv
      : 'Lax';
    const ttl = this.config.get<string>('JWT_REFRESH_TTL') ?? '30d';
    const refreshTokenKey =
      this.config.get<string>('REFRESH_TOKEN_KEY') ?? 'refreshToken';

    const seconds = this.parseTtlToSeconds(ttl);

    const parts = [
      `${refreshTokenKey}=${token}`,
      'HttpOnly',
      'Path=/',
      `SameSite=${sameSite}`,
      `Max-Age=${seconds}`,
    ];
    if (secure || sameSite === 'None') parts.push('Secure');
    res.setHeader('Set-Cookie', parts.join('; '));
  }

  /**
   * Clear the refresh token cookie by setting Max-Age=0 with same attributes.
   */
  private clearRefreshCookie(res: Response) {
    const secure = this.config.get<string>('NODE_ENV') === 'production';
    const sameSiteEnv = process.env.COOKIE_SAMESITE || 'Lax';
    const sameSite = ['Lax', 'Strict', 'None'].includes(sameSiteEnv)
      ? sameSiteEnv
      : 'Lax';
    const refreshTokenKey =
      this.config.get<string>('REFRESH_TOKEN_KEY') ?? 'refreshToken';
    const parts = [
      `${refreshTokenKey}=`,
      'HttpOnly',
      'Path=/',
      `SameSite=${sameSite}`,
      'Max-Age=0',
    ];
    if (secure || sameSite === 'None') parts.push('Secure');
    res.setHeader('Set-Cookie', parts.join('; '));
  }

  /**
   * Parse TTL strings like "15m", "30d", "3600" into seconds.
   * Fallback: 30 days when parsing fails.
   */
  private parseTtlToSeconds(ttl: string): number {
    const m = /^([0-9]+)([smhd])?$/.exec(ttl.trim());
    if (!m) return 30 * 24 * 60 * 60;
    const n = parseInt(m[1], 10);
    const unit = m[2] || 's';
    switch (unit) {
      case 'd':
        return n * 24 * 60 * 60;
      case 'h':
        return n * 60 * 60;
      case 'm':
        return n * 60;
      default:
        return n;
    }
  }
}
