import { Module } from '@nestjs/common';
import { RequestContextModule } from '../adapter/common/context/request-context.module';
import { SoundFileServiceImpl } from './service/sound-file.service';

export const SoundFileSvc = Symbol('SoundFileSvc');

@Module({
  imports: [RequestContextModule],
  providers: [
    {
      provide: SoundFileSvc,
      useClass: SoundFileServiceImpl,
    },
  ],
  exports: [SoundFileSvc],
})
export class ApplicationModule {}
