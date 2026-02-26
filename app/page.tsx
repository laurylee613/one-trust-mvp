"use client";

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Shield, FileText, ChevronDown, ChevronUp, Lock, AlertTriangle, Loader2, Scale, Terminal } from 'lucide-react';

// ==========================================
// 🚨 Dify API 与环境配置
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

// 🎨 防截断常量区
const BG_PATTERN_RED = "url('data:image/svg+xml;base64," +
  "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h" +
  "0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMjAgMjBMMCAwSDQwTDIwIDIwWk" +
  "0yMCAyMEw0MCA0MEgwTDIwIDIwWiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiL" +
  "z48L3N2Zz4=')";

const BG_PATTERN_GOLD_L = "url('data:image/svg+xml;base64," +
  "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h" +
  "0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMTAgMTBMNDAgNDBIMTBWMTBaIi" +
  "BmaWxsPSIjRkZEMzAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')";

const BG_PATTERN_GOLD_R = "url('data:image/svg+xml;base64," +
  "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h" +
  "0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMzAgMzBMMCAwSDMwVjMwWiIgZm" +
  "lsbD0iI0ZGRDMwMCIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')";

// 🐅 核心图腾：左半边虎符
const TallyHalfLeft = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 2.2.73 4.23 1.95 5.85L11 12l1-1.5V2.25z" />
  </svg>
);

// 🐅 核心图腾：右半边虎符
const TallyHalfRight = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 0 12 24" fill="currentColor" className={className} style={style}>
    <path d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75 0-2.2-.73-4.23-1.95-5.85L13 12l-1 1.5v8.25z" />
  </svg>
);


// ✨ 核心视觉：钻石级动效存证印章组件
const AnimatedSeal = ({ hash, index }: { hash: string, index: number }) => {
  const [hasImpacted, setHasImpacted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 预加载音效，避免延迟
    audioRef.current = new Audio('/kada.mp3');
    audioRef.current.volume = 0.8;

    // 级联延迟：根据第几条规则，延迟不同的时间，形成“咔哒、咔哒”的连击感
    const impactTimer = setTimeout(() => {
      setHasImpacted(true);
      // 触发音效
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.warn("音效可能因浏览器自动播放策略被拦截，请确保用户已发生交互(点击上传)。", e));
      }
    }, index * 250 + 400); // 400ms 是等待卡片滑入的时间，250ms 是间隔

    return () => clearTimeout(impactTimer);
  }, [index]);

  return (
    <div className="flex flex-col items-center ml-8 mt-4 pt-3 border-t border-slate-800/60 relative">
      
      {/* 🚀 注入专属的 CSS 关键帧，隔离于全局 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideLeftHalf { 0% { transform: translateX(-15px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes slideRightHalf { 0% { transform: translateX(15px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes impactGlow { 0% { box-shadow: 0 0 0px 0px rgba(217,119,6,0); } 30% { box-shadow: 0 0 25px 10px rgba(217,119,6,0.9); } 100% { box-shadow: 0 0 5px 2px rgba(217,119,6,0.3); } }
        @keyframes stampDown { 0% { transform: scale(1.8) rotate(-15deg); opacity: 0; } 50% { transform: scale(0.9) rotate(-2deg); opacity: 1; } 100% { transform: scale(1) rotate(-2deg); opacity: 1; } }
        @keyframes breatheRed { 0%, 100% { filter: drop-shadow(0 0 2px rgba(225,29,72,0.5)); } 50% { filter: drop-shadow(0 0 8px rgba(225,29,72,0.9)); } }
      `}} />

      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
           <span className="text-[10px] text-amber-600/60 font-serif mb-1">【司法链哈希存证】</span>
           <div className="font-mono text-[10px] text-slate-500 w-48 truncate" title={hash}>{hash}</div>
        </div>
        
        {/* 动画区域引擎 */}
        <div className="flex flex-col items-center justify-center relative w-32 h-16">
          
          {/* 上半部：合符碰撞区 */}
          <div className="absolute top-0 flex items-center justify-center">
             {/* 撞击爆发的青铜金光晕 (Impact Glow) */}
             <div className="absolute w-4 h-4 rounded-full" 
                  style={{ animation: hasImpacted ? 'impactGlow 1s ease-out forwards' : 'none' }}>
             </div>

             {/* 左半符：滑入 */}
             <TallyHalfLeft 
                className="w-4 h-4 text-amber-600/80 z-10" 
                style={{ 
                  animation: hasImpacted ? 'slideLeftHalf 0.15s cubic-bezier(0.4, 0, 1, 1) forwards' : 'breatheRed 2s infinite',
                  transform: hasImpacted ? 'translateX(0)' : 'translateX(-8px)'
                }} 
             />
             {/* 右半符：滑入 */}
             <TallyHalfRight 
                className="w-4 h-4 text-amber-600/80 z-10 -ml-[1px]" 
                style={{ 
                  animation: hasImpacted ? 'slideRightHalf 0.15s cubic-bezier(0.4, 0, 1, 1) forwards' : 'breatheRed 2s infinite',
                  transform: hasImpacted ? 'translateX(0)' : 'translateX(8px)'
                }} 
             />
          </div>

          {/* 下半部：[司法链已固化] 红色印章重击盖下 */}
          {hasImpacted && (
            <div 
              className="absolute bottom-1 border-2 border-rose-900/60 bg-rose-950/40 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(225,29,72,0.2)]"
              style={{ animation: 'stampDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
            >
               <span className="text-[9px] text-rose-500 font-serif font-bold tracking-widest">司法链已固化</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ... (以下部分保持 V2.1 的完美原样，只需替换虎符大屏的 rule 映射部分)
const TigerTallyStatus = ({ status, ruleCount }: { status: string, ruleCount: number }) => {
  // 保持原有大屏动画不变
  const isThinking = status === 'thinking' || status === 'uploading';
  const isComplete = status === 'complete';
  const isError = status === 'error'; 
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

  if (isError) {
    return (
        <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/50 animate-pulse z-0" style={{ animationDuration: '2s' }}></div>
            <div className="relative z-10 flex flex-col items-center">
                <AlertTriangle className="w-16 h-16 text-slate-600 mb-6 drop-shadow-[0_0_10px_rgba(71,85,105,0.5)]" />
                <h2 className="text-2xl font-serif font-bold text-slate-400 tracking-[0.2em] mb-2">契约提取失败 · 强制熔断</h2>
                <p className="text-slate-500 font-mono text-sm tracking-widest">FAIL-CLOSED PROTOCOL ENGAGED</p>
            </div>
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
                        <div 
                          className={"absolute left-0 w-1/2 h-full bg-gradient-to-br from-rose-900 via-red-800 " + 
                                     "to-rose-950 rounded-l-full border-r-2 border-rose-500/50 animate-in " + 
                                     "slide-in-from-right-10 fade-out duration-1000 fill-mode-forwards"}
                          style={{ transform: 'translateX(-25px) rotate(-10deg)', boxShadow: 'inset 0 0 20px rgba(225, 29, 72, 0.4)' }}
                        >
                           <div className="absolute inset-0 opacity-30" style={{ backgroundImage: BG_PATTERN_RED }}></div>
                        </div>
                        <div 
                          className={"absolute right-0 w-1/2 h-full bg-gradient-to-bl from-rose-900 via-red-800 " + 
                                     "to-rose-950 rounded-r-full border-l-2 border-rose-500/50 animate-in " + 
                                     "slide-in-from-left-10 fade-out duration-1000 fill-mode-forwards"}
                          style={{ transform: 'translateX(25px) rotate(10deg)', boxShadow: 'inset 0 0 20px rgba(225, 29, 72, 0.4)' }}
                        >
                           <div className="absolute inset-0 opacity-30" style={{ backgroundImage: BG_PATTERN_RED }}></div>
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
                        <div 
                          className={"w-24 h-full bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-800 " + 
                                     "rounded-l-full border-r border-amber-300/50 animate-in slide-in-from-left-full " + 
                                     "duration-1000 fill-mode-forwards z-10 shadow-[inset_0_0_20px_rgba(217,119,6,0.4)]"}
                        >
                           <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: BG_PATTERN_GOLD_L }}></div>
                        </div>
                        <div 
                          className={"w-24 h-full bg-gradient-to-l from-yellow-700 via-amber-600 to-yellow-800 " + 
                                     "rounded-r-full border-l border-amber-300/50 animate-in slide-in-from-right-full " + 
                                     "duration-1000 fill-mode-forwards z-10 shadow-[inset_0_0_20px_rgba(217,119,6,0.4)] -ml-[1px]"}
                        >
                           <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: BG_PATTERN_GOLD_R }}></div>
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

      const textOutput = runData.data.outputs.text;
      
      if (!textOutput || textOutput === "ERROR_LLM_EMPTY" || textOutput === "ERROR_LLM_MALFORMED") {
         throw new Error("契约法理特征提取失败。深海引擎未返回有效卷宗，为防止漏判，已触发强制物理熔断！");
      }

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
        
        {/* 第一屏：收纳处 */}
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

        {/* 第二屏：锻造炉 */}
        <div className="bg-[#03070C] border border-amber-900/20 rounded-xl p-6 flex flex-col relative shadow-[0_0_40px_rgba(217,119,6,0.03)] overflow-hidden">
          <h2 className="text-lg font-serif font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-600"/> 法典锻造炉 (The Legislative Forge)
          </h2>
          <div className="flex-1 bg-black/80 border border-slate-800/80 rounded-lg font-mono text-sm flex flex-col relative overflow-hidden">
            
            {(status !== 'idle') && (
              <div className="bg-gradient-to-r from-slate-900/95 to-black border-b border-amber-900/40 p-3 px-4 flex items-center gap-3 sticky top-0 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <Scale className="w-4 h-4 text-amber-500" />
                <span className="font-serif font-bold text-amber-400 text-[13px] tracking-widest">
                  {status === 'complete' 
                    ? `[ 仲裁纪要 ] 成功提取 ${verdictRules.length} 条法定红线规则，已生成物理拦截网并固化至司法链。`
                    : status === 'error'
                    ? '[ 仲裁纪要 ] 仲裁程序异常中断，系统已执行安全物理熔断。'
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

        {/* 第三屏：仲裁庭 */}
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

                    <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-900 to-red-800 text-slate-100 text-[10px] font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-[0_2px_10px_rgba(225,29,72,0.4)] rounded-bl-lg border-b border-l border-rose-500/30">
                      <Scale className="w-3 h-3 text-rose-300" /> 裁定违规 (Ruling: Violation)
                    </div>
                    
                    <div className="p-4 pt-5 pb-2">
                      <div className="flex items-start gap-3 mb-3 pr-24">
                        <div className="mt-1">
                          <AlertTriangle className="w-5 h-5 text-rose-600 drop-shadow-[0_0_5px_rgba(225,29,72,0.5)]" />
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
                      
                      {/* 💎 钻石级植入：动态合符与盖章区域 */}
                      <AnimatedSeal hash={rule.metadata?.sha256_fingerprint || "0xNULL"} index={idx} />
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