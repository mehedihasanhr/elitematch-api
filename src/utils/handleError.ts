import { HttpException, InternalServerErrorException } from '@nestjs/common';

export const handleErrors = (error: unknown) => {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error instanceof Error) {
    throw new HttpException(error.message, 500);
  }

  throw new InternalServerErrorException('An unexpected error occurred');
};
