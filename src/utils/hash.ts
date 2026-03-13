//Help hashing the password and verify
import crypto from "crypto";
import { HashProps } from "../types/auth/user";

export function hashPassword(password: string): HashProps {
  const salt = crypto.randomBytes(16);
  const iterations = 10000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512");

  return { salt, hash, iterations };
}

export function verifyPassword(
  password: string,
  { salt, hash, iterations }: HashProps,
): boolean {
  const hashed = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512");

  return hashed.equals(hash);
}
