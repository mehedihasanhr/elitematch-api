import { ApiProperty } from '@nestjs/swagger';
import { PermissionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'Permission name is required' })
  name: string;

  @ApiProperty({
    description: 'Type of permission',
    required: true,
    enum: Object.values(PermissionType),
    enumName: 'permission',
  })
  @IsEnum(PermissionType)
  @IsNotEmpty({ message: 'Permission description is required' })
  permission: PermissionType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'Module name is required' })
  model: string;
}
