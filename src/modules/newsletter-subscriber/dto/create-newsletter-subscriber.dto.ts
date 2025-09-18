import { IsEmail } from 'class-validator';

export class CreateNewsletterSubscriberDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}
