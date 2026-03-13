//Auth repository helps query
import { AppError } from "../../utils/app.error";
import { queryOne } from "../../utils/query.helper";
import type { HashProps, UserDb } from "../../types/auth/user";

const authRepo = {
  register: async (name: string, hashed: HashProps): Promise<UserDb | null> => {
    const { salt, iterations, hash } = hashed;

    const exist = await queryOne<UserDb>(
      "SELECT 1 FROM users WHERE name = $1",
      [name],
    );

    if (exist) {
      throw new AppError("User already exist", 409);
    }

    const user = await queryOne<UserDb>(
      "INSERT INTO users (name, salt, hash, iterations) VALUES ($1, $2, $3) RETURNING name created_at role",
      [name, salt, hash, iterations],
    );

    return user;
  },
};

export default authRepo;
