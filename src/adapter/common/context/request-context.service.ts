import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './request-context.interface';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();
  public readonly nickname = 'contextService!!!';

  getContext(): RequestContext | undefined {
    return this.storage.getStore();
  }

  getRequestId(): string | undefined {
    return this.getContext()?.requestId;
  }

  getTimestamp(): number | undefined {
    return this.getContext()?.timestamp;
  }

  setDbTx(tx: Prisma.TransactionClient) {
    const context = this.getContext();
    if (!context) {
      throw new Error('No request context available');
    }
    context.tx = tx;
  }

  runWithContext<T>(context: Partial<RequestContext>, fn: () => T): T {
    const fullContext: RequestContext = {
      requestId: context.requestId,
      timestamp: context.timestamp,
      ip: context.ip,
      userAgent: context.userAgent,
    };

    return this.storage.run(fullContext, fn);
  }
}
