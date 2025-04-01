import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { OutAdapter } from '../../adapter/out/out.adapter.module';

import { BadRequestError } from '../../common/error/custom-error';
import { ErrorMsg } from '../../common/error/error-message';
import {
  SoundFileDeleteCommand,
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
    const { previewLink } =
      await this.previewLinkGenerator.generatePreviewLinkWithFilePath(filePath);
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

  async delete(command: SoundFileDeleteCommand): Promise<void> {
    const { fileId, userId } = command;
    const soundFile = await this.soundFileRepository.findOneById(fileId);
    if (!soundFile) {
      throw new BadRequestError(
        ErrorMsg.SOUND_FILE_DELETION_NOT_ALLOWED_NOT_EXIST,
      );
    }
    if (!soundFile.isDeletionAllowedBy(userId)) {
      throw new BadRequestError(
        ErrorMsg.SOUND_FILE_DELETION_NOT_ALLOWED_NO_PERMISSION,
      );
    }
    await this.deleteSoundFile(soundFile.getFilePath());
    await this.soundFileRepository.deleteOne(fileId);
  }

  private generateFileName(originalFileName: string) {
    return `${Date.now()}-${originalFileName}`;
  }

  private async saveSoundFile(
    file: { buffer: Buffer },
    fileName: string,
  ): Promise<string> {
    const filePath = path.join(this.uploadDirPath, fileName);
    await fs.writeFile(filePath, file.buffer);
    return filePath;
  }

  private async deleteSoundFile(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
}
