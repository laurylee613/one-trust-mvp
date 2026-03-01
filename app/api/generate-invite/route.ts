import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// 生成形如 TRIBUNAL-ALPHA-X7A9 的随机码 (排除易混淆的 0,1,O,I)
function generateAlphaCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TRIBUNAL-ALPHA-${result}`;
}

export async function POST(request: Request) {
  try {
    const { referrer_name } = await request.json();
    if (!referrer_name) return NextResponse.json({ error: '必须输入目标客户名称' }, { status: 400 });

    const newCode = generateAlphaCode();

    // 写入 Supabase 数据库
    const { data, error } = await supabase
      .from('invite_codes')
      .insert([{
        code: newCode,
        referrer_name: referrer_name,
        tier: 'Alpha-VIP',
        max_uses: 3,
        used_count: 0
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, code: data.code });
  } catch (err) {
    console.error('Forge Error:', err);
    return NextResponse.json({ error: '兵工厂锻造失败' }, { status: 500 });
  }
}