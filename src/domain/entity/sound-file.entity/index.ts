import { Entity } from '../base.entity';
import { Id } from '../type';

export class SoundFile extends Entity {
  constructor(
    id: Id,
    private readonly userId: number,
    private readonly fileName: string,
    private readonly fileSize: number,
    private readonly duration: number,
    private readonly filePath: string,
    private readonly previewLink: string,
    private readonly createdAt: Date,
  ) {
    super(id);
  }

  toDTO() {
    return {
      id: this.getId(),
      userId: this.userId,
      fileName: this.fileName,
      fileSize: this.fileSize,
      duration: this.duration,
      filePath: this.filePath,
      previewLink: this.previewLink,
      createdAt: this.createdAt,
    };
  }

  isDeletionAllowedBy(userId: number) {
    return this.userId === userId;
  }

  getFilePath() {
    return this.filePath;
  }
}

export type SoundFileCreateInput = {
  userId: number;
  fileName: string;
  fileSize: number;
  duration: number;
  filePath: string;
  previewLink: string;
};
