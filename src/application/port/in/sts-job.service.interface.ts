import { Id } from '../../../domain/entity/type';

export interface StsJobSvc {
  start(command: StsJobStartCommand): Promise<StsJobStartResult>;
}

export class StsJobStartCommand {
  constructor(
    public readonly userId: Id,
    public readonly fileId: Id,
    public readonly voiceId: Id,
    public readonly pitch: number,
    public readonly soundQuality: number,
  ) {}
}

export class StsJobStartResult {
  constructor(
    public readonly originalPath: string,
    public readonly convertedPath: string,
    public readonly fileSize: number,
  ) {}
}
