import { ConfigManager } from '../../../common/config/config-manager';
import { RequestContextService } from '../context/request-context.service';
import { CustomLogger } from './custom-logger';

export class CustomLoggerConsole implements CustomLogger {
  constructor(
    private readonly configManager: ConfigManager,
    private readonly requestContextService: RequestContextService,
  ) {}

  error(error: Error, msg: string, context?: Record<string, any>): void {}

  warn(msg: string, context?: Record<string, any>): void {}

  info(msg: string, context?: Record<string, any>): void {}

  debug(msg: string, context?: Record<string, any>): void {}
}
