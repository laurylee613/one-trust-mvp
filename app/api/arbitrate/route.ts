import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 💎 Munger 终极注入：双重封条，彻底打断 Vercel 的静态打包企图！
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: Request) {
  try {
    const { eventId, action } = await request.json();

    if (!eventId || !action) {
      return NextResponse.json({ success: false, error: '缺乏有效判决书' }, { status: 400 });
    }

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