import { Module } from '@nestjs/common';
import { RequestContextModule } from '../adapter/common/context/request-context.module';
import { OutAdpaterModule } from '../adapter/out/out.adapter.module';
import { ConfigModule } from '../common/config/config.module';
import { LoginService } from './service/login.service';
import { SoundFileService } from './service/sound-file.service';
import { StsJobService } from './service/sts-job.service';

export enum ApplicationService {
  SoundFileSvc = 'SoundFileSvc',
  LoginSvc = 'LoginSvc',
  StsJobSvc = 'StsJobSvc',
}

@Module({
  imports: [ConfigModule, RequestContextModule, OutAdpaterModule],
  providers: [
    {
      provide: ApplicationService.SoundFileSvc,
      useClass: SoundFileService,
    },
    {
      provide: ApplicationService.LoginSvc,
      useClass: LoginService,
    },
    {
      provide: ApplicationService.StsJobSvc,
      useClass: StsJobService,
    },
  ],
  exports: Object.values(ApplicationService).filter(
    (value) => typeof value === 'string',
  ),
})
export class ApplicationModule {}
