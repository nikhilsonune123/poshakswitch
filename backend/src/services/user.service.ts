import {
  createUser,
  findUserByEmail,
} from "../repository/user.repository.js";

import type {
  RegisterUserDto,
  UserResponseDto,
} from "../types/user.type.js";

import { hashPassword } from "../utils/password.js";
import { AppError } from "../errors/app-error.js";
import { Prisma } from "../generated/prisma/client.js";

export const registerUser = async (
  data: RegisterUserDto
): Promise<UserResponseDto> => {
  const email = data.email.trim().toLowerCase();

  // Check whether the email already exists
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  // Hash the password
  const passwordHash = await hashPassword(data.password);

  // Create the user
  try {
    const user = await createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email,
      phoneNumber: data.phoneNumber,
      passwordHash,
    });

    return user;
  } catch (error) {
    // Handle concurrent registrations with the same email
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "Account conflicts with an existing record",
        409
      );
    }

    throw error;
  }
};