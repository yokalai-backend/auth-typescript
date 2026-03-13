//Type for request, response, and next from express.
import type { Request, Response, NextFunction } from "express";

export interface ControllersParameters {
  req: Request;
  res: Response;
  next?: NextFunction;
}
