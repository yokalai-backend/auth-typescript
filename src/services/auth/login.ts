//Login logic
import { User } from "../../types/auth/user";
import { verifyPassword } from "../../utils/hash";
import { AppError } from "../../utils/app.error";
import { userOutDb, HashFilter } from "../../schema/auth.schema";

import authRepo from "../../repository/auth/auth.repo";

export default async function loginService({ name, password }: User) {
  const userDb = await authRepo.login(name);

  const userOut = userOutDb.parse(userDb);

  const verified = verifyPassword(password, HashFilter.parse(userDb));

  if (!verified) {
    throw new AppError("Username or password incorrect", 401);
  }

  return userOut;
}
