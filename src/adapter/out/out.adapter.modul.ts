import { Module } from '@nestjs/common';
import { ConfigModule } from '../../common/config/config.module';

export enum OutAdapter {}

@Module({
  imports: [ConfigModule],
  providers: [],
  exports: [],
})
export class OutAdpaterModule {}
