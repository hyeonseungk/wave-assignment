// src/dto/file-payload.dto.ts

import { Transform } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class SoundUploadRequestBody {
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
