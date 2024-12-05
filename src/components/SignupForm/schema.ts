import { z } from "zod";
import {
  EmailSchema,
  PasswordSchema,
  UsernameSchema,
} from "../../validation/schemas";

export const SignupFormSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export type TSignupFormSchema = z.infer<typeof SignupFormSchema>;
