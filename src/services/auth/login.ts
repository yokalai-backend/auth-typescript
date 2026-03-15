//Login logic
import authRepo from "../../repository/auth/auth.repo";
import generateAccessToken from "../../utils/generate.acces.token";

import { User } from "../../types/auth/user";
import { verifyPassword } from "../../utils/hash";
import { AppError } from "../../utils/app.error";
import { userOutDb, HashFilter } from "../../schema/auth.schema";
import generateRefreshToken from "../../utils/generate.refresh.token";

export default async function loginService({ name, password }: User) {
  const userDb = await authRepo.login(name);

  const verified = verifyPassword(password, HashFilter.parse(userDb));

  if (!verified) {
    throw new AppError("Username or password incorrect", 401);
  }

  const accessToken = generateAccessToken(userDb);
  const refreshToken = generateRefreshToken(userDb);

  const userParsed = userOutDb.parse(userDb);

  const userOut = {
    ...userParsed,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return userOut;
}
