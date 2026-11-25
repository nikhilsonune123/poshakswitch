import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

export const prisma = new PrismaClient({
  adapter,
});

export const connectDatabase = async (): Promise<void> => {
  await prisma.$connect();

  await prisma.$queryRaw`SELECT 1`;

  console.log("PostgreSQL connected successfully");
};

export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();

  console.log("PostgreSQL disconnected successfully");
};