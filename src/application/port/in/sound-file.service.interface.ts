export interface SoundFileService {
  upload(command: SoundFileUploadCommand): Promise<SoundFileUploadResult>;
}

export class SoundFileUploadCommand {
  constructor(
    public readonly userId: string,
    public readonly soundFile: Express.Multer.File,
    public readonly fileName: string,
    public readonly fileSize: number,
    public readonly duration: number,
  ) {}
}

export class SoundFileUploadResult {
  constructor(
    public readonly fileId: string,
    public readonly filePreviewUrl: string,
    public readonly uploadTime: string,
  ) {}
}
