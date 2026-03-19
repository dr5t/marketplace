import { PrismaClient } from '@prisma/client';

// Prisma 7: datasource URL is now configured via prisma.config.ts
// PrismaClient still instantiated the same way at runtime
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});

export default prisma;
