import jwt from "jsonwebtoken";
import env from "../config/env";
import { UserDb } from "../types/auth/user";

export default function generateRefreshToken(user: UserDb) {
  return jwt.sign({ id: user.id, type: "refresh" }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}
