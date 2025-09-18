# qtr-app
QTR - Query through RFPs

## Problem
Using standard LLMs to search through documents with large contexts (RFPs, etc.) to find accurate, high-quality answers has limitations. And to search manually is time-consuming, inefficient, and leads to inconsistent responses.

## Objective
To build an application that allows users to instantly query through  documents with large contexts using natural language which will reduce research time, ensure answer consistency and quality.

## Proposed Solution
A web application powered by a Retrieval-Augmented Generation (RAG) pipeline.

## Technical Components
- Front-end - Chat interface for the user to ask questions from an uploaded document
- Back-end & RAG pipeline
- Embedded model - Converting text chunks into vectors
- Vector database - To store vectors in Pinecone for similarity-based search.
- Query process - return the most semantically relevant text chunks.
- LLM - To generate a coherent answer based on the retrieved text chunks.
