//Handle error

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app.error";
import { ZodError } from "zod";

export default async function errorGlobalHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ success: false, error: error.message });
  }

  if (error instanceof ZodError) {
    const formatted = error.issues[0]!;

    return res
      .status(Number(formatted.code))
      .json({ success: false, error: formatted.message });
  }

  return res
    .status(500)
    .json({ success: false, error: "Internal server error" });
}
