import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ToNumber } from 'src/cores/decorators/to-number.dto';

export class MailConfigCreateDto {
  @ApiProperty({ example: 'smtp.example.com', description: 'Mail server host' })
  @IsString()
  @IsNotEmpty({ message: 'Host is required' })
  host: string;

  @ApiProperty({ example: 587, description: 'Mail server port' })
  @IsNotEmpty({ message: 'Port is required' })
  @ToNumber()
  @IsNumber()
  port: number;

  @ApiProperty({
    example: 'support@example.com',
    description: 'Mail server user',
  })
  @IsString()
  @IsNotEmpty({ message: 'User is required' })
  user: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'Mail server password',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
