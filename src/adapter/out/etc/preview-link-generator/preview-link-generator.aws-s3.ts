import { Injectable } from '@nestjs/common';
import path from 'path';
import { PreviewLinkGenerator } from '../../../../application/port/out/etc/preview-link-generator.interface';

@Injectable()
export class PreviewLinkGeneratorAwsS3 implements PreviewLinkGenerator {
  private baseUrl = 'https://wavedeck.ai/sound-files';

  constructor() {}

  async generatePreviewLinkWithFilePath(
    filePath: string,
  ): Promise<{ previewLink: string }> {
    // TODO. aws client 로직을 굳이 구현하지는 않음
    return {
      previewLink: path.join(this.baseUrl, filePath),
    };
  }
}
