"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Terminal, ShieldAlert, AlertOctagon, Clock, CheckCircle, Crosshair, Loader2, ShieldCheck } from 'lucide-react';

export default function TribunalDashboard() {
  const [activeHighlight, setActiveHighlight] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isArbitrating, setIsArbitrating] = useState(false);

  // 📡 雷达巡航
  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const res = await fetch('/api/events');
        const json = await res.json();
        if (json.success && json.data) {
          setEventData(json.data);
        }
      } catch (error) {
        console.error("雷达连接失败", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestEvent();
    const interval = setInterval(fetchLatestEvent, 3000);
    return () => clearInterval(interval);
  }, []);

  // ⚖️ 核心杀手锏：最终仲裁按键逻辑
  const handleArbitration = async (action: 'APPROVED' | 'ROLLBACK') => {
    if (!eventData || !eventData.id) return;
    setIsArbitrating(true);
    try {
      const res = await fetch('/api/arbitrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: eventData.id, action })
      });
      const json = await res.json();
      if (json.success) {
        setEventData(json.data); // 瞬间更新大屏状态，产生暴击快感！
      }
    } catch (error) {
      console.error("仲裁请求失败", error);
    } finally {
      setIsArbitrating(false);
    }
  };

  const handleTraceSource = () => {
    setActiveHighlight(true);
    setTimeout(() => setActiveHighlight(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-4 flex flex-col">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-amber-500 w-6 h-6" />
          <h1 className="text-xl font-bold tracking-widest text-slate-100">ONE TRIBUNAL <span className="text-xs text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded ml-2">v5.0</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-amber-400 font-mono">
            李律 (高级合伙人) | 权限: L0
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 左栏：契约意志 */}
        <div className="flex flex-col border border-slate-800 bg-[#0A0A0A] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">契约意志 (Legal Source)</h2>
          </div>
          <div className="p-6 text-sm leading-relaxed text-slate-400 font-serif overflow-y-auto">
            <p className="mb-4"><span className="font-bold text-slate-300">《数据跨境传输合规协议》</span><br/>第 3.2 条：乙方在处理核心交易数据时，必须采取必要的技术脱敏手段...</p>
            <div className={`p-2 transition-all duration-500 border-l-2 ${activeHighlight ? 'bg-amber-950/40 border-amber-500 text-amber-200' : 'border-transparent'}`}>
              <span className="font-bold">⚠️ GDPR 附则参考 (EU-2016/679)：</span><br/>严禁未经授权的单方面越权发布，必须经过双钥数字签名验证。
            </div>
          </div>
        </div>

        {/* 中栏：法典锻造 */}
        <div className="flex flex-col border border-slate-800 bg-[#0A0A0A] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">法典锻造 (AST Pipeline)</h2>
          </div>
          <div className="p-4 font-mono text-xs text-emerald-500/70 overflow-y-auto flex-1 bg-black">
            {isLoading ? (
              <div className="flex items-center gap-2 text-emerald-500 animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> 等待雷达信号接入...</div>
            ) : !eventData ? (
              <div className="text-slate-500">&gt; 雷达静默，当前无拦截事件。</div>
            ) : (
              <>
                <p className="mb-1 text-slate-500">&gt; Intercepting Webhook from {eventData.repoName}...</p>
                <p className="mb-1 text-slate-500">&gt; Fetching PR #{eventData.prNumber} diff...</p>
                <p className="mb-1">&gt; Compiling AST structures...</p>
                <p className="mb-4">&gt; SHA-256 Blind Hash: <span className="text-amber-500">{eventData.violationHash}</span></p>
                <p className="mb-1 text-slate-500">// 底层源码特征</p>
                <p className="mb-1 text-red-400">&gt; 触发合规熔断：{eventData.reason}</p>
                {eventData.status === 'OVERRIDDEN' && <p className="mt-4 text-amber-500 animate-pulse">&gt; [WARN] CTO 触发越权豁免，等待最高仲裁...</p>}
                {eventData.status === 'APPROVED' && <p className="mt-4 text-emerald-500">&gt; [OK] 李律已追认，合规阻断解除。管道放行！</p>}
                {eventData.status === 'ROLLBACK' && <p className="mt-4 text-red-500 font-bold">&gt; [FATAL] 仲裁驳回！执行物理阻断并抄送 CEO。</p>}
              </>
            )}
          </div>
        </div>

        {/* 右栏：虎符仲裁 */}
        <div className="flex flex-col border border-slate-800 bg-[#0A0A0A] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">虎符仲裁 (Arbitration)</h2>
          </div>
          <div className="p-4 flex flex-col gap-4">
            
            {eventData ? (
              <>
                <div className="border border-red-900/50 bg-red-950/20 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-red-500 font-bold text-sm flex items-center gap-2">
                      <Crosshair className="w-4 h-4" /> 拦截：代码仓库越权
                    </h3>
                    <span className="text-xs bg-red-900/50 text-red-200 px-2 py-0.5 rounded">PR #{eventData.prNumber}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    <span className="text-slate-500">提交人:</span> {eventData.author} | <span className="text-slate-500">分支:</span> {eventData.branch}
                  </p>
                  <button onClick={handleTraceSource} className="mt-2 w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded flex justify-center items-center gap-2 transition-colors">
                    <FileText className="w-3 h-3" /> 点击溯源法理依据
                  </button>
                </div>

                {/* 状态 1：倒计时炸弹 (CTO 越权中) */}
                {eventData.status === 'OVERRIDDEN' && (
                  <div className="border border-amber-900/50 bg-amber-950/20 p-4 rounded-lg mt-auto animate-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-amber-500 font-bold text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-pulse" /> 待决状态：CTO 越权放行
                      </h3>
                    </div>
                    <p className="text-xs text-amber-200/70 mb-3">研发负责人已行使【紧急破窗权】。该豁免属于“缓期执行”。</p>
                    <div className="flex items-center gap-2 bg-black/50 p-2 rounded mb-4 border border-amber-900/30">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[95%] animate-pulse"></div>
                      </div>
                      <span className="text-xs font-mono text-amber-400 font-bold">剩余: 23h 59m</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleArbitration('APPROVED')} disabled={isArbitrating} className="py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-500 border border-emerald-900 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1 disabled:opacity-50">
                        <CheckCircle className="w-3 h-3" /> 追认合规
                      </button>
                      <button onClick={() => handleArbitration('ROLLBACK')} disabled={isArbitrating} className="py-2 bg-red-950 hover:bg-red-900 text-red-500 border border-red-900 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1 disabled:opacity-50">
                        <AlertOctagon className="w-3 h-3" /> 勒令回滚
                      </button>
                    </div>
                  </div>
                )}

                {/* 状态 2：合法豁免 (已追认) */}
                {eventData.status === 'APPROVED' && (
                  <div className="border border-emerald-900/50 bg-emerald-950/20 p-4 rounded-lg mt-auto animate-in zoom-in-95">
                    <h3 className="text-emerald-500 font-bold text-sm flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4" /> 危机解除：已合法豁免
                    </h3>
                    <p className="text-xs text-emerald-200/70">李律已于今日行使合规豁免权，代码 PR #{eventData.prNumber} 允许放行入库。全套审计日志已存证闭环。</p>
                  </div>
                )}

                {/* 状态 3：强制熔断 (已回滚) */}
                {eventData.status === 'ROLLBACK' && (
                  <div className="border border-red-900/50 bg-red-950/20 p-4 rounded-lg mt-auto animate-in zoom-in-95">
                    <h3 className="text-red-500 font-bold text-sm flex items-center gap-2 mb-2">
                      <AlertOctagon className="w-4 h-4" /> 仲裁否决：已勒令回滚
                    </h3>
                    <p className="text-xs text-red-200/70">李律已驳回 CTO 的越权操作。CI/CD 流水线已被物理切断，请研发团队立即整改代码！</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-8 text-slate-600 border border-dashed border-slate-800 rounded">暂无高危待办事项</div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}