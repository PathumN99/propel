# Useful commands

## In order to work below commands properly, .env file should be created in the packages/database directory and the DATABASE_URL for the documents DB should be added

1. Create the .env file

```bash
   cd packages/database
   touch .env
```

2. Add the DATABASE_URL variable from .env.loca.example from root folder

`DATABASE_URL=postgresql://postgres:password@postgres:5432/documents?schema=public`

## To re-generate prisma types and schema

```bash
   pnpm db:generate
```

## format the schema file

```bash
   npx prisma format
```
