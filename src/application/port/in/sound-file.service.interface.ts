import { SoundFile } from '../../../domain/entity/sound-file.entity';
import { Id } from '../../../domain/entity/type';

export interface SoundFileSvc {
  upload(command: SoundFileUploadCommand): Promise<SoundFileUploadResult>;
  delete(command: SoundFileDeleteCommand): Promise<void>;
}

export class SoundFileUploadCommand {
  constructor(
    public readonly userId: Id,
    public readonly soundFile: Express.Multer.File,
    public readonly fileName: string,
    public readonly fileSize: number,
    public readonly duration: number,
  ) {}
}

export class SoundFileUploadResult {
  public readonly fileId: Id;
  public readonly filePreviewUrl: string;
  public readonly uploadTime: string;
  constructor(soundFile: SoundFile) {
    const { id, previewLink, createdAt } = soundFile.toDTO();
    this.fileId = id;
    this.filePreviewUrl = previewLink;
    this.uploadTime = createdAt.toISOString();
  }
}

export class SoundFileDeleteCommand {
  constructor(
    public readonly userId: Id,
    public readonly fileId: Id,
  ) {}
}
