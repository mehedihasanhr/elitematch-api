import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // get transactions (with pagination)
  @Get()
  @ApiOperation({ summary: 'Get transactions with optional pagination' })
  async getTransactions(@Query() query: TransactionQueryDto) {
    return this.transactionService.findAll(query);
  }
}
