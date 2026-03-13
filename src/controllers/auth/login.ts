//Login async function.
import type { Request, Response } from "express";
import loginService from "../../services/auth/login";

export default async function loginAuth(req: Request, res: Response) {
  const result = await loginService({ ...req.body });

  return res
    .status(200)
    .json({ success: true, message: "Login successful", data: result });
}
