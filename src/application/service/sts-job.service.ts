import { Inject, Injectable } from '@nestjs/common';
import { OutAdapter } from '../../adapter/out/out.adapter.module';
import { ConfigManager } from '../../common/config/config-manager';
import { BadRequestError } from '../../common/error/custom-error';
import { ErrorMsg } from '../../common/error/error-message';
import { StsJobStatus } from '../../domain/entity/sts-job.entity/type';
import {
  StsJobStartCommand,
  StsJobStartResult,
  StsJobSvc,
} from '../port/in/sts-job.service.interface';
import { PreviewLinkGenerator } from '../port/out/etc/preview-link-generator.interface';
import { StsJobProcessor } from '../port/out/etc/sts-job-processor.interface';
import { SoundFileRepository } from '../port/out/repository/sound-file.repository.interface';
import { StsJobRepository } from '../port/out/repository/sts-job.repository.interface';
import { UserRepository } from '../port/out/repository/user.repository.interface';
import { VoiceRepository } from '../port/out/repository/voice.repository.interface';

@Injectable()
export class StsJobService implements StsJobSvc {
  constructor(
    private readonly configManager: ConfigManager,
    @Inject(OutAdapter.UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(OutAdapter.SoundFileRepository)
    private readonly soundFileRepository: SoundFileRepository,
    @Inject(OutAdapter.VoiceRepository)
    private readonly voiceRepository: VoiceRepository,
    @Inject(OutAdapter.StsJobRepository)
    private readonly stsJobRepository: StsJobRepository,
    @Inject(OutAdapter.StsJobProcessor)
    private readonly stsJobProcessor: StsJobProcessor,
    @Inject(OutAdapter.PreviewLinkGenerator)
    private readonly previewLinkGenerator: PreviewLinkGenerator,
  ) {}

  async start(command: StsJobStartCommand): Promise<StsJobStartResult> {
    const { userId, soundFileId, voiceId, pitch, soundQuality } = command;
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new BadRequestError(ErrorMsg.USER_NOT_FOUND);
    }
    const soundFile = await this.soundFileRepository.findOneById(soundFileId);
    if (!soundFile) {
      throw new BadRequestError(ErrorMsg.SOUND_FILE_NOT_FOUND);
    }
    const voice = await this.voiceRepository.findOneById(voiceId);
    if (!voice) {
      throw new BadRequestError(ErrorMsg.VOICE_NOT_FOUND);
    }
    // TODO. user 등급, 권한 및 사용 가능한 보이스인지 등을 체크
    const { convertedPath, fileSize, fileDuration } =
      await this.stsJobProcessor.process(
        soundFile.getFilePath(),
        voice.getId(),
        pitch,
        soundQuality,
      );

    const { previewLink } =
      await this.previewLinkGenerator.generatePreviewLinkWithFilePath(
        convertedPath,
      );

    const stsJob = await this.stsJobRepository.createOne({
      userId,
      soundFileId,
      voiceId,
      pitch,
      soundQuality,
      status: StsJobStatus.QUEUED,
      resultFilePath: convertedPath,
      resultFileSize: fileSize,
      resultFileDuration: fileDuration,
      resultFilePreviewLink: previewLink,
    });
    return new StsJobStartResult(stsJob.getId(), previewLink);
  }
}
