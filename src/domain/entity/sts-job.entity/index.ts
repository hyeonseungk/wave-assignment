import { Entity } from '../base.entity';
import { Id } from '../type';
import { StsJobStatus } from './type';

export class StsJob extends Entity {
  constructor(
    id: Id,
    private readonly userId: Id,
    private readonly soundFileId: Id,
    private readonly voiceId: Id,
    private readonly pitch: number,
    private readonly status: StsJobStatus,
    private readonly createdAt: Date,
    private readonly resultFilePath: string,
    private readonly resultFileSize: number,
    private readonly resultFileDuration: number,
    private readonly resultFilePreviewLink: string,
  ) {
    super(id);
  }

  toDTO() {
    return {
      id: this.getId(),
      userId: this.userId,
      soundFileId: this.soundFileId,
      voiceId: this.voiceId,
      pitch: this.pitch,
      status: this.status,
      createdAt: this.createdAt,
      resultFilePath: this.resultFilePath,
      resultFileSize: this.resultFileSize,
      resultFileDuration: this.resultFileDuration,
      resultFilePreviewLink: this.resultFilePreviewLink,
    };
  }
}

export type StsJobCreateInput = {
  userId: Id;
  soundFileId: Id;
  voiceId: Id;
  pitch: number;
  status: StsJobStatus;
  resultFilePath: string;
  resultFileSize: number;
  resultFileDuration: number;
  resultFilePreviewLink: string;
};
