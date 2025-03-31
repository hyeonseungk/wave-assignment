import { VoiceRepository } from '../../../../application/port/out/repository/voice.repository.interface';
import { Id } from '../../../../domain/entity/type';
import {
  Voice,
  VoiceCreateInput,
} from '../../../../domain/entity/voice.entity';
import { PrismaService } from '../prisma/prisma.service';
import { VoiceMapper } from './voice.mapper';

export class VoiceRepositoryMysql implements VoiceRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: VoiceMapper,
  ) {}

  async createOne(input: VoiceCreateInput): Promise<void> {
    const { name, explanation, link } = input;
    await this.prisma.voice.create({
      data: {
        name,
        explanation,
        link,
      },
    });
  }

  async getOneById(id: Id): Promise<Voice | null> {
    const voice = await this.prisma.voice.findUnique({
      where: { id },
    });
    return voice ? this.mapper.mapRawToEntity(voice) : null;
  }
}
