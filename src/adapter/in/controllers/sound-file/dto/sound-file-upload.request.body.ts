// src/dto/file-payload.dto.ts

import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';
import { Id } from '../../../../../domain/entity/type';

export class SoundFileUploadRequestBody {
  @IsString()
  fileName: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  fileSize: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  duration: number;
}

export class SoundFileDeleteRequestBody {
  @IsNumber()
  fileId: Id;
}
