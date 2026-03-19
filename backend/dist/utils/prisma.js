"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Prisma 7: datasource URL is now configured via prisma.config.ts
// PrismaClient still instantiated the same way at runtime
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});
exports.default = prisma;
