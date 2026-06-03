import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const verifyResetCodeSchema = z.object({
  email: z.email(),
  code: z.string().min(6).max(6),
});

export const resetPasswordSchema = z.object({
  email: z.email(),
  code: z.string().min(6).max(6),
  password: z.string().min(6),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetCodeInput = z.infer<typeof verifyResetCodeSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
