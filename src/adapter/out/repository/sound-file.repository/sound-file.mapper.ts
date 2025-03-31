import { SoundFile } from '../../../../domain/entity/sound-file.entity';
import { Mapper } from '../prisma/mapper.interface';
import { SoundFileRaw } from '../prisma/prisma.raw.type';

export class SoundFileMapper implements Mapper<SoundFileRaw, SoundFile> {
  mapRawToEntity(raw: SoundFileRaw) {
    const { id, filePath, previewLink, userId, createdAt } = raw;
    return new SoundFile(id, userId, filePath, previewLink, createdAt);
  }
}
