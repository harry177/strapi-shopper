import { z } from "zod";
import {
  EmailRegex,
  EmailRepeatRegex,
  PasswordRegex,
  UsernameRegex,
} from "./regex";

export const EmailSchema = z
  .string()
  .min(5, "Email wrong format")
  .max(50, "Email wrong format")
  .regex(EmailRegex, "Email wrong format")
  .regex(EmailRepeatRegex, "Email wrong format");

export const PasswordSchema = z
  .string()
  .min(8, "Must have 8 - 20 characters")
  .max(20, "Must have 8 - 20 characters")
  .regex(/[a-z]/, "Must have at least 1 lowercase Latin letter")
  .regex(/[A-Z]/, "Must have at least 1 uppercase Latin letter")
  .regex(/[0-9]/, "Must have at least 1 number from 0 to 9")
  .regex(PasswordRegex, "Must have at least 1 special character");

export const UsernameSchema = z
  .string()
  .min(2, "Must have 2 - 20 characters")
  .max(20, "Must have 2 - 20 characters")
  .regex(UsernameRegex, "Must have latin letters or numbers");

export const RepeatPasswordSchema = z.lazy(() =>
  z
    .string()
    .min(8, "Must have 8 - 20 characters")
    .max(20, "Must have 8 - 20 characters")
);
