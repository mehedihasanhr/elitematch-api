import { IsNotEmpty, IsString } from 'class-validator';

export class UserSubscriptionQueryDto {
  @IsString()
  @IsNotEmpty({
    message: 'User ID is required',
  })
  userId: string;
}
