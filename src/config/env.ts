//Use zod for env
import { z } from "zod";

const env = z.object({
  DB_USERNAME: z.string(),
  DB_HOST: z.string(),
  DATABASE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

export default env.parse(process.env);
