import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchMakerDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: 'Experience year is required' })
  experienceYear: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'Active status is required' })
  active?: true;
}
