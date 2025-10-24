import { FastifyInstance } from "fastify";
import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../document/document.controller";

export async function documentRoutes(fastify: FastifyInstance) {
  // GET /api/v1/documents - Get all documents
  fastify.get("/api/v1/documents", getDocuments);

  // GET /api/v1/documents/:id - Get document by ID
  fastify.get("/api/v1/documents/:id", getDocumentById);

  // POST /api/v1/documents - Create new document
  fastify.post("/api/v1/documents", createDocument);

  // PUT /api/v1/documents/:id - Update document by ID
  fastify.put("/api/v1/documents/:id", updateDocument);

  // DELETE /api/v1/documents/:id - Delete document by ID
  fastify.delete("/api/v1/documents/:id", deleteDocument);
}
