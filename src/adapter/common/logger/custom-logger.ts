export interface CustomLogger {
  error: (error: Error, msg: string, context?: Record<string, any>) => void;
  warn: (msg: string, context?: Record<string, any>) => void;
  info: (msg: string, context?: Record<string, any>) => void;
  debug: (msg: string, context?: Record<string, any>) => void;
}
