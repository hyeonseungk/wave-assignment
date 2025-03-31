import { Id } from '../../../domain/entity/type';

export interface SoundFileSvc {
  upload(command: SoundFileUploadCommand): Promise<SoundFileUploadResult>;
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
  constructor(
    public readonly fileId: Id,
    public readonly filePreviewUrl: string,
    public readonly uploadTime: string,
  ) {}
}
