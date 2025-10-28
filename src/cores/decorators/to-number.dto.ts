import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export function ToNumber() {
  const transform = Transform(({ value }: { value: unknown }) => {
    // Handle undefined, null, and empty string
    if (value === undefined || value === null || value === '') return undefined;

    // Convert valid numeric strings to numbers
    if (typeof value === 'string' && !isNaN(Number(value))) {
      return Number(value);
    }

    // Keep numeric values as they are
    if (typeof value === 'number') {
      return value;
    }

    // Return raw value for validator to catch invalid types
    return value;
  });

  return applyDecorators(transform, IsNumber());
}
