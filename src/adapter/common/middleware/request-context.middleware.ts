import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestContext } from '../context/request-context.interface';
import { RequestContextService } from '../context/request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const context: RequestContext = {
      requestId: uuidv4(),
      timestamp: Date.now(),
      ip: req.ip,
      userAgent: req.get('user-agent'),
    };

    await this.contextService.runWithContext(context, async () => {
      next();
    });
  }
}
