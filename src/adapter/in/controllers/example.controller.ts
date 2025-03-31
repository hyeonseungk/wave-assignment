import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RequestContextService } from '../../common/context/request-context.service';
import { RequestContextInterceptor } from '../../common/interceptors/request-context.interceptor';

@Controller('example')
@UseInterceptors(RequestContextInterceptor)
export class ExampleController {
  constructor(private readonly contextService: RequestContextService) {}

  @Get()
  async getExample() {
    const requestId = this.contextService.getRequestId();
    const timestamp = this.contextService.getTimestamp();

    // 비즈니스 로직 수행
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      message: 'Example response',
      requestId,
      timestamp,
    };
  }
}
