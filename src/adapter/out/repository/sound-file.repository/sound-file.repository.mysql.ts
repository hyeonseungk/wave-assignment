import { Injectable } from '@nestjs/common';
import { SoundFileRepository } from '../../../../application/port/out/repository/sound-file.repository.interface';
import {
  SoundFile,
  SoundFileCreateInput,
} from '../../../../domain/entity/sound-file.entity';
import { Id } from '../../../../domain/entity/type';
import { PrismaService } from '../prisma/prisma.service';
import { SoundFileMapper } from './sound-file.mapper';

@Injectable()
export class SoundFileRepositoryMysql implements SoundFileRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: SoundFileMapper,
  ) {}

  async createOne(input: SoundFileCreateInput): Promise<SoundFile> {
    const { userId, fileName, fileSize, duration, filePath, previewLink } =
      input;
    const newOne = await this.prisma.soundFile.create({
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
    const soundFile = await this.prisma.soundFile.findUnique({
      where: { id },
    });
    return soundFile ? this.mapper.mapRawToEntity(soundFile) : null;
  }
}
