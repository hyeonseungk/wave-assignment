import { Injectable } from '@nestjs/common';
import { VoiceRepository } from '../../../../application/port/out/repository/voice.repository.interface';
import { Id } from '../../../../domain/entity/type';
import {
  Voice,
  VoiceCreateInput,
} from '../../../../domain/entity/voice.entity';
import { PrismaService } from '../prisma/prisma.service';
import { VoiceMapper } from './voice.mapper';

@Injectable()
export class VoiceRepositoryMysql implements VoiceRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: VoiceMapper,
  ) {}

  async createOne(input: VoiceCreateInput): Promise<Voice> {
    const { name, explanation, link } = input;
    const newOne = await this.prisma.voice.create({
      data: {
        name,
        explanation,
        link,
      },
    });
    return this.mapper.mapRawToEntity(newOne);
  }

  async findOneById(id: Id): Promise<Voice | null> {
    const voice = await this.prisma.voice.findUnique({
      where: { id },
    });
    return voice ? this.mapper.mapRawToEntity(voice) : null;
  }
}
