import { Request, Response } from "express";
import getUserDataService from "../../services/test/get.data";

export default async function getUserData(req: Request, res: Response) {
  const result = await getUserDataService(req.user!.name);

  return res
    .status(200)
    .json({ success: true, message: "Completed", data: result });
}
