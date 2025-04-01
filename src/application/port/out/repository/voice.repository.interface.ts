import { Id } from '../../../../domain/entity/type';
import {
  Voice,
  VoiceCreateInput,
} from '../../../../domain/entity/voice.entity';

export interface VoiceRepository {
  createOne(input: VoiceCreateInput): Promise<Voice>;
  findOneById(id: Id): Promise<Voice | null>;
}
