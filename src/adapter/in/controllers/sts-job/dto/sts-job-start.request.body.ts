import { IsNumber } from 'class-validator';
import { Id } from '../../../../../domain/entity/type';

export class StsJobStartRequestBody {
  @IsNumber()
  soundFileId: Id;

  @IsNumber()
  voiceId: Id;

  @IsNumber()
  pitch: number;

  @IsNumber()
  soundQuality: number;
}
