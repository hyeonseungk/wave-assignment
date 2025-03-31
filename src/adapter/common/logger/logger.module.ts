import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestContextModule } from '../context/request-context.module';
import { CustomLoggerConsole } from './custom-logger.console';

export const Logger = Symbol('Logger');

@Module({
  imports: [ConfigModule, RequestContextModule],
  providers: [
    {
      provide: Logger,
      useClass: CustomLoggerConsole,
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
