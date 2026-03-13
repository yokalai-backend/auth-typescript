//Async helper for throw an error through middleware

import { ControllersParameters } from "../types/req.res.next";

export default function errorWrapper(
  fn: Function,
  { req, res, next }: ControllersParameters,
) {
  Promise.resolve(fn(req, res, next)).catch(next);
}
