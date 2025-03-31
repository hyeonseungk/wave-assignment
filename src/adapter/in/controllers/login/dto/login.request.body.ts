// src/dto/file-payload.dto.ts

import { IsEmail, IsString, MinLength } from 'class-validator';
import { PW_MIN_LENGTH } from '../../../../../domain/policy/user.policy';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(PW_MIN_LENGTH)
  password: string;
}
