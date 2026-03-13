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

//Auth validation
export const inputValidation = z.object({
  name: z.string().trim().min(1, "Name too short").max(30, "Name too long"),
  password: z
    .string()
    .trim()
    .min(6, "Password too short")
    .max(12, "Password too long"),
});
