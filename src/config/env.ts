//Use zod for env
import { config } from "dotenv";
config();

import { z } from "zod";

const env = z.object({
  DB_USERNAME: z.string(),
  DB_HOST: z.string(),
  DATABASE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.number(),
});

export default env.parse(process.env);
