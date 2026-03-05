import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 强制动态获取，绝不使用缓存数据
export const dynamic = 'force-dynamic'; 

export async function GET() {
  try {
    // 🔪 CTO 战术：去军火库里捞出最新的一条拦截记录
    const latestEvent = await prisma.interceptEvent.findFirst({
      orderBy: { createdAt: 'desc' }, // 按时间倒序，永远拿最新
    });

    return NextResponse.json({ success: true, data: latestEvent }, { status: 200 });
  } catch (error: any) {
    console.error("提款机故障:", error);
    return NextResponse.json({ success: false, error: '获取情报失败' }, { status: 500 });
  }
}