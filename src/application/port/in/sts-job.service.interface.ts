import { Id } from '../../../domain/entity/type';

export interface StsJobSvc {
  start(command: StsJobStartCommand): Promise<StsJobStartResult>;
}

export class StsJobStartCommand {
  constructor(
    public readonly userId: Id,
    public readonly soundFileId: Id,
    public readonly voiceId: Id,
    public readonly pitch: number,
    public readonly soundQuality: number,
  ) {}
}

export class StsJobStartResult {
  constructor(
    public readonly jobId: Id,
    public readonly resultFilePreviewLink: string,
  ) {}
}
