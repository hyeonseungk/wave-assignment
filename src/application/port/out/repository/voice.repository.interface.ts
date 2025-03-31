import { Id } from '../../../../domain/entity/type';
import {
  Voice,
  VoiceCreateInput,
} from '../../../../domain/entity/voice.entity';

export interface VoiceRepository {
  createOne(input: VoiceCreateInput): Promise<void>;
  getOneById(id: Id): Promise<Voice | null>;
}
