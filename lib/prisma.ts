// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// 💎 Munger 注入：防止开发环境下热更新导致数据库连接数爆满的单例模式
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;