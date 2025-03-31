import { Voice } from '../../../../domain/entity/voice.entity';
import { Mapper } from '../prisma/mapper.interface';
import { VoiceRaw } from '../prisma/prisma.raw.type';

export class VoiceMapper implements Mapper<VoiceRaw, Voice> {
  mapRawToEntity(raw: VoiceRaw) {
    const { id, name, explanation, link } = raw;
    return new Voice(id, name, explanation, link);
  }
}
