import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signInFirstStepSchema = z.object({
  email: z.string().email(),
});

export const signInSecondStepSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export type ISignUp = z.infer<typeof signUpSchema>;
export type ISignInFirstStepSchema = z.infer<typeof signInFirstStepSchema>;
export type ISignInSecondStepSchema = z.infer<typeof signInSecondStepSchema>;
