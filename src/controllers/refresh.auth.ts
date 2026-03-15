import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import refreshService from "../services/auth/refresh.token";

export default async function refreshAuth(req: Request, res: Response) {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res
      .status(401)
      .json({ success: false, error: "No refresh token is provide" });
  }

  const refreshToken = headers.split(" ")[1];

  try {
    const decoded = (jwt.verify as any)(
      refreshToken,
      env.JWT_REFRESH_SECRET,
    ) as { id: string };

    const user = await refreshService(decoded.id);

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(201).json({
      success: true,
      message: "New access token created",
      data: { accessTokne: newAccessToken },
    });
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, error: "Refresh token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ success: false, error: "Refresh token invalid" });
    }
  }
}
