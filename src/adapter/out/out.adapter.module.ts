import { Module } from '@nestjs/common';
import { ConfigModule } from '../../common/config/config.module';
import { PrismaModule } from './repository/prisma/prisma.module';
import { SoundFileMapper } from './repository/sound-file.repository/sound-file.mapper';
import { SoundFileRepositoryMysql } from './repository/sound-file.repository/sound-file.repository.mysql';

export enum OutAdapter {
  SoundFileRepository = 'SoundFileRepository',
}

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [
    {
      provide: OutAdapter.SoundFileRepository,
      useClass: SoundFileRepositoryMysql,
    },
    SoundFileMapper,
  ],
  exports: [],
})
export class OutAdpaterModule {}
