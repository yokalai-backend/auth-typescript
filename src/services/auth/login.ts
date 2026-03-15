//Login logic
import jwt from "jsonwebtoken";
import authRepo from "../../repository/auth/auth.repo";
import env from "../../config/env";

import { User } from "../../types/auth/user";
import { verifyPassword } from "../../utils/hash";
import { AppError } from "../../utils/app.error";
import { userOutDb, HashFilter } from "../../schema/auth.schema";

export default async function loginService({ name, password }: User) {
  const userDb = await authRepo.login(name);

  const verified = verifyPassword(password, HashFilter.parse(userDb));

  if (!verified) {
    throw new AppError("Username or password incorrect", 401);
  }

  const token = (jwt.sign as any)(
    {
      id: userDb.id,
      name: userDb.name,
      role: userDb.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRED },
  );

  const userOut = {
    ...userDb,
    token: token,
  };

  return userOutDb.parse(userOut);
}
