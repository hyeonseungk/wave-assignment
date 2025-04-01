import { Prisma, PrismaClient } from '@prisma/client';
import { RequestContextService } from '../../../common/context/request-context.service';
import { PrismaService } from './prisma.service';

export class RepositoryMySql {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContextService: RequestContextService,
  ) {}

  db(): PrismaClient | Prisma.TransactionClient {
    const context = this.requestContextService.getContext();
    if (context?.tx) {
      return context.tx;
    }
    return this.prisma;
  }
}
