import { Prisma } from '@prisma/client';

export interface RequestContext {
  requestId: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
  tx?: Prisma.TransactionClient;
}
