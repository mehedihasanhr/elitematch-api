import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RevenueReportQueryDto } from './dto/revenue-report-query.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /**
   * Get various statistics for admin dashboard
   */
  @Get('statistics')
  @ApiOperation({
    summary: 'Get various statistics for admin dashboard',
  })
  async getStatistics() {
    return this.reportsService.getStatistics();
  }

  /**
   * * Get revenue and subscribers report
   * @QueryParams from: string (YYYY-MM-DD)
   * @QueryParams to: string (YYYY-MM-DD)
   */

  @Get('revenue-subscribers')
  @ApiOperation({
    summary: 'Get revenue and subscribers report',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: 'End date in YYYY-MM-DD format',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'Start date in YYYY-MM-DD format',
  })
  async getRevenueAndSubscribersReport(@Query() query: RevenueReportQueryDto) {
    return this.reportsService.getRevenueAndSubscribersReport(query);
  }
}
