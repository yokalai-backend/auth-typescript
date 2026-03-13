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
      "INSERT INTO users (name, salt, hash, iterations) VALUES ($1, $2, $3, $4) RETURNING name, role, created_at",
      [name, salt, hash, iterations],
    );

    return user;
  },

  login: async (name: string): Promise<UserDb> => {
    const user = await queryOne<UserDb>("SELECT * FROM users WHERE name = $1", [
      name,
    ]);

    if (!user) {
      throw new AppError("User not exist", 404);
    }

    return user;
  },
};

export default authRepo;
