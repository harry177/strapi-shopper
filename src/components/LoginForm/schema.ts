import { z } from "zod";
import { EmailSchema, PasswordSchema } from "../../validation/schemas";

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;