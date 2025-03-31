import { SoundFileRepository } from '../../../../application/port/out/repository/sound-file.repository.interface';
import {
  SoundFile,
  SoundFileCreateInput,
} from '../../../../domain/entity/sound-file.entity';
import { Id } from '../../../../domain/entity/type';
import { PrismaService } from '../prisma/prisma.service';
import { SoundFileMapper } from './sound-file.mapper';

export class SoundFileRepositoryMysql implements SoundFileRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: SoundFileMapper,
  ) {}

  async createOne(input: SoundFileCreateInput): Promise<void> {
    const { userId, fileName, fileSize, duration, filePath, previewLink } =
      input;
    await this.prisma.soundFile.create({
      data: {
        userId,
        fileName,
        fileSize,
        duration,
        filePath,
        previewLink,
      },
    });
  }

  async getOneById(id: Id): Promise<SoundFile | null> {
    const soundFile = await this.prisma.soundFile.findUnique({
      where: { id },
    });
    return soundFile ? this.mapper.mapRawToEntity(soundFile) : null;
  }
}
