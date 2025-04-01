import { Injectable } from '@nestjs/common';
import { VoiceRepository } from '../../../../application/port/out/repository/voice.repository.interface';
import { Id } from '../../../../domain/entity/type';
import {
  Voice,
  VoiceCreateInput,
} from '../../../../domain/entity/voice.entity';
import { RequestContextService } from '../../../common/context/request-context.service';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryMySql } from '../prisma/repository.mysql';
import { VoiceMapper } from './voice.mapper';

@Injectable()
export class VoiceRepositoryMysql
  extends RepositoryMySql
  implements VoiceRepository
{
  constructor(
    prisma: PrismaService,
    requestContextService: RequestContextService,
    private readonly mapper: VoiceMapper,
  ) {
    super(prisma, requestContextService);
  }

  async createOne(input: VoiceCreateInput): Promise<Voice> {
    const { name, explanation, link } = input;
    const newOne = await this.db().voice.create({
      data: {
        name,
        explanation,
        link,
      },
    });
    return this.mapper.mapRawToEntity(newOne);
  }

  async findOneById(id: Id): Promise<Voice | null> {
    const voice = await this.db().voice.findUnique({
      where: { id },
    });
    return voice ? this.mapper.mapRawToEntity(voice) : null;
  }
}
