import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from '../../../../application/applicatioin.module';
import {
  StsJobStartCommand,
  StsJobSvc,
} from '../../../../application/port/in/sts-job.service.interface';
import { Id } from '../../../../domain/entity/type';
import { UserId } from '../../../common/decorator/user-id.decorator';
import { AccessControl } from '../../../common/guards/access-guard';
import { UserLevel } from '../../../common/guards/type';
import { DbTransactionInterceptor } from '../../../common/interceptors/db-transaction.interceptor';
import { StsJobStartRequestBody } from './dto/sts-job-start.request.body';

@Controller('/api/v1')
@AccessControl(UserLevel.MEMBER)
export class StsJobController {
  constructor(
    @Inject(ApplicationService.StsJobSvc)
    private readonly stsJobService: StsJobSvc,
  ) {}

  @Post('/inference/sts')
  @UseInterceptors(DbTransactionInterceptor)
  async start(@UserId() userId: Id, @Body() body: StsJobStartRequestBody) {
    const { soundFileId, voiceId, pitch, soundQuality } = body;
    const command = new StsJobStartCommand(
      userId,
      soundFileId,
      voiceId,
      pitch,
      soundQuality,
    );
    return await this.stsJobService.start(command);
  }
}
