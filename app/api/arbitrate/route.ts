import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { eventId, action } = await request.json();

    if (!eventId || !action) {
      return NextResponse.json({ success: false, error: '缺乏有效判决书' }, { status: 400 });
    }

    // 核心动作：将状态修改为 APPROVED (追认合规) 或 ROLLBACK (勒令回滚)
    const updatedEvent = await prisma.interceptEvent.update({
      where: { id: eventId },
      data: { status: action },
    });

    console.log(`⚖️ [虎符仲裁] 李律已下达最终判决: ${action}`);

    return NextResponse.json({ success: true, data: updatedEvent }, { status: 200 });
  } catch (error: any) {
    console.error("仲裁执行失败:", error);
    return NextResponse.json({ success: false, error: 'API 故障' }, { status: 500 });
  }
}