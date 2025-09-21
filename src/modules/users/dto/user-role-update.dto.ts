import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UserRoleUpdateDto {
  @ApiProperty({
    example: 1,
    description: 'Role to be assigned to the user',
    required: true,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  roleId?: number;
}
