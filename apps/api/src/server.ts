import fastify from "fastify";

const server = fastify({
  logger: true,
});

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
    const host = process.env.API_SERVER_HOST || "0.0.0.0";
    const port = parseInt(process.env.API_SERVER_PORT || "3000");

    await server.listen({ port, host });
    console.log(`Server running on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
