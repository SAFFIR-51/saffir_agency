import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

/** 저장 포맷: scrypt$<salt(hex)>$<hash(hex)> — 외부 의존성 없이 Node 내장 scrypt 만 쓴다. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt$${salt}$${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  if (!stored) return false;
  const [scheme, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;

  const expected = Buffer.from(hash, 'hex');
  const derived = (await scryptAsync(password, salt, expected.length)) as Buffer;
  // 길이가 다르면 timingSafeEqual 이 던지므로 먼저 거른다
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

/** 최소 8자, 영문·숫자 각 1자 이상. 프론트(app/signup)와 동일 규칙. */
export function isStrongEnough(password: string): boolean {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

/** 아이디 찾기 응답용 — ho***@gmail.com 형태로 가린다. */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const head = local.slice(0, Math.min(2, local.length));
  return `${head}${'*'.repeat(Math.max(local.length - head.length, 1))}@${domain}`;
}

/** 연락처는 숫자만 남겨 저장·비교한다 (010-1234-5678 == 01012345678). */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
