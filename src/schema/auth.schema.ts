//Decide auth schema
import { z } from "zod";

export const userOutDb = z.array(
  z
    .object({
      name: z.string(),
      role: z.string(),
      created_at: z.string(),
    })
    .transform((u) =>
      z.object({
        user: {
          name: u.name,
          role: u.role,
          createdAt: u.created_at,
        },
      }),
    ),
);
