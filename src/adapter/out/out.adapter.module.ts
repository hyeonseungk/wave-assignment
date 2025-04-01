import { Module } from '@nestjs/common';
import { ConfigModule } from '../../common/config/config.module';
import { RequestContextModule } from '../common/context/request-context.module';
import { LoggerModule } from '../common/logger/logger.module';
import { RetryableHttpClient } from './common/http-client/retryable-http-client';
import { PreviewLinkGeneratorAwsS3 } from './etc/preview-link-generator/preview-link-generator.aws-s3';
import { StsJobProcessorAi } from './etc/sts-job-processor/sts-job-processor.ai';
import { PrismaModule } from './repository/prisma/prisma.module';
import { SoundFileMapper } from './repository/sound-file.repository/sound-file.mapper';
import { SoundFileRepositoryMysql } from './repository/sound-file.repository/sound-file.repository.mysql';
import { StsJobMapper } from './repository/sts-job.repository /sts-job.mapper';
import { StsJobRepositoryMysql } from './repository/sts-job.repository /sts-job.repository.mysql';
import { UserMapper } from './repository/user.repository /user.mapper';
import { UserRepositoryMysql } from './repository/user.repository /user.repository.mysql';
import { VoiceMapper } from './repository/voice.repository /voice.mapper';
import { VoiceRepositoryMysql } from './repository/voice.repository /voice.repository.mysql';

export enum OutAdapter {
  UserRepository = 'UserRepository',
  SoundFileRepository = 'SoundFileRepository',
  VoiceRepository = 'VoiceRepository',
  StsJobRepository = 'StsJobRepository',
  PreviewLinkGenerator = 'PreviewLinkGenerator',
  StsJobProcessor = 'StsJobProcessor',
}

@Module({
  imports: [ConfigModule, PrismaModule, RequestContextModule, LoggerModule],
  providers: [
    RetryableHttpClient,
    {
      provide: OutAdapter.UserRepository,
      useClass: UserRepositoryMysql,
    },
    UserMapper,
    {
      provide: OutAdapter.SoundFileRepository,
      useClass: SoundFileRepositoryMysql,
    },
    SoundFileMapper,
    {
      provide: OutAdapter.VoiceRepository,
      useClass: VoiceRepositoryMysql,
    },
    VoiceMapper,
    {
      provide: OutAdapter.StsJobRepository,
      useClass: StsJobRepositoryMysql,
    },
    StsJobMapper,
    {
      provide: OutAdapter.PreviewLinkGenerator,
      useClass: PreviewLinkGeneratorAwsS3,
    },
    {
      provide: OutAdapter.StsJobProcessor,
      useClass: StsJobProcessorAi,
    },
  ],
  exports: Object.values(OutAdapter).filter(
    (value) => typeof value === 'string',
  ),
})
export class OutAdpaterModule {}
