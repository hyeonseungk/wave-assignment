import { Injectable } from '@nestjs/common';
import {
  SoundFileSvc,
  SoundFileUploadCommand,
  SoundFileUploadResult,
} from '../port/in/sound-file.service.interface';

@Injectable()
export class SoundFileService implements SoundFileSvc {
  // constructor(private readonly soundFileRepository: SoundFileRepository) {}

  async upload(
    command: SoundFileUploadCommand,
  ): Promise<SoundFileUploadResult> {
    const { userId, soundFile, fileName, fileSize, duration } = command;
    await this.sound;
  }
}
