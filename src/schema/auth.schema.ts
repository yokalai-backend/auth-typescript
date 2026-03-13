//Decide auth schema
import { z } from "zod";

export const userOutDb = z
  .object({
    name: z.string(),
    role: z.string(),
    created_at: z.date(),
  })
  .transform((u) => ({
    user: {
      name: u.name,
      role: u.role,
      createdAt: u.created_at,
    },
  }));

//Auth validation
export const inputValidation = z.object({
  name: z.string().trim().min(4, "Name too short").max(30, "Name too long"),
  password: z
    .string()
    .trim()
    .min(6, "Password too short")
    .max(12, "Password too long"),
});

export const HashFilter = z.object({
  salt: z.instanceof(Buffer),
  hash: z.instanceof(Buffer),
  iterations: z.number(),
});
