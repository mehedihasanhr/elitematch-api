import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    example: {
      id: 1,
      email: 'user@example.com',
      createdAt: '2025-08-09T00:00:00.000Z',
      updatedAt: '2025-08-09T00:00:00.000Z',
    },
  })
  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'User registered successfully',
  })
  message: string;

  @ApiProperty({
    description: 'User information',
    example: {
      id: 1,
      email: 'user@example.com',
      createdAt: '2025-08-09T00:00:00.000Z',
      updatedAt: '2025-08-09T00:00:00.000Z',
    },
  })
  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Password reset email sent successfully',
  })
  message: string;
}

export class ResetPasswordResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Password reset successfully',
  })
  message: string;
}

export class CurrentUserResponseDto {
  @ApiProperty({
    description: 'User information',
    example: {
      id: 1,
      email: 'user@example.com',
      createdAt: '2025-08-09T00:00:00.000Z',
      updatedAt: '2025-08-09T00:00:00.000Z',
    },
  })
  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export class ChangePasswordResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Password changed successfully',
  })
  message: string;
}
