export interface SoundFileRepository {
  save(soundFile: SoundFile): Promise<SoundFile>;
  findById(id: string): Promise<SoundFile | null>;
  findByUserId(userId: string): Promise<SoundFile[]>;
}
