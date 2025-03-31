import { SoundFileRepository } from '../../../../application/port/out/repository/sound-file.repository.interface';
import { SoundFile } from '../../../../domain/entity/sound-file.entity';
import { PrismaService } from '../prisma/prisma.service';
import { SoundFileMapper } from './sound-file.mapper';

export class SoundFileRepositoryMysql implements SoundFileRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: SoundFileMapper,
  ) {}

  async createSoundFile(soundFile: SoundFile): Promise<void> {
    const { id, userId, filePath, previewLink, createdAt } = soundFile.toDTO();
    await this.prisma.soundFile.create({
      data: {
        id,
        userId,
        filePath,
        previewLink,
        createdAt,
        updatedAt: null,
        deletedAt: null,
      },
    });
  }

  async getSoundFileById(id: number): Promise<SoundFile> {
    const soundFile = await this.prisma.soundFile.findUnique({
      where: { id },
    });
    return soundFile ? this.mapper.mapRawToEntity(soundFile) : null;
  }
}
