import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { MailService } from 'src/cores/modules/mail/mail.service';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/password-update.dto';

@Injectable()
export class AuthService {
  private saltRounds = 10;
  private refreshSecret: string;
  private refreshExpiresIn: string;
  private accessSecret: string;
  private accessExpiresIn: string;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
    private mail: MailService,
  ) {
    const rounds = Number(this.config.get<string>('PASSWORD_HASH_ROUND'));
    this.saltRounds = Number.isFinite(rounds) ? rounds : 10;
    this.refreshSecret = config.get<string>('JWT_REFRESH_SECRET') || '';
    this.refreshExpiresIn = config.get<string>('JWT_REFRESH_TTL') || '30d';
    this.accessSecret = config.get<string>('JWT_ACCESS_SECRET') || '';
    this.accessExpiresIn = config.get<string>('JWT_ACCESS_TTL') || '15m';
  }

  /**
   * Get user
   * @param userId - User ID
   */
  async getUser(userId: number) {
    const user = await this.userMap(userId);
    return {
      data: user,
      message: 'User fetched successfully',
      status: 'success',
      statusCode: 200,
    };
  }

  /**
   * Register a new user (for demonstration; not used in JWT strategy)
   * @param data - RegisterDto
   */
  async register(data: RegisterDto) {
    const { password, confirmPassword, email } = data;

    // check password match
    if (password !== confirmPassword) {
      throw new BadRequestException({
        message: 'Password and Confirm Password do not match',
      });
    }

    // check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({ message: 'Email already in use' });
    }

    // hash password
    const hashedPassword = await this.hashPassword(password);

    // store user
    const user = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
      select: { id: true },
    });

    return {
      data: await this.userMap(user.id),
      message: 'User registered successfully',
      status: 201,
    };
  }

  /**
   * Login a user and generate JWT tokens
   * @param data - LoginDto
   */
  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true, email: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid Credentials',
      });
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException({
        message: 'Invalid Credentials',
      });

    // create tokens
    const { accessToken, refreshToken } = this.generateToken(user as User);

    return {
      data: await this.userMap(user.id),
      accessToken,
      refreshToken,
      message: 'Login successful',
      statusCode: 200,
    };
  }

  /**
   * Forgot Password - send reset link to email
   * @param data - ForgotPasswordDto
   */
  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException({
        message:
          'If that email is registered, you will receive a password reset link',
      });
    }

    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });

    /**
     * Send password reset email
     */
    this.mail.sendMailBackground(
      'mehedihasan.hr.324@gmail.com',
      'Password Reset Request',
      'reset-password-link',
      {
        name: user.firstName + ' ' + user.lastName,
        resetLink: `${data.resetUrl}?token=${token}&email=${user.email}`,
        year: new Date().getFullYear(),
        company: this.config.get<string>('APP_NAME') || 'Our Team',
      },
    );

    return { message: 'If that email exists, a reset link was sent' };
  }

  /**
   * Reset Password using token
   * @param token - Reset token
   */

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException('Passwords do not match');
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: dto.token,
        resetTokenExpiry: { gt: new Date() },
      },
    });
    if (!user) throw new ForbiddenException('Invalid or expired token');

    const password = await this.hashPassword(dto.password);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password, resetToken: null, resetTokenExpiry: null },
    });
    return { message: 'Password has been reset' };
  }

  /**
   * Update password for authenticated user
   * @param dto - UpdatePasswordDto
   * @param userId - ID of the authenticated user
   */
  async updatePassword(dto: UpdatePasswordDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await this.comparePassword(
      dto.currentPassword,
      user.password,
    );

    if (!isPasswordValid)
      throw new BadRequestException('Current password is incorrect');

    const newPassword = await this.hashPassword(dto.password);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    return {
      data: await this.userMap(updatedUser.id),
      message: 'Password updated successfully',
      statusCode: 200,
    };
  }

  /**
   * Validates a user by their ID.
   * @param userId - The ID of the user to validate.
   */
  async validateUser(userId: number) {
    if (!userId)
      throw new UnauthorizedException({
        message: 'Unauthorized Access',
      });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'Unauthorized Access',
      });
    }

    return this.userMap(user.id);
  }

  /**
   * Refresh new access token using refresh token
   * @param refreshToken - Refresh token
   */
  async refreshAccessToken(refreshToken: string) {
    try {
      const secret = this.refreshSecret;

      const payload = this.jwt.verify<{ id: number }>(refreshToken, {
        secret,
      });

      if (!payload.id)
        throw new UnauthorizedException('Session expired, please log in again');

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) throw new ForbiddenException('Access Denied');

      const tokens = this.generateToken(user);

      return {
        data: await this.userMap(user.id),
        ...tokens,
        message: 'Access token refreshed successfully',
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  /*=====================================*/
  /*============= UTILS =============*/
  /*=====================================*/

  /**
   * Hash a password using bcrypt
   */
  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare a plain password with a hashed password
   */
  private async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Token generator
   * @param user - User object
   */
  private generateToken(user: User) {
    const payload = { id: user.id, email: user.email };

    const accessToken = this.jwt.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn,
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  /**
   * User map
   * @param userId - User ID
   */

  private async userMap(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true },
    });
  }
}
