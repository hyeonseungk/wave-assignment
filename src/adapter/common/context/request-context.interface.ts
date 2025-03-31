export interface RequestContext {
  requestId: string;
  timestamp: number;
  userId?: string;
  ip?: string;
  userAgent?: string;
}
