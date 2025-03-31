import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './request-context.interface';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  getContext(): RequestContext | undefined {
    return this.storage.getStore();
  }

  getRequestId(): string | undefined {
    return this.getContext()?.requestId;
  }

  getTimestamp(): number | undefined {
    return this.getContext()?.timestamp;
  }

  getUserId(): string | undefined {
    return this.getContext()?.userId;
  }

  setUserId(userId: string) {
    const context = this.getContext();
    if (!context) {
      throw new Error('No request context available');
    }
    context.userId = userId;
  }

  runWithContext<T>(
    context: Partial<RequestContext>,
    fn: () => Promise<T>,
  ): Promise<T> {
    const fullContext: RequestContext = {
      requestId: context.requestId,
      timestamp: context.timestamp,
      userId: context.userId,
      ip: context.ip,
      userAgent: context.userAgent,
    };

    return this.storage.run(fullContext, fn);
  }

  // 헬퍼 메서드: 현재 컨텍스트에서 함수 실행
  async runInContext<T>(fn: () => Promise<T>): Promise<T> {
    const context = this.getContext();
    if (!context) {
      throw new Error('No request context available');
    }
    return fn();
  }
}
