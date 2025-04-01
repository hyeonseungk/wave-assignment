export interface CustomLogger {
  error: (msg: string, context?: Record<string, any>) => void;
  warn: (msg: string, context?: Record<string, any>) => void;
  info: (msg: string, context?: Record<string, any>) => void;
  debug: (msg: string, context?: Record<string, any>) => void;
  log: (msg: string, context?: Record<string, any>) => void;
}
