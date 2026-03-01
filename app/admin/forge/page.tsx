"use client";

import React, { useState } from 'react';
import { Shield, Copy, CheckCircle2, Zap } from 'lucide-react';

export default function ForgePage() {
  const [targetName, setTargetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ code: string, link: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!targetName.trim()) return;
    setIsLoading(true);
    setCopied(false);

    try {
      const res = await fetch('/api/generate-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referrer_name: targetName.trim() })
      });
      const data = await res.json();

      if (data.success) {
        const baseUrl = window.location.origin; // 自动获取当前域名 (如 localhost 或 vercel 域名)
        setResult({
          code: data.code,
          link: `${baseUrl}/vip?code=${data.code}` // 拼接带参数的专属链接
        });
      }
    } catch (e) {
      alert("生成失败，请检查网络或控制台");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      const copyText = `专属靶场链接：${result.link}\n您的定向解锁码：${result.code}`;
      navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-200 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-black border border-[#D4AF37]/30 rounded-xl p-8 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h1 className="text-xl font-serif text-[#D4AF37] tracking-widest">中央兵工厂 (The Forge)</h1>
          <p className="text-xs text-slate-500 mt-2">动态序列号签发终端</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">目标客户名称 (如：北京盈科-李四)</label>
            <input 
              type="text" 
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder="输入客户特征以作后台追踪..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isLoading || !targetName}
            className="w-full bg-[#D4AF37] hover:bg-[#b5952f] disabled:bg-slate-800 disabled:text-slate-500 text-black font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all"
          >
            {isLoading ? <Zap className="w-4 h-4 animate-pulse" /> : <Shield className="w-4 h-4" />}
            {isLoading ? '锻造中...' : '生成专属核爆链接'}
          </button>
        </div>

        {/* 结果展示区 */}
        {result && (
          <div className="mt-8 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg animate-in slide-in-from-bottom-4">
            <p className="text-[10px] text-[#D4AF37] font-mono mb-2">签发成功。目标锁定：{targetName}</p>
            <div className="text-sm font-mono text-slate-300 break-all mb-4 bg-black p-3 rounded border border-slate-800">
              {result.link}
            </div>
            <button 
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 text-xs border border-[#00E5FF]/30 text-[#00E5FF] py-2 rounded hover:bg-[#00E5FF]/10 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制话术与链接' : '一键复制交付包'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}