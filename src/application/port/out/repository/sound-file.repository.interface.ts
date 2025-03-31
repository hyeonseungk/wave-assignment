import { SoundFile } from '../../../../domain/entity/sound-file.entity';

export interface SoundFileRepository {
  createSoundFile(soundFile: SoundFile): Promise<void>;
  getSoundFileById(id: number): Promise<SoundFile>;
}
