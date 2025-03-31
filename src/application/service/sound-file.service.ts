import { Injectable } from '@nestjs/common';
import {
  SoundFileService,
  SoundFileUploadCommand,
  SoundFileUploadResult,
} from '../port/in/sound-file.service.interface';
import { SoundFileRepository } from '../port/out/repository/sound-file.repository.interface';

@Injectable()
export class SoundFileServiceImpl implements SoundFileService {
  constructor(private readonly soundFileRepository: SoundFileRepository) {}

  upload(command: SoundFileUploadCommand): Promise<SoundFileUploadResult> {
    const { userId, soundFile, fileName, fileSize, duration } = command;
    const newSoundFile = new SoundFile(
      userId,
      soundFile,
      fileName,
      fileSize,
      duration,
    );
  }
}
