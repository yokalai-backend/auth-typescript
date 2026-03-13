//Register async function
import type { ControllersParameters } from "../../types/req.res.next";
import registerService from "../../services/auth/register";

export default async function registerAuth({
  req,
  res,
}: ControllersParameters) {
  const result = await registerService({ ...req.body });

  return res
    .status(201)
    .json({ success: true, message: "Account created", data: result });
}
