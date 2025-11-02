import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database configuration
export const databaseConfig = {
  url:
    process.env["DATABASE_URL"] ||
    process.env["DATABASE_URL_DOCKER"] ||
    "postgresql://qtr_user:qtr_password@localhost:5432/qtr_dev",
  pool: {
    min: parseInt(process.env["DATABASE_POOL_MIN"] || "2"),
    max: parseInt(process.env["DATABASE_POOL_MAX"] || "10"),
    idleTimeout: parseInt(process.env["DATABASE_POOL_IDLE_TIMEOUT"] || "30000"),
    acquireTimeout: parseInt(
      process.env["DATABASE_POOL_ACQUIRE_TIMEOUT"] || "60000"
    ),
  },
  logging: process.env["NODE_ENV"] === "development",
};

// Create Prisma client instance
export const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseConfig.url,
      },
    },
    log: databaseConfig.logging
      ? ["query", "info", "warn", "error"]
      : ["error"],
  });
};

// Default Prisma client instance
export const prisma = createPrismaClient();

// Database connection health check
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};
