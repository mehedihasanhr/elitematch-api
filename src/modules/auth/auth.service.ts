import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/cores/modules/prisma/prisma.service';
import { TokenService } from 'src/cores/modules/token/token.service';
import { handleErrors } from 'src/utils/handleError';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate Access Token
   * @param payload - token payload containing userId
   */
  private async generateAccessToken(payload: {
    userId: number;
  }): Promise<string> {
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    this.logger.debug(`JWT_ACCESS_SECRET available: ${!!secret}`);

    const accessToken = await this.tokenService.generateToken(
      payload,
      secret as string,
      '15m',
    );

    return accessToken;
  }

  /**
   * Generate Refresh Token
   * @param {userId} payload - The user ID
   */
  private async generateRefreshToken(payload: {
    userId: number;
  }): Promise<string> {
    const secret = this.configService.get<string>('JWT_REFRESH_TOKEN');
    this.logger.debug(`JWT_REFRESH_TOKEN available: ${!!secret}`);

    const refreshToken = await this.tokenService.generateToken(
      payload,
      secret as string,
      '1h',
    );
    return refreshToken;
  }

  /**
   * Get current user
   * @param  {number | undefined} userId - The user ID
   */
  async getCurrentUser(userId: number | undefined) {
    try {
      if (!userId) {
        throw new NotFoundException('User ID is required');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        omit: {
          password: true,
          resetToken: true,
          resetTokenExpiry: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      this.logger.error('Error fetching current user', error);
      handleErrors(error);
    }
  }

  /**
   * User login service
   * @param {loginDto} loginDto - The login data
   */
  async login({ email, password }: LoginDto) {
    try {
      // fetch existing user by email
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('No user found with this email');
      }

      const { password: userPassword, ...userData } = user;

      // compare password
      const isPasswordValid = await bcrypt.compare(
        password,
        userPassword ?? '',
      );

      // if password is invalid, throw bad request error
      if (!isPasswordValid) {
        throw new BadGatewayException('Invalid email or password');
      }

      // generate refresh and access tokens
      const accessToken = await this.generateAccessToken({
        userId: userData.id,
      });

      const refreshToken = await this.generateRefreshToken({
        userId: userData.id,
      });

      return {
        data: { user: userData, accessToken },
        refreshToken,
        message: 'User logged in successfully',
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      this.logger.error('Error during user login', error);
      handleErrors(error);
    }
  }

  /**
   * User registration
   * @param {RegisterDto} registerDto - The registration data
   */
  async register({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  }: RegisterDto) {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // throw bad request error if email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadGatewayException('A user with this email already exists');
      }

      // generate password hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // save user to database
      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          password: hashedPassword,
          email,
        },
      });

      if (!user) {
        throw new InternalServerErrorException('User registration failed');
      }

      return {
        data: user,
        message: 'User registered successfully',
        status: 'success',
        statusCode: 201,
      };
    } catch (error) {
      this.logger.error('Error during user registration', error);
      handleErrors(error);
    }
  }

  /**
   * Initiates password reset by generating a token and sending email
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    // Generate a reset token
    const resetToken =
      (Math.random() + 1).toString(36).substring(2) + Date.now();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry
    // Save token to user
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: expires,
      },
    });
    // TODO: Send email to user with resetToken (implement email service)
    return { message: 'Password reset link sent to your email.' };
  }

  /**
   * Resets password using token
   */
  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });
    if (!user) {
      throw new Error('Invalid or expired token');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    return { message: 'Password has been reset successfully.' };
  }

  /**
   * Change password for authenticated user
   * @param userId - ID of the authenticated user
   * @param currentPassword - Current password for verification
   * @param newPassword - New password to set
   * @param confirmNewPassword - Confirmation of new password
   */
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ): Promise<{ message: string }> {
    try {
      // Validate that new passwords match
      if (newPassword !== confirmNewPassword) {
        throw new BadGatewayException('New passwords do not match');
      }

      // Fetch user with password for verification
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password ?? '',
      );

      if (!isCurrentPasswordValid) {
        throw new BadGatewayException('Current password is incorrect');
      }

      // Ensure new password is different from current password
      const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password ?? '',
      );
      if (isSamePassword) {
        throw new BadGatewayException(
          'New password must be different from current password',
        );
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      // Update password in database
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedNewPassword,
        },
      });

      this.logger.log(`Password changed successfully for user ID: ${userId}`);
      return { message: 'Password changed successfully' };
    } catch (error) {
      this.logger.error('Error changing password', error);
      handleErrors(error);
      throw error; // This ensures the function always returns or throws
    }
  }
}
