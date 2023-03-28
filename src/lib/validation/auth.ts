import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export type ISignUp = z.infer<typeof signUpSchema>;
