import { Injectable } from '@nestjs/common';
import { SoundFileRepository } from '../../../../application/port/out/repository/sound-file.repository.interface';
import {
  SoundFile,
  SoundFileCreateInput,
} from '../../../../domain/entity/sound-file.entity';
import { Id } from '../../../../domain/entity/type';
import { RequestContextService } from '../../../common/context/request-context.service';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryMySql } from '../prisma/repository.mysql';
import { SoundFileMapper } from './sound-file.mapper';

@Injectable()
export class SoundFileRepositoryMysql
  extends RepositoryMySql
  implements SoundFileRepository
{
  constructor(
    prisma: PrismaService,
    requestContextService: RequestContextService,
    private readonly mapper: SoundFileMapper,
  ) {
    super(prisma, requestContextService);
  }

  async createOne(input: SoundFileCreateInput): Promise<SoundFile> {
    const { userId, fileName, fileSize, duration, filePath, previewLink } =
      input;
    const tx = this.db();
    const newOne = await tx.soundFile.create({
      data: {
        userId,
        fileName,
        fileSize,
        duration,
        filePath,
        previewLink,
      },
    });
    return this.mapper.mapRawToEntity(newOne);
  }

  async findOneById(id: Id): Promise<SoundFile | null> {
    const soundFile = await this.db().soundFile.findUnique({
      where: { id },
    });
    return soundFile ? this.mapper.mapRawToEntity(soundFile) : null;
  }

  async deleteOne(id: Id): Promise<void> {
    await this.db().soundFile.update({
      where: { id },
      data: {
        // soft delete
        deletedAt: new Date(),
      },
    });
  }
}
