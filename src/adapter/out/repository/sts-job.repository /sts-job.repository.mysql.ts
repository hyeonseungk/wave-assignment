import { Injectable } from '@nestjs/common';
import { StsJobRepository } from '../../../../application/port/out/repository/sts-job.repository.interface';
import {
  StsJob,
  StsJobCreateInput,
} from '../../../../domain/entity/sts-job.entity';
import { Id } from '../../../../domain/entity/type';
import { RequestContextService } from '../../../common/context/request-context.service';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryMySql } from '../prisma/repository.mysql';
import { StsJobMapper } from './sts-job.mapper';

@Injectable()
export class StsJobRepositoryMysql
  extends RepositoryMySql
  implements StsJobRepository
{
  constructor(
    prisma: PrismaService,
    requestContextService: RequestContextService,
    private readonly mapper: StsJobMapper,
  ) {
    super(prisma, requestContextService);
  }

  async createOne(input: StsJobCreateInput): Promise<StsJob> {
    const {
      userId,
      soundFileId,
      voiceId,
      pitch,
      soundQuality,
      status,
      resultFilePath,
      resultFileSize,
      resultFileDuration,
      resultFilePreviewLink,
    } = input;
    const newOne = await this.db().stsJob.create({
      data: {
        userId,
        soundFileId,
        voiceId,
        pitch,
        soundQuality,
        status,
        resultFilePath,
        resultFileSize,
        resultFileDuration,
        resultFilePreviewLink,
      },
    });
    return this.mapper.mapRawToEntity(newOne);
  }

  async findOneById(id: Id): Promise<StsJob | null> {
    const stsJob = await this.db().stsJob.findUnique({
      where: { id },
    });
    return stsJob ? this.mapper.mapRawToEntity(stsJob) : null;
  }
}
