import { prisma } from "../config/database.js";

import type { Prisma } from "../generated/prisma/client.js";

// Fields returned by normal user operations
const userSelect = {
  id: true,
  userId: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  role: true,
  status: true,
  isEmailVerified: true,
  isPhoneVerified: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

// User creation input
type CreateUserData = Pick<
  Prisma.UserCreateInput,
  "firstName" | "lastName" | "email" |
  "phoneNumber" | "passwordHash"
>;

// User update input
type UpdateUserData = {
  firstName?: string;
  lastName?: string | null;
  phoneNumber?: string | null;
};

// Create a new user
export const createUser = async (data: CreateUserData) => {
  return prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      passwordHash: data.passwordHash,
    },
    select: userSelect,
  });
};

// Find user by internal UUID
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    select: userSelect,
  });
};

// Find user by sequential User ID
export const findUserByUserId = async (userId: number) => {
  return prisma.user.findUnique({
    where: {
      userId,
      deletedAt: null,
    },
    select: userSelect,
  });
};

// Find user by email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: userSelect,
  });
};

// Find user with credentials for authentication
export const findUserForAuthentication = async (
  email: string
) => {
  return prisma.user.findUnique({
    where: {
      email,
      deletedAt: null,
      status: "ACTIVE",
    },
    select: {
      ...userSelect,
      passwordHash: true,
    },
  });
};

// Retrieve users with pagination
export const findUsers = async (
  skip: number = 0,
  take: number = 20
) => {
  return prisma.user.findMany({
    where: {
      deletedAt: null,
    },
    skip,
    take: Math.min(take, 100),
    orderBy: {
      userId: "asc",
    },
    select: userSelect,
  });
};

// Count non-deleted users
export const countUsers = async () => {
  return prisma.user.count({
    where: {
      deletedAt: null,
    },
  });
};

// Update user information
export const updateUser = async (
  id: string,
  data: UpdateUserData
) => {
  return prisma.user.update({
    where: {
      id,
      deletedAt: null,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    },
    select: userSelect,
  });
};

// Soft delete user
export const softDeleteUser = async (id: string) => {
  return prisma.user.update({
    where: {
      id,
      deletedAt: null,
    },
    data: {
      status: "DELETED",
      deletedAt: new Date(),
    },
    select: userSelect,
  });
};