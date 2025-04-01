// transaction.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { firstValueFrom, from, Observable } from 'rxjs';
import { PrismaService } from '../../out/repository/prisma/prisma.service';
import { RequestContextService } from '../context/request-context.service';
import { CustomLogger } from '../logger/custom-logger';
import { Logger } from '../logger/logger.module';

@Injectable()
export class DbTransactionInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContextService: RequestContextService,
    @Inject(Logger)
    private readonly logger: CustomLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = this.requestContextService.getRequestId();

    return from(
      this.prisma.$transaction(
        async (tx) => {
          try {
            this.requestContextService.setDbTx(tx);
            // 핸들러 실행 및 결과 반환
            const result = await firstValueFrom(next.handle());
            this.logger.info(`[${requestId}] Transaction Succeeded!!!`);
            return result;
          } catch (error) {
            this.logger.error(
              `[${requestId}] Transaction failed: ${error.message}`,
              error.stack,
            );
            throw error;
          }
        },
        {
          maxWait: 5000,
          timeout: 5000,
          isolationLevel: 'RepeatableRead',
        },
      ),
    );
  }
}

// return next.handle().subscribe({
//   next: (data) => {
//     this.logger.info(`[${requestId}] Transaction Succeeded!!!`);
//     subscriber.next(data);
//     subscriber.complete();
//   },
//   error: (error) => {
//     this.logger.error(
//       `[${requestId}] Transaction failed: ${error.message}`,
//       error.stack,
//     );
//     subscriber.error(error);
//   },
// });
