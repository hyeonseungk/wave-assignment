import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestContextService } from '../context/request-context.service';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestContextInterceptor.name);

  constructor(private readonly contextService: RequestContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = this.contextService.getRequestId();

    // 요청 시작 로깅
    this.logger.log(
      `[${requestId}] Request started: ${request.method} ${request.url}`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          // 요청 완료 로깅
          this.logger.log(
            `[${requestId}] Request completed in ${Date.now() - now}ms`,
          );
          return { data: data || {} };
        },
        error: (error) => {
          // 에러 로깅
          this.logger.error(
            `[${requestId}] Request failed: ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }
}
