import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient();
// use `prisma` in your application to read and write data in your DB

if (process.env.NODE_ENV === 'development') global.prisma = prisma;




export { prisma }