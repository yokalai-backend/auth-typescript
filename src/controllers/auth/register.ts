//Register async function
import type { Request, Response } from "express";
import { inputValidation } from "../../schema/auth.schema";
import registerService from "../../services/auth/register";

export default async function registerAuth(req: Request, res: Response) {
  const result = await registerService(inputValidation.parse({ ...req.body }));

  return res
    .status(201)
    .json({ success: true, message: "Account created", data: result });
}
