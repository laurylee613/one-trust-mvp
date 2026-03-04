"use client";

import React, { useState } from 'react';
import { Terminal, Copy, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

export default function ForgeDashboard() {
  const [referrer, setReferrer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultCode, setResultCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!referrer.trim()) {
      setError('必须输入目标客户特征或姓名！');
      return;
    }
    setIsLoading(true);
    setError('');
    setResultCode('');
    setCopied(false);

    try {
      const res = await fetch('/api/generate-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referrer_name: referrer }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || '锻造失败，请检查 API 或数据库。');
      }

      setResultCode(data.code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!resultCode) return;
    // 自动生成带参数的交付链接，客户点击直接自动填入密码！
    const link = `${window.location.origin}/vip?code=${resultCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full border border-slate-800 bg-[#0A0A0A] p-8 rounded-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Terminal className="text-amber-500 w-6 h-6" />
          <h1 className="text-xl font-bold tracking-widest text-slate-100">中央兵工厂 (FORGE)</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider">Target Identity / 目标客户</label>
            <input
              type="text"
              value={referrer}
              onChange={(e) => setReferrer(e.target.value)}
              placeholder="例如: 张三 (上海锦天城合伙人)"
              className="w-full bg-[#111] border border-slate-800 rounded p-3 text-sm focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs bg-red-950/30 p-3 rounded border border-red-900">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-slate-100 text-black font-bold py-3 rounded hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Zap className="w-4 h-4 animate-pulse" /> : <ShieldCheck className="w-4 h-4" />}
            {isLoading ? '正在熔铸暗金码...' : '签发最高权限通行证'}
          </button>

          {resultCode && (
            <div className="mt-6 p-4 border border-amber-900 bg-amber-950/20 rounded-lg animate-in fade-in slide-in-from-bottom-2">
              <p className="text-xs text-amber-500/70 mb-2">✅ 锻造成功！客户专属暗金码：</p>
              <div className="text-lg font-mono text-amber-400 font-bold tracking-widest break-all">
                {resultCode}
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full flex items-center justify-center gap-2 border border-amber-700/50 hover:bg-amber-900/30 text-amber-500 text-sm py-2 rounded transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? '已复制交付链接！' : '一键复制带参交付链接'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}