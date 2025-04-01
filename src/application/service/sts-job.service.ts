import { Inject, Injectable } from '@nestjs/common';
import { OutAdapter } from '../../adapter/out/out.adapter.module';
import { ConfigManager } from '../../common/config/config-manager';
import { BadRequestError } from '../../common/error/custom-error';
import { ErrorMsg } from '../../common/error/error-message';
import {
  StsJobStartCommand,
  StsJobStartResult,
  StsJobSvc,
} from '../port/in/sts-job.service.interface';
import { SoundFileRepository } from '../port/out/repository/sound-file.repository.interface';
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
  ) {}

  async start(command: StsJobStartCommand): Promise<StsJobStartResult> {
    const { userId, fileId, voiceId, pitch, soundQuality } = command;
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new BadRequestError(ErrorMsg.USER_NOT_FOUND);
    }
    const soundFile = await this.soundFileRepository.findOneById(fileId);
    if (!soundFile) {
      throw new BadRequestError(ErrorMsg.SOUND_FILE_NOT_FOUND);
    }
    const voice = await this.voiceRepository.findOneById(voiceId);
    if (!voice) {
      throw new BadRequestError(ErrorMsg.VOICE_NOT_FOUND);
    }
    // TODO. user 등급, 권한 및 사용 가능한 보이스인지 등을 체크
  }
}
