import { StsJobProcessor } from '../../../../application/port/out/etc/sts-job-processor.interface';

export class StsJobProcessorAi implements StsJobProcessor {
  async process(
    originalSoundFilePath: string,
    voiceId: Id,
    pitch: number,
    soundQuality: number,
  ): Promise<StsJobProcessResult> {}
}
