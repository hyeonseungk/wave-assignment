import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { OutAdapter } from '../../adapter/out/out.adapter.module';

import {
  SoundFileSvc,
  SoundFileUploadCommand,
  SoundFileUploadResult,
} from '../port/in/sound-file.service.interface';
import { PreviewLinkGenerator } from '../port/out/etc/preview-link-generator.interface';
import { SoundFileRepository } from '../port/out/repository/sound-file.repository.interface';

@Injectable()
export class SoundFileService implements SoundFileSvc {
  private readonly uploadDirPath = path.join(process.cwd(), 'sound-files');

  constructor(
    @Inject(OutAdapter.SoundFileRepository)
    private readonly soundFileRepository: SoundFileRepository,
    @Inject(OutAdapter.PreviewLinkGenerator)
    private readonly previewLinkGenerator: PreviewLinkGenerator,
  ) {}

  async upload(
    command: SoundFileUploadCommand,
  ): Promise<SoundFileUploadResult> {
    const { userId, soundFile, fileName, fileSize, duration } = command;
    const filePath = await this.saveSoundFile(
      soundFile,
      this.generateFileName(fileName),
    );
    const { previewLink } = await this.previewLinkGenerator.generatePreviewLink(
      soundFile,
      fileName,
    );
    const newSoundFile = await this.soundFileRepository.createOne({
      userId,
      fileName,
      fileSize,
      duration,
      filePath,
      previewLink,
    });
    return new SoundFileUploadResult(newSoundFile);
  }

  private generateFileName(originalFileName: string) {
    return `${originalFileName}-${Date.now()}`;
  }

  private async saveSoundFile(
    file: { buffer: Buffer },
    fileName: string,
  ): Promise<string> {
    const filePath = path.join(this.uploadDirPath, fileName);
    await fs.writeFile(filePath, file.buffer);
    return filePath;
  }

  private async deleteSoundFile(fileName: string): Promise<void> {
    const filePath = path.join(this.uploadDirPath, fileName);
    await fs.unlink(filePath);
  }
}
