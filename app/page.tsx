"use client";

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Shield, FileText, ChevronDown, ChevronUp, Lock, AlertTriangle, Loader2, Scale, Terminal } from 'lucide-react';

// ==========================================
// 🚨 指挥官，请在这里填入您的真实弹药库钥匙！
// ==========================================
const DIFY_API_URL = "https://api.oneplatform.com.cn/v1"; 

const MOCK_THINKING = `[仲裁庭纪要] 契约已呈递...
[天眼网络] 建立司法级加密通道...
[虎符引擎] 启动条款研判与法理核查...
<thinking>
拆解法言法语，锚定合规实体...
规避免责条款陷阱，锁定绝对义务...
</thinking>
[锻造炉] 熔铸 AST 物理熔断逻辑...
[存证库] 提取青铜金哈希，固化司法链条...
`;

// 🐅 核心图腾：微缩版完整虎符 (通过状态)
const MiniTigerTallyPassIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.763 9.41c.123-.162.253-.32.389-.474a7.56 7.56 0 01-.215-2.467c.419.16.846.303 1.276.433a5.837 5.837 0 01.774 1.96c.491.41.994.806 1.51 1.187a6.627 6.627 0 00.593-3.492c.47.248.944.48 1.423.7a4.947 4.947 0 01-1.31 1.994 11.4 11.4 0 012.58 1.132c-.348.445-.68.904-1 1.376-.427-.069-.857-.13-1.287-.184a6.263 6.263 0 00-.935-2.274 5.03 5.03 0 01-1.645 1.231c-.306.566-.63 1.121-.97 1.666.546.17 1.096.327 1.648.47a4.89 4.89 0 01-1.375 2.086 10.25 10.25 0 012.656.874c-.408.492-.797.998-1.17 1.517-.47-.15-.938-.31-1.404-.477a6.766 6.766 0 00-1.078-2.532 4.788 4.788 0 01-1.52 1.232c-.368.478-.753.942-1.154 1.391.482.333.981.644 1.492.935-.447.438-.877.89-1.288 1.354a11.88 11.88 0 012.32 1.101c-.242.256-.482.516-.718.78a8.2 8.2 0 00-2.148-1.034 6.15 6.15 0 01-1.382 1.617c-.044.05-.087.1-.13.151a9.75 9.75 0 01-1.865-1.023 6.188 6.188 0 001.36-1.613c-.16-.094-.32-.191-.479-.29a8.08 8.08 0 01-2.131-1.012 5.98 5.98 0 001.343-1.594c-.349-.318-.694-.647-1.032-.985.077-.107.153-.215.23-.322z" clipRule="evenodd" />
  </svg>
);

// 🐅 核心图腾：微缩版断裂虎符 (阻断状态)
const MiniTigerTallyBlockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 2.2.73 4.23 1.95 5.85L11 12l-2-3 3-4 1.5-2.5z" />
      <path d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75 0-2.2-.73-4.23-1.95-5.85L13 12l2 3-3 4-1.5-2.5z" opacity="0.6"/>
    </svg>
);

// 🐅 核心视觉——虎符动态状态组件
const TigerTallyStatus = ({ status, ruleCount }: { status: string, ruleCount: number }) => {
  const isThinking = status === 'thinking' || status === 'uploading';
  const isComplete = status === 'complete';
  const hasThreats = ruleCount > 0;

  if (isThinking) {
    return (
        <div className="h-full flex flex-col items-center justify-center animate-pulse">
            <div className="w-24 h-24 rounded-full border-4 border-t-amber-500 border-amber-900/30 animate-spin mb-6 relative blur-[1px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent bg-blend-overlay"></div>
            </div>
            <div className="text-amber-500 font-serif text-lg tracking-widest">提取铭文 · 虚影聚形...</div>
            <div className="text-slate-500 text-xs mt-2 font-mono">MANIFESTING TALLY ESSENCE...</div>
        </div>
    );
  }

  if (isComplete) {
    if (hasThreats) {
        return (
            <div className="h-full flex flex-col items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-rose-950/20 animate-pulse z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-8">
                        <div className="absolute left-0 w-1/2 h-full bg-gradient-to-br from-rose-900 via-red-800 to-rose-950 rounded-l-full border-r-2 border-rose-500/50 animate-in slide-in-from-right-10 fade-out duration-1000 fill-mode-forwards" style={{ transform: 'translateX(-25px) rotate(-10deg)', boxShadow: 'inset 0 0 20px rgba(225, 29, 72, 0.4)' }}>
                           <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMjAgMjBMMCAwSDQwTDIwIDIwWk0yMCAyMEw0MCA0MEgwTDIwIDIwWiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
                        </div>
                        <div className="absolute right-0 w-1/2 h-full bg-gradient-to-bl from-rose-900 via-red-800 to-rose-950 rounded-r-full border-l-2 border-rose-500/50 animate-in slide-in-from-left-10 fade-out duration-1000 fill-mode-forwards" style={{ transform: 'translateX(25px) rotate(10deg)', boxShadow: 'inset 0 0 20px rgba(225, 29, 72, 0.4)' }}>
                           <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMjAgMjBMMCAwSDQwTDIwIDIwWk0yMCAyMEw0MCA0MEgwTDIwIDIwWiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
                        </div>
                        <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-rose-500 animate-ping" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-rose-500 tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(225,29,72,0.6)]">兵符不合 · 驳回部署</h2>
                    <p className="text-rose-800/70 font-mono text-sm tracking-widest">DEPLOYMENT VETOED</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-600/10 animate-pulse z-0" style={{ animationDuration: '4s' }}></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-8 flex justify-center items-center">
                        <div className="absolute inset-0 bg-amber-600/20 blur-2xl rounded-full animate-pulse"></div>
                        <div className="w-24 h-full bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 rounded-l-full border-r border-amber-300/50 animate-in slide-in-from-left-full duration-1000 fill-mode-forwards z-10 shadow-[inset_0_0_20px_rgba(217,119,6,0.4)]">
                           <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMTAgMTBMNDAgNDBIMTBWMTBaIiBmaWxsPSIjRkZEMzAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')]"></div>
                        </div>
                        <div className="w-24 h-full bg-gradient-to-l from-yellow-700 via-amber-600 to-yellow-800 rounded-r-full border-l border-amber-300/50 animate-in slide-in-from-right-full duration-1000 fill-mode-forwards z-10 shadow-[inset_0_0_20px_rgba(217,119,6,0.4)] -ml-[1px]">
                           <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMzAgMzBMMCAwSDMwVjMwWiIgZmlsbD0iI0ZGRDMwMCIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')]"></div>
                        </div>
                        <Shield className="absolute w-16 h-16 text-amber-200 animate-in zoom-in duration-500 delay-1000 fill-mode-forwards z-20 drop-shadow-[0_0_15px_rgba(253,230,138,0.8)]" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-[0.2em] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">合符成功 · 准予出征</h2>
                    <p className="text-amber-600/70 font-mono text-sm tracking-widest">AUTHORIZED BY TRIBUNAL</p>
                </div>
            </div>
        );
    }
  }

  return (
    <div className="h-full flex items-center justify-center text-slate-600 font-serif text-sm border-2 border-dashed border-slate-800 rounded-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      呈递契约以候仲裁...
    </div>
  );
};

export default function OneTrustDashboard() {
  const [status, setStatus] = useState('idle'); 
  const [terminalText, setTerminalText] = useState('');
  const [verdictRules, setVerdictRules] = useState<any[]>([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [expandedRules, setExpandedRules] = useState<Set<number>>(new Set()); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'thinking' || status === 'uploading') {
      let i = 0;
      setTerminalText('');
      const timer = setInterval(() => {
        if (i < MOCK_THINKING.length) {
          setTerminalText((prev) => prev + MOCK_THINKING.charAt(i));
          i++;
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [status]);

  const handleDropzoneClick = () => {
    if (status === 'idle' || status === 'error' || status === 'complete') {
      fileInputRef.current?.click();
    }
  };

  const toggleRule = (idx: number) => {
    setExpandedRules(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setStatus('uploading');
    setVerdictRules([]);
    setExpandedRules(new Set());

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', 'one-trust-admin');

      const uploadRes = await fetch(`${DIFY_API_URL}/files/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error('File upload failed.');
      const uploadData = await uploadRes.json();

      setStatus('thinking');

      const runRes = await fetch(`${DIFY_API_URL}/workflows/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs: {
            "document_input": {
              "type": "document",
              "transfer_method": "local_file",
              "upload_file_id": uploadData.id
            }
          },
          response_mode: "blocking",
          user: "one-trust-admin"
        })
      });
      
      if (!runRes.ok) throw new Error('Workflow execution failed.');
      const runData = await runRes.json();

      const textOutput = runData.data.outputs.text || "[]";
      const parsedRules = typeof textOutput === 'string' ? JSON.parse(textOutput) : textOutput;
      
      setVerdictRules(parsedRules);
      setTerminalText(prev => prev + `\n[仲裁完毕] 锁定 ${parsedRules.length} 处违规命门。`);
      setStatus('complete');

    } catch (error: any) {
      console.error(error);
      setTerminalText(prev => prev + `\n[系统异常] ${error.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans p-6 selection:bg-amber-500/30">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Scale className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-serif font-bold tracking-widest text-slate-100">
            ONE <span className="text-amber-500">TRIBUNAL</span> 
            <span className="text-xs text-slate-500 font-mono tracking-normal ml-3 border border-slate-700 px-2 py-0.5 rounded-sm">虎符行动 v2.1</span>
          </h1>
        </div>
        <div className="text-xs font-mono text-amber-600/60 flex items-center gap-2">
          {status === 'thinking' && <Loader2 className="w-3 h-3 animate-spin text-amber-500"/>}
          STATUS: {status.toUpperCase()}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 h-[85vh] min-w-[1200px] overflow-x-auto">
        
        {/* 第一屏：契约收纳处 */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
          <h2 className="text-lg font-serif font-bold text-slate-200 mb-4 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-amber-600"/> 契约收纳处 (Contract Intake)
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-serif">呈递商业协议或 SOW 文本，平台将依法理准则执行自动化合规仲裁。</p>
          
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" />
          
          <div 
            onClick={handleDropzoneClick}
            className={`flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${(status === 'idle' || status === 'complete' || status === 'error') ? 'border-amber-900/40 hover:border-amber-600 hover:bg-amber-950/20' : 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed'}`}
          >
            <FileText className={`w-12 h-12 mb-4 ${(status === 'idle' || status === 'complete') ? 'text-amber-700' : 'text-slate-700'}`} />
            <span className="text-sm font-serif text-center px-4 tracking-wider">
              {status === 'idle' && '点击或拖拽呈递卷宗\n[ 支持 PDF / Word ]'}
              {status === 'uploading' && `卷宗上传中: ${selectedFileName}...`}
              {status === 'thinking' && `法理研判中: ${selectedFileName}...`}
              {status === 'complete' && `[ ${selectedFileName} 仲裁完毕 ]\n点击呈递新卷宗`}
              {status === 'error' && '[ 呈递失败 ]\n点击重试'}
            </span>
          </div>
        </div>

        {/* 第二屏：法典锻造炉 */}
        <div className="bg-[#03070C] border border-amber-900/20 rounded-xl p-6 flex flex-col relative shadow-[0_0_40px_rgba(217,119,6,0.03)] overflow-hidden">
          <h2 className="text-lg font-serif font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-600"/> 法典锻造炉 (The Legislative Forge)
          </h2>
          <div className="flex-1 bg-black/80 border border-slate-800/80 rounded-lg font-mono text-sm flex flex-col relative overflow-hidden">
            
            {/* ✅ 任务三：仲裁人话版摘要 (The Executive Summary) */}
            {(status !== 'idle') && (
              <div className="bg-gradient-to-r from-slate-900/95 to-black border-b border-amber-900/40 p-3 px-4 flex items-center gap-3 sticky top-0 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <Scale className="w-4 h-4 text-amber-500" />
                <span className="font-serif font-bold text-amber-400 text-[13px] tracking-widest">
                  {status === 'complete' 
                    ? `[ 仲裁纪要 ] 成功提取 ${verdictRules.length} 条法定红线规则，已生成物理拦截网并固化至司法链。`
                    : status === 'error'
                    ? '[ 仲裁纪要 ] 仲裁程序异常中断，请检查天眼网络。'
                    : '[ 仲裁纪要 ] 正在同步提取法定红线，请稍候...'}
                </span>
              </div>
            )}
            
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              {status === 'idle' && <span className="text-slate-700">Awaiting Contract Submission...</span>}
              <pre className={`whitespace-pre-wrap leading-relaxed ${status === 'error' ? 'text-rose-500' : 'text-amber-500/70'}`}>
                {terminalText}
                {(status === 'thinking' || status === 'uploading') && <span className="animate-pulse">_</span>}
              </pre>
            </div>
          </div>
        </div>

        {/* 第三屏：虎符仲裁庭 */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-rose-900/5 pointer-events-none"></div>
          
          <h2 className="text-lg font-serif font-bold text-slate-200 mb-4 flex items-center gap-2 relative z-10">
            <Scale className={`w-5 h-5 ${status === 'complete' && verdictRules.length > 0 ? 'text-rose-600' : 'text-amber-600'}`}/> 
            {status === 'complete' && verdictRules.length > 0 ? '虎符仲裁庭 (The Tribunal)' : '兵符验合区 (Tally Verification)'}
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative z-10">
            {status === 'complete' && verdictRules.length > 0 ? (
              verdictRules.map((rule, idx) => {
                const isExpanded = expandedRules.has(idx);
                return (
                  <div key={idx} className="bg-[#0A0F18] border border-rose-900/40 rounded-lg relative overflow-hidden transition-all duration-500 animate-in slide-in-from-right-4 fade-in" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
                    
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-700"></div>

                    {/* ✅ 任务一：词汇法理化 (裁定违规) */}
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-900 to-red-800 text-slate-100 text-[10px] font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-[0_2px_10px_rgba(225,29,72,0.4)] rounded-bl-lg border-b border-l border-rose-500/30">
                      <Scale className="w-3 h-3 text-rose-300" /> 裁定违规 (Ruling: Violation)
                    </div>
                    
                    <div className="p-4 pt-5">
                      <div className="flex items-start gap-3 mb-3 pr-24">
                        <div className="mt-1">
                          <MiniTigerTallyBlockIcon className="w-5 h-5 text-rose-600 drop-shadow-[0_0_5px_rgba(225,29,72,0.5)]" />
                        </div>
                        <div>
                           <div className="text-slate-500 font-mono text-xs mb-1">法条代号: {rule.rule_id}</div>
                           <div className="text-slate-200 font-serif font-bold text-[15px] leading-relaxed">{rule.content}</div>
                        </div>
                      </div>

                      <button 
                        onClick={() => toggleRule(idx)}
                        className="flex items-center gap-1 text-[11px] text-amber-600/70 hover:text-amber-500 font-mono transition-colors ml-8 mb-2"
                      >
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        {isExpanded ? '收起底层熔断指令' : '查阅底层熔断指令 (AST/Regex)'}
                      </button>

                      {isExpanded && (
                        <div className="ml-8 bg-black/60 border border-slate-800 rounded p-3 mb-3 animate-in slide-in-from-top-2 fade-in duration-200">
                          <div className="text-[10px] text-slate-500 font-mono mb-2 border-b border-slate-800 pb-1">// COMPILED AST MACHINE LOGIC</div>
                          <div className="text-amber-500/80 font-mono text-xs break-all leading-relaxed">
                            <span className="text-slate-500">Target   : </span> {rule.machine_logic?.target}<br/>
                            <span className="text-slate-500">Operator : </span> {rule.machine_logic?.operator}<br/>
                            <span className="text-slate-500">Value    : </span> 
                            <span className="text-rose-400/80">{Array.isArray(rule.machine_logic?.value) ? rule.machine_logic.value.join(' | ') : rule.machine_logic?.value}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between ml-8">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-amber-600/60 font-serif mb-1">【司法链哈希存证】</span>
                           <div className="font-mono text-[10px] text-slate-500 w-48 truncate" title={rule.metadata?.sha256_fingerprint}>
                             {rule.metadata?.sha256_fingerprint}
                           </div>
                        </div>
                        
                        {/* ✅ 任务二：图腾具象化 (红光闪烁的断裂虎符与封泥) */}
                        <div className="border-2 border-rose-900/60 bg-rose-950/40 px-2.5 py-1.5 rounded flex items-center gap-1.5 transform -rotate-2 relative overflow-hidden group shadow-[0_0_10px_rgba(225,29,72,0.1)]">
                           <div className="absolute inset-0 bg-rose-500/10 animate-pulse duration-1000"></div>
                           {/* 动态断裂虎符图标闪烁红光 */}
                           <MiniTigerTallyBlockIcon className="w-4 h-4 text-rose-500 drop-shadow-[0_0_8px_rgba(225,29,72,0.8)] animate-pulse" />
                           <span className="text-[10px] text-rose-500 font-serif font-bold tracking-widest relative z-10">司法链已固化</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <TigerTallyStatus status={status} ruleCount={verdictRules.length} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}