import jwt from "jsonwebtoken";
import env from "../../config/env";

import { AppError } from "../../utils/app.error";
import generateAccessToken from "../../utils/generate.acces.token";

export default function refreshService(refreshToken: string) {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
    id: number;
  };

  const newAccessToken = generateAccessToken(decoded);

  return newAccessToken;
}
