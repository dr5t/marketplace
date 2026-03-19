"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Prisma 7: datasource URL is now configured via prisma.config.ts
// PrismaClient still instantiated the same way at runtime
exports.prisma = new client_1.PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});
exports.default = exports.prisma;
