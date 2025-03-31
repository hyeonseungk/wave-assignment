import { Injectable } from '@nestjs/common';
import {
  SoundFileService,
  SoundFileUploadCommand,
  SoundFileUploadResult,
} from '../port/in/sound-file.service.interface';

@Injectable()
export class SoundFileServiceImpl implements SoundFileService {
  upload(command: SoundFileUploadCommand): Promise<SoundFileUploadResult> {
    const { userId, soundFile, fileName, fileSize, duration } = command;
    // throw new Error("Method not implemented.");
  }
}
