import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@qtr-app/database";

/**
 * Get all documents with pagination and filtering
 */
export const getDocuments = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    reply.send({
      success: true,
      data: documents,
      count: documents.length,
    });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({
      success: false,
      error: "Failed to retrieve documents",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get a single document by ID
 */
export const getDocumentById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { id } = request.params;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!document) {
      reply.status(404).send({
        success: false,
        error: "Document not found",
      });
      return;
    }

    reply.send({
      success: true,
      data: document,
    });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({
      success: false,
      error: "Failed to retrieve document",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Create a new document
 */
export const createDocument = async (
  request: FastifyRequest<{
    Body: {
      title: string;
      description?: string;
      author?: string;
      s3ReferenceId?: string;
      createdById?: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { title, description, author, s3ReferenceId, createdById } =
      request.body;

    const document = await prisma.document.create({
      data: {
        title,
        description,
        author,
        s3ReferenceId,
        createdById,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    reply.status(201).send({
      success: true,
      data: document,
    });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({
      success: false,
      error: "Failed to create document",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Update a document by ID
 */
export const updateDocument = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: {
      title?: string;
      description?: string;
      author?: string;
      s3ReferenceId?: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const document = await prisma.document.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    reply.send({
      success: true,
      data: document,
    });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({
      success: false,
      error: "Failed to update document",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Delete a document by ID
 */
export const deleteDocument = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { id } = request.params;

    await prisma.document.delete({
      where: { id },
    });

    reply.send({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({
      success: false,
      error: "Failed to delete document",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
