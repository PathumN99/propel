import fastify from "fastify";

const server = fastify({
  logger: true,
});

server.get("/health", async (request, reply) => {
  return { status: "API Service is Running!" };
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
