import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

export default async function refreshAuth(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      error: "Refresh token required",
    });
  }

  try {
    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
      id: string;
      role: string;
      type: string;
    };

    const newAccessToken = jwt.sign(
      {
        id: payload.id,
        role: payload.role,
        type: payload.type,
      },
      env.JWT_ACCESS_SECRET,
      {
        expiresIn: "5m",
      },
    );

    return res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: "Invalid refresh token",
    });
  }
}
