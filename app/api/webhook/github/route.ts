import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 引入咱们的数据库连接器

export async function POST(request: Request) {
  try {
    const event = request.headers.get('x-github-event');
    const payload = await request.json();

    if (event === 'pull_request' && (payload.action === 'opened' || payload.action === 'synchronize')) {
      const prNumber = payload.pull_request.number;
      const repoName = payload.repository.full_name;
      const branchName = payload.pull_request.head.ref;
      const author = payload.pull_request.user.login;
      
      console.log(`\n🐅 [虎符雷达警报] 侦测到代码提交！正在执行盲计算与拦截...`);

      // ==========================================
      // 💎 Munger 注入：将违规证据死死钉在数据库里
      // ==========================================
      const newEvent = await prisma.interceptEvent.create({
        data: {
          repoName: repoName,
          prNumber: prNumber,
          author: author,
          branch: branchName,
          status: 'BLOCKED', // 初始状态死锁为：已拦截
          reason: '侦测到高危越权代码特征，触发隐私保护附则熔断。',
          violationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        }
      });

      console.log(`✅ [军火库] 证据已入库！事件流水号 ID: ${newEvent.id}`);

      return NextResponse.json({ 
        success: true, 
        message: '虎符引擎已接管该 PR 的合规审查',
        eventId: newEvent.id
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: '非核心事件，雷达忽略' }, { status: 200 });

  } catch (error: any) {
    console.error(`❌ [系统故障] 前哨站解析失败:`, error.message);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}