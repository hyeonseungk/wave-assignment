import { Id } from '../../../../domain/entity/type';

export interface StsJobProcessor {
  process(
    originalSoundFilePath: string,
    voiceId: Id,
    pitch: number,
    soundQuality: number,
  ): Promise<StsJobProcessResult>;
}

export type StsJobProcessResult = {
  originalPath: string;
  convertedPath: string;
  fileSize: number;
  fileDuration: number;
  filePreviewLink: string;
};
