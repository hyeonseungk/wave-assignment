import { StsJob } from '../../../../domain/entity/sts-job.entity';
import { StsJobStatus } from '../../../../domain/entity/sts-job.entity/type';
import { Mapper } from '../prisma/mapper.interface';
import { StsJobRaw } from '../prisma/prisma.raw.type';

export class StsJobMapper implements Mapper<StsJobRaw, StsJob> {
  mapRawToEntity(raw: StsJobRaw) {
    const {
      id,
      userId,
      soundFileId,
      voiceId,
      pitch,
      status,
      createdAt,
      resultFilePath,
      resultFileSize,
      resultFileDuration,
      resultFilePreviewLink,
    } = raw;
    return new StsJob(
      id,
      userId,
      soundFileId,
      voiceId,
      pitch,
      status as StsJobStatus,
      createdAt,
      resultFilePath,
      resultFileSize,
      resultFileDuration,
      resultFilePreviewLink,
    );
  }
}
