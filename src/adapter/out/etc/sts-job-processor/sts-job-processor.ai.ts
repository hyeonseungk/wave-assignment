import {
  StsJobProcessor,
  StsJobProcessResult,
} from '../../../../application/port/out/etc/sts-job-processor.interface';
import { Id } from '../../../../domain/entity/type';
import { RetryableHttpClient } from '../../common/http-client/retryable-http-client';

type AiServerResponseBody = {
  data: {
    originalPath: string;
    convertedPath: string;
    fileSize: number;
    fileDuration: number;
    filePreviewLink: string;
  };
};

export class StsJobProcessorAi implements StsJobProcessor {
  constructor(private readonly retryableHttpClient: RetryableHttpClient) {}

  async process(
    originalSoundFilePath: string,
    voiceId: Id,
    pitch: number,
    soundQuality: number,
  ): Promise<StsJobProcessResult> {
    const response = await this.retryableHttpClient.post(
      'https://api.openai.com/v1/...',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        json: {
          originalPath: originalSoundFilePath,
          voiceId,
          pitch,
          soundQuality,
        },
      },
    );
    const {
      data: {
        originalPath,
        convertedPath,
        fileSize,
        fileDuration,
        filePreviewLink,
      },
    } = response.body as AiServerResponseBody;

    return {
      originalPath,
      convertedPath,
      fileSize,
      fileDuration,
      filePreviewLink,
    };
  }
}
