import { NextResponse } from 'next/server';
// 稍后您需要安装 supabase 客户端: npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';

// 初始化数据库连接 (后续在 .env.local 中配置)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: '序列号不能为空' }, { status: 400 });
    }

    // 1. 去数据库里嗅探这个兵符
    const { data: inviteData, error } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !inviteData) {
      return NextResponse.json({ error: '无效的 Alpha 序列号，虎符引擎拒绝响应' }, { status: 404 });
    }

    // 2. 检查是否已被榨干 (判断稀缺性)
    if (inviteData.used_count >= inviteData.max_uses) {
      return NextResponse.json({ error: '该序列号的核销次数已达上限' }, { status: 403 });
    }

    // 3. 校验通过！执行核销动作 (used_count + 1)
    await supabase
    .from('invite_codes')
    .update({ used_count: inviteData.used_count + 1 })
    .eq('code', inviteData.code);

    // 4. 悄悄记录一笔 Lead (捕鼠器收网)
    // 真实业务中可以抓取 IP 或者让用户填表，这里先静默记录
    await supabase.from('leads').insert([{ invite_code: inviteData.code }]);

    // 5. 向上级（前端）汇报战果
    return NextResponse.json({ 
      success: true, 
      tier: inviteData.tier,
      message: `验证通过。虎符引擎已为您解锁，尊贵的 ${inviteData.tier} 领航者。`
    }, { status: 200 });

  } catch (err) {
    console.error('The Citadel Error:', err);
    return NextResponse.json({ error: '极乐空间主引擎网络异常' }, { status: 500 });
  }
}