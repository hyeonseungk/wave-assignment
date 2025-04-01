import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { RequestContext } from '../context/request-context.interface';
import { RequestContextService } from '../context/request-context.service';
import { CustomLogger } from '../logger/custom-logger';
import { Logger } from '../logger/logger.module';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  constructor(
    private readonly requestContextService: RequestContextService,
    @Inject(Logger)
    private readonly logger: CustomLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = this.requestContextService.getRequestId();

    // 요청 시작 로깅
    this.logger.log(
      `[${requestId}] Request started: ${request.method} ${request.url}`,
    );

    const now = Date.now();

    const requestContext: RequestContext = {
      requestId: uuidv4(),
      timestamp: Date.now(),
      ip: request.ip,
      userAgent: request.get('user-agent'),
    };

    return new Observable((subscriber) => {
      const subscription = this.requestContextService.runWithContext(
        requestContext,
        () => {
          return next
            .handle()
            .pipe(
              map((data) => {
                this.logger.log(
                  `[${requestId}] Request completed in ${Date.now() - now}ms`,
                );
                return new ResponseWrapper(data || {});
              }),
              catchError((error) => {
                this.logger.error(
                  `[${requestId}] Request failed: ${error.message}`,
                  error.stack,
                );
                throw error;
              }),
            )
            .subscribe(subscriber);
        },
      );
      return () => subscription.unsubscribe();
    });
  }
}

class ResponseWrapper<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
