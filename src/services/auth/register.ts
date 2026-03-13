//Register logic
import authRepo from "../../repository/auth/auth.repo";
import { userOutDb } from "../../schema/auth.schema";
import { hashPassword } from "../../utils/hash";
import { User } from "../../types/auth/user";

export default async function registerService({ name, password }: User) {
  const hashed = hashPassword(password);

  const userDb = await authRepo.register(name, hashed);

  const userOut = userOutDb.parse(userDb);

  return userOut;
}
