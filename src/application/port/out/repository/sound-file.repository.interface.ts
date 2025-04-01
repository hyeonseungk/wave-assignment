import {
  SoundFile,
  SoundFileCreateInput,
} from '../../../../domain/entity/sound-file.entity';
import { Id } from '../../../../domain/entity/type';

export interface SoundFileRepository {
  createOne(input: SoundFileCreateInput): Promise<SoundFile>;
  findOneById(id: Id): Promise<SoundFile | null>;
  deleteOne(id: Id): Promise<void>;
}
