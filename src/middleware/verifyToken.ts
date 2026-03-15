//Verify token if valid
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res.status(401).json({ success: false, error: "No token provide" });
  }

  const token = headers.split(" ")[1];

  try {
    const decoded = (jwt.verify as any)(token, env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error with jwt", error);
    return res.status(401).json({ success: false, error: "Token expired" });
  }
}
