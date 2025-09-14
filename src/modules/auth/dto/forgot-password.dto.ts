import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsUrl(
    {
      require_tld: false,
      require_protocol: false,
    },
    { message: 'Invalid URL format' },
  )
  @IsNotEmpty({ message: 'Password reset URL is required' })
  resetUrl: string;
}
