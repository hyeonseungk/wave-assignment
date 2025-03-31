import * as jwt from 'jsonwebtoken';
import { Id } from '../../domain/entity/type';

export function generateAccessToken(
  userId: Id,
  jwtSecret: string,
  expiresIn: string,
): string {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn,
  });
}
