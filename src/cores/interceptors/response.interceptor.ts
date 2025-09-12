import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs/operators';

interface StandardResponse<T = unknown> {
  data: T;
  message: string;
  status: string;
  statusCode?: number;
}

const SKIP_TRANSFORM_TYPES = [
  'application/pdf',
  'application/octet-stream',
  'application/zip',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/',
  'audio/',
  'video/',
];

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  // transform the response body to a consistent format
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const response = ctx.switchToHttp().getResponse<Response>();
    const contentType = response.getHeader('Conetnt-Type');

    // if the response is a streaming file (e.g., PDF), skip further processing
    if (typeof contentType === 'string') {
      const shouldSkip = SKIP_TRANSFORM_TYPES.some((type) =>
        contentType.startsWith(type),
      );

      if (shouldSkip) {
        return next.handle();
      }
    }

    // transform the response body
    return next.handle().pipe(
      map((response: any): StandardResponse | StreamableFile => {
        if (response instanceof StreamableFile) {
          return response; // Return the StreamableFile as is
        }

        // if the response is an object with 'data' and 'message' properties,
        if (
          response &&
          typeof response === 'object' &&
          'data' in response &&
          'message' in response
        ) {
          const standardResponse = response as StandardResponse;

          return {
            data: standardResponse.data,
            message: standardResponse.message,
            status:
              'success' in standardResponse
                ? standardResponse.status
                : 'success',
            statusCode: standardResponse.statusCode ?? 200,
          };
        }

        // return a standard response format
        return {
          data: response,
          message: 'Request successful',
          status: 'success',
          statusCode: 200,
        };
      }),
    );
  }
}
