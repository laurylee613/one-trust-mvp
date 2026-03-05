import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // 💎 Munger 注入：强制动态执行，拒绝静态打包！

export async function POST() {
  try {
    // 1. 军火库检索：找到最新一条被死锁的 PR
    const latestBlocked = await prisma.interceptEvent.findFirst({
      where: { status: 'BLOCKED' },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestBlocked) {
      return NextResponse.json({ success: false, error: '没有需要破窗的拦截记录' }, { status: 404 });
    }

    // 2. 核心越权动作：修改状态为 OVERRIDDEN，并烙下当前绝对时间戳！
    const updatedEvent = await prisma.interceptEvent.update({
      where: { id: latestBlocked.id },
      data: {
        status: 'OVERRIDDEN',
        overrideTime: new Date(), // 倒计时起算点
      },
    });

    console.log(`🚨 [最高警报] CTO 行使紧急破窗权！事件 ID: ${updatedEvent.id}`);

    return NextResponse.json({ 
      success: true, 
      message: '破窗成功，24小时倒计时已启动',
      data: updatedEvent 
    }, { status: 200 });

  } catch (error: any) {
    console.error("破窗失败:", error);
    return NextResponse.json({ success: false, error: 'API 故障' }, { status: 500 });
  }
}