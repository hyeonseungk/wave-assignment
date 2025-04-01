import { ConfigManager } from '../../../common/config/config-manager';
import { RequestContextService } from '../context/request-context.service';
import { CustomLogger } from './custom-logger';

export class CustomLoggerConsole implements CustomLogger {
  constructor(
    private readonly configManager: ConfigManager,
    private readonly requestContextService: RequestContextService,
  ) {}
  log(msg: string, context?: Record<string, any>): void {
    console.info(msg, context);
  }

  error(msg: string, context?: Record<string, any>): void {
    console.error(msg, context);
  }

  warn(msg: string, context?: Record<string, any>): void {
    console.warn(msg, context);
  }

  info(msg: string, context?: Record<string, any>): void {
    console.info(msg, context);
  }

  debug(msg: string, context?: Record<string, any>): void {
    console.debug(msg, context);
  }
}
