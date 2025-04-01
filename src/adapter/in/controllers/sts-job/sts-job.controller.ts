import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from '../../../../application/applicatioin.module';
import {
  SoundFileDeleteCommand,
  SoundFileSvc,
} from '../../../../application/port/in/sound-file.service.interface';
import { Id } from '../../../../domain/entity/type';
import { UserId } from '../../../common/decorator/user-id.decorator';
import { AccessControl } from '../../../common/guards/access-guard';
import { UserLevel } from '../../../common/guards/type';
import { DbTransactionInterceptor } from '../../../common/interceptors/db-transaction.interceptor';

@Controller('/api/v1')
@AccessControl(UserLevel.MEMBER)
export class SoundFileController {
  constructor(
    @Inject(ApplicationService.SoundFileSvc)
    private readonly soundFileService: SoundFileSvc,
  ) {}

  @Post('/sts')
  @UseInterceptors(DbTransactionInterceptor)
  async delete(@UserId() userId: Id, @Body() body: StsJobRequestBody) {
    const { fileId } = body;
    const command = new SoundFileDeleteCommand(userId, fileId);
    return await this.soundFileService.delete(command);
  }
}
