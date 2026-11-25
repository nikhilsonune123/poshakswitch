import { z } from "zod";

export const registerUserSchema = z.strictObject({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional(),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(255)
    .pipe(z.email({ error: "Invalid email address" })),

  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^\+[1-9]\d{7,14}$/,
      "Invalid phone number with country code"
    )
    .optional(),

  password: z
    .string()
    .min(6, "Password must have at least 15 characters")
    .max(20, "Password must not be more than 15 characters"),
});