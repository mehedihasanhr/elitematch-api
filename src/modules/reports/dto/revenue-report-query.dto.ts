import { IsDateString, IsString } from 'class-validator';

export class RevenueReportQueryDto {
  @IsString()
  @IsDateString()
  from: string;

  @IsString()
  @IsDateString()
  to: string;
}
