import { Injectable } from '@nestjs/common';
import { StsJobRepository } from '../../../../application/port/out/repository/sts-job.repository.interface';
import {
  StsJob,
  StsJobCreateInput,
} from '../../../../domain/entity/sts-job.entity';
import { Id } from '../../../../domain/entity/type';
import { PrismaService } from '../prisma/prisma.service';
import { StsJobMapper } from './sts-job.mapper';

@Injectable()
export class StsJobRepositoryMysql implements StsJobRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: StsJobMapper,
  ) {}

  async createOne(input: StsJobCreateInput): Promise<StsJob> {
    const {
      userId,
      soundFileId,
      voiceId,
      pitch,
      status,
      resultFilePath,
      resultFileSize,
      resultFileDuration,
      resultFilePreviewLink,
    } = input;
    const newOne = await this.prisma.stsJob.create({
      data: {
        userId,
        soundFileId,
        voiceId,
        pitch,
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
    const stsJob = await this.prisma.stsJob.findUnique({
      where: { id },
    });
    return stsJob ? this.mapper.mapRawToEntity(stsJob) : null;
  }
}
