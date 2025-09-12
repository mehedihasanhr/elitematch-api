import {
  Controller,
  Get,
  Req,
  UseGuards,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request, Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  LoginResponseDto,
  RegisterResponseDto,
  ForgotPasswordResponseDto,
  ResetPasswordResponseDto,
  CurrentUserResponseDto,
  ChangePasswordResponseDto,
} from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current user information',
    description:
      'Retrieve the profile information of the currently authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Current user information retrieved successfully',
    type: CurrentUserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getCurrentUser(@Req() req: Request) {
    const user = req?.user as { userId: number };
    return await this.authService.getCurrentUser(user.userId);
  }

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticate user with email and password to receive access tokens',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials - Wrong email or password',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation failed - Invalid input data',
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.authService.login(loginDto);

    if (!response) {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: 'error',
        statusCode: 401,
      });
    }

    const { refreshToken, ...rest } = response;

    // set cookies for refresh and access tokens
    res?.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json(rest);
  }

  @Post('register')
  @ApiOperation({
    summary: 'User registration',
    description: 'Create a new user account with email and password',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Email already exists',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation failed - Invalid input data',
  })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Request password reset',
    description: 'Send a password reset token to the user email address',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent successfully',
    type: ForgotPasswordResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the provided email',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation failed - Invalid email format',
  })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset user password using the token received via email',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    type: ResetPasswordResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired reset token',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation failed - Invalid input data',
  })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Change password for authenticated user',
    description:
      'Change the password for the currently authenticated user by providing current password',
  })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    type: ChangePasswordResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request - Current password incorrect or new passwords do not match',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 422,
    description: 'Validation failed - Invalid input data',
  })
  async changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const user = req?.user as { userId: number };
    return await this.authService.changePassword(
      user.userId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
      changePasswordDto.confirmNewPassword,
    );
  }
}
