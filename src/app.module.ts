import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RequestContextModule } from './adapter/common/context/request-context.module';
import { RequestContextService } from './adapter/common/context/request-context.service';
import { GlobalExceptionFilter } from './adapter/common/filters/global-exception-filter';
import { AccessGuard } from './adapter/common/guards/access-guard';
import { RequestContextInterceptor } from './adapter/common/interceptors/request-context.interceptor';
import { LoggerModule } from './adapter/common/logger/logger.module';
import { RequestContextMiddleware } from './adapter/common/middleware/request-context.middleware';
import { GlobalValidationPipe } from './adapter/common/pipe/global-validation-pipe';
import { LoginController } from './adapter/in/controllers/login/login.controller';
import { SoundFileController } from './adapter/in/controllers/sound-file/sound-file.controller';
import { ApplicationModule } from './application/applicatioin.module';
import { ConfigModule } from './common/config/config.module';
@Module({
  imports: [
    ConfigModule,
    RequestContextModule,
    LoggerModule,
    ApplicationModule,
  ],
  controllers: [SoundFileController, LoginController],
  providers: [
    RequestContextService,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
