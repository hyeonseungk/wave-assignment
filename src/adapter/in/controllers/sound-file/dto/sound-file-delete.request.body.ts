import { IsNumber } from 'class-validator';
import { Id } from '../../../../../domain/entity/type';

export class SoundFileDeleteRequestBody {
  @IsNumber()
  fileId: Id;
}
