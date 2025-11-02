import fastify from "fastify";
import { checkDatabaseConnection, disconnectDatabase } from "@qtr-app/database";
import { documentRoutes } from "./routes/document";

const server = fastify({
  logger: true,
});

// Register routes
server.register(documentRoutes);

server.get("/health", async (request, reply) => {
  return {
    service: "API Service",
    status: "GREEN",
    message: "API Service is Running!",
    timestamp: new Date().toISOString(),
  };
});

const start = async () => {
  try {
    // Check database connection
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      throw new Error("Failed to connect to database");
    }
    console.log("API Service connected to the DB");

    const host = process.env.API_SERVER_HOST || "0.0.0.0";
    const port = parseInt(process.env.API_SERVER_PORT || "3000");

    await server.listen({ port, host });
    console.log(`Server running on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  await disconnectDatabase();
  await server.close();
  process.exit(0);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

start();
