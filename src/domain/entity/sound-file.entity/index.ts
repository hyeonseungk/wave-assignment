import { Entity } from '../base.entity';

export class SoundFile extends Entity {
  constructor(
    id: number,
    private readonly userId: number,
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
      filePath: this.filePath,
      previewLink: this.previewLink,
      createdAt: this.createdAt,
    };
  }
}
