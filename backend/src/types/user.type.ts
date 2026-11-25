import type { z } from "zod";
import type { User } from "../generated/prisma/client.js";
import type { registerUserSchema } from "../validations/user.validation.js";

// Registration request DTO
export type RegisterUserDto = z.infer<typeof registerUserSchema>;

// User response DTO
export type UserResponseDto = Pick<
  User,
  | "id"
  | "userId"
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "role"
  | "status"
  | "isEmailVerified"
  | "isPhoneVerified"
  | "createdAt"
  | "updatedAt"
>;