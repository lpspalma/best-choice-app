import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
