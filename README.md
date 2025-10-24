# qtr-app

QTR - Query through RFPs

## Table of Contents

- [Problem](#problem)
- [Objective](#objective)
- [Proposed Solution](#proposed-solution)
- [Technical Components](#technical-components)
- [Local Setup](#local-setup)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Access the Application](#access-the-application)

## Problem

Using standard LLMs to search through documents with large contexts (RFPs, etc.) to find accurate, high-quality answers has limitations. And to search manually is time-consuming, inefficient, and leads to inconsistent responses.

## Objective

To build an application that allows users to instantly query through documents with large contexts using natural language which will reduce research time, ensure answer consistency and quality.

## Proposed Solution

A web application powered by a Retrieval-Augmented Generation (RAG) pipeline.

## Technical Components

- Front-end - Chat interface for the user to ask questions from an uploaded document
- Back-end & RAG pipeline
- Embedded model - Converting text chunks into vectors
- Vector database - To store vectors in Pinecone for similarity-based search.
- Query process - return the most semantically relevant text chunks.
- LLM - To generate a coherent answer based on the retrieved text chunks.

## Local Setup

### Prerequisites

- Docker and Docker Compose installed on your system
- Git installed

### Installation Steps

1. **Clone the project and checkout to the `develop` branch:**

   ```bash
   git clone <repository-url>
   cd qtr-app
   git checkout develop
   ```

2. **Create Root Environment File**

   Create a `.env` file in the root directory:

   ```bash
   touch .env
   ```

   all the variables from .env.local.example to the `.env` file:

3. **Create Database Environment File**

   ```bash
   cd packages/database
   touch .env
   ```

   Add the DATABASE_URL to `packages/database/.env`:

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/documents?schema=public"
   ```

4. **Generate Prisma Client and Run Migrations**

   ```bash
   pnpm db:generate
   ```

   This command will:

   - Generate the Prisma Client types
   - Create and run database migrations
   - Sync the database schema with your Prisma schema

5. **Go to the root directory and Start Docker Services**

   ```bash
   docker compose up
   ```

   This will:

   - Create the PostgreSQL container with two databases: `n8n` and `documents`
   - Start the API service
   - Start the n8n service

### Database Architecture

The project uses a single PostgreSQL container with multiple databases:

- **`n8n`** - for n8n workflows
- **`documents`** - for the API service
- **`postgres`** - default database (cannot be removed)

### Access the Application

- **n8n UI**: `http://localhost:5678/`
- **API Service**: `http://localhost:3000/`
- **API Health Check**: `http://localhost:3000/health`
