import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'Role name is required' })
  @MaxLength(50, { message: 'Role name must be at most 50 characters long' })
  name: string;

  @IsOptional()
  @Transform(({ value }: { value: any }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v as string, 10));
    }
    if (value !== undefined && value !== null && value !== '') {
      return [parseInt(value as string, 10)];
    }
    // If nothing passed
    return [];
  })
  @IsArray()
  @IsNumber({}, { each: true })
  rolePermissionIds?: number[];
}
