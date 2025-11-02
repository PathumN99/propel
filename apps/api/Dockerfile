FROM node:20-alpine

# Set CI environment variable for pnpm
ENV CI=true

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace configuration files
COPY package.json pnpm-workspace.yaml ./

# Copy all workspace packages
COPY apps/ ./apps/
COPY packages/ ./packages/

# Install all workspace dependencies
RUN pnpm install

# Generate Prisma client for database package
WORKDIR /app/packages/database
RUN npx prisma generate

# Go back to root and start API service
WORKDIR /app

EXPOSE 3000

# Use tsx with polling for better Docker file watching
CMD ["pnpm", "--filter", "qtr-api", "dev", "--", "--poll"]