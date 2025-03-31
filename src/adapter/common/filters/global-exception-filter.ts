import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { CustomLogger } from '../../../application/port/out/custom-logger';
import {
  BadRequestError,
  CustomError,
  ServerError,
} from '../../../common/error/custom-error';

// 여기에서는 절대 에러 발생하면 안 됨
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(e: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest();
    const res = ctx.getResponse();

    if (e instanceof CustomError) {
      return res.status(getStatusCode(e)).json({
        error: {
          name: e.name,
          message: e.message,
        },
      });
    } else if (e instanceof HttpException) {
      // HttpException = NestJS 프레임워크 단에서 발생하는 에러
      return res.status(e.getStatus()).json({
        error: {
          name: `${e.name}(NestJS Exception)`,
          message: e.message,
        },
      });
    } else {
      // 예측하지 못한 에러
      return res.status(500).json({
        error: {
          name: 'UNEXPECTED_ERROR',
          message: e.message,
        },
      });
    }
  }
}

function getStatusCode(e: Error) {
  if (e instanceof BadRequestError) {
    return 400;
  } else if (e instanceof ServerError) {
    return 500;
  }
}
