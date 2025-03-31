import * as bcrypt from 'bcrypt';

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // 라운드 수가 높을수록 더 안전하지만 시간이 오래 걸림
  return bcrypt.hash(password, saltRounds);
}

// 비밀번호 검증
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
