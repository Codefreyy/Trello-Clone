import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

// In next.js hot reload, prismaClient will be initialized for multiple times.
// We can store the first time in the global, and check every following time =
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db