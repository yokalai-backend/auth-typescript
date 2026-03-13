export interface User {
  name: string;
  password: string;
}

type UserRole = "user" | "admin";

export interface UserDb {
  name: string;
  role: UserRole;
  created_at: string;
  salt: Buffer;
  iterations: number;
  hash: Buffer;
}

export interface HashProps {
  salt: Buffer;
  iterations: number;
  hash: Buffer;
}
