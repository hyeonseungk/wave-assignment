export interface SoundUploadService {
  uploadSound(file: Express.Multer.File): Promise<string>;
}
