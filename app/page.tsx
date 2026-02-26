"use client";

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Shield, FileText, Terminal, Crosshair, Lock, AlertTriangle, Loader2 } from 'lucide-react';



// ==========================================
// 🐅 虎符行动：新增核心视觉组件定义
// ==========================================

// 任务三：微缩版“金色小虎符”图标 (替换 Lock 图标)
const MiniTigerTallyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.763 9.41c.123-.162.253-.32.389-.474a7.56 7.56 0 01-.215-2.467c.419.16.846.303 1.276.433a5.837 5.837 0 01.774 1.96c.491.41.994.806 1.51 1.187a6.627 6.627 0 00.593-3.492c.47.248.944.48 1.423.7a4.947 4.947 0 01-1.31 1.994 11.4 11.4 0 012.58 1.132c-.348.445-.68.904-1 1.376-.427-.069-.857-.13-1.287-.184a6.263 6.263 0 00-.935-2.274 5.03 5.03 0 01-1.645 1.231c-.306.566-.63 1.121-.97 1.666.546.17 1.096.327 1.648.47a4.89 4.89 0 01-1.375 2.086 10.25 10.25 0 012.656.874c-.408.492-.797.998-1.17 1.517-.47-.15-.938-.31-1.404-.477a6.766 6.766 0 00-1.078-2.532 4.788 4.788 0 01-1.52 1.232c-.368.478-.753.942-1.154 1.391.482.333.981.644 1.492.935-.447.438-.877.89-1.288 1.354a11.88 11.88 0 012.32 1.101c-.242.256-.482.516-.718.78a8.2 8.2 0 00-2.148-1.034 6.15 6.15 0 01-1.382 1.617c-.044.05-.087.1-.13.151a9.75 9.75 0 01-1.865-1.023 6.188 6.188 0 001.36-1.613c-.16-.094-.32-.191-.479-.29a8.08 8.08 0 01-2.131-1.012 5.98 5.98 0 001.343-1.594c-.349-.318-.694-.647-1.032-.985.077-.107.153-.215.23-.322z" clipRule="evenodd" />
  </svg>
)

// 任务二：核心视觉——虎符化状态组件 (The Tally Core)
const TigerTallyStatus = ({ status, ruleCount }: { status: string, ruleCount: number }) => {
  const isThinking = status === 'thinking' || status === 'uploading';
  const isComplete = status === 'complete';
  const hasThreats = ruleCount > 0;

  if (isThinking) {
    return (
        <div className="h-full flex flex-col items-center justify-center animate-pulse">
            {/* 青铜纹理的加载态 */}
            <div className="w-24 h-24 rounded-full border-4 border-t-cyan-500 border-cyan-900/30 animate-spin mb-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent bg-blend-overlay"></div>
            </div>
            <div className="text-cyan-500 font-mono text-lg tracking-widest">兵符铸造中...</div>
            <div className="text-slate-500 text-xs mt-2 font-mono">FORGING TIGER TALLY AUTHORITY...</div>
        </div>
    );
  }

  if (isComplete) {
    if (hasThreats) {
        // 🟥 阻断状态 (BLOCK)：兵符炸裂
        return (
            <div className="h-full flex flex-col items-center justify-center overflow-hidden relative">
                {/* 炸裂的红光脉冲 */}
                <div className="absolute inset-0 bg-red-900/20 animate-pulse z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-8">
                         {/* 左半符 - 向左炸裂并旋转 */}
                        <div className="absolute left-0 w-1/2 h-full bg-gradient-to-br from-red-900 via-amber-900 to-red-950 rounded-l-full border-r-2 border-red-500/50 animate-in slide-in-from-right-10 fade-out duration-1000 fill-mode-forwards" style={{ transform: 'translateX(-20px) rotate(-15deg)', boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.5)' }}>
                           {/* 模拟青铜铭文纹理 */}
                           <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMjAgMjBMMCAwSDQwTDIwIDIwWk0yMCAyMEw0MCA0MEgwTDIwIDIwWiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
                        </div>
                        {/* 右半符 - 向右炸裂并旋转 */}
                        <div className="absolute right-0 w-1/2 h-full bg-gradient-to-bl from-red-900 via-amber-900 to-red-950 rounded-r-full border-l-2 border-red-500/50 animate-in slide-in-from-left-10 fade-out duration-1000 fill-mode-forwards" style={{ transform: 'translateX(20px) rotate(15deg)', boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.5)' }}>
                           <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMjAgMjBMMCAwSDQwTDIwIDIwWk0yMCAyMEw0MCA0MEgwTDIwIDIwWiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
                        </div>
                         {/* 中间炸裂的闪电/裂痕 */}
                        <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-red-500 animate-ping" />
                    </div>
                    <h2 className="text-3xl font-bold text-red-500 tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">兵符不合 · 禁止出征</h2>
                    <p className="text-red-800/70 font-mono text-sm tracking-widest">AUTHORIZATION DENIED</p>
                </div>
            </div>
        );
    } else {
        // 🟩 成功状态 (PASS)：合符成功
        return (
            <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                {/* 金光特效 */}
                <div className="absolute inset-0 bg-amber-500/10 animate-pulse z-0" style={{ animationDuration: '3s' }}></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-8 flex justify-center items-center">
                        {/* 金光底座 */}
                        <div className="absolute inset-0 bg-amber-500/30 blur-2xl rounded-full animate-pulse"></div>

                        {/* 左半符 - 从左侧滑入拼合 */}
                        <div className="w-24 h-full bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 rounded-l-full border-r border-amber-400/50 animate-in slide-in-from-left-full duration-1000 fill-mode-forwards z-10 shadow-[inset_0_0_20px_rgba(251,191,36,0.3)]">
                           {/* 模拟青铜篆体铭文纹理 */}
                           <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMTAgMTBMNDAgNDBIMTBWMTBaIiBmaWxsPSIjRkZEMzAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')]"></div>
                        </div>
                        {/* 右半符 - 从右侧滑入拼合 */}
                        <div className="w-24 h-full bg-gradient-to-l from-amber-700 via-yellow-600 to-amber-800 rounded-r-full border-l border-amber-400/50 animate-in slide-in-from-right-full duration-1000 fill-mode-forwards z-10 shadow-[inset_0_0_20px_rgba(251,191,36,0.3)] -ml-[1px]">
                           <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cGF0aCBkPSJNMzAgMzBMMCAwSDMwVjMwWiIgZmlsbD0iI0ZGRDMwMCIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')]"></div>
                        </div>
                        
                        {/* 合符瞬间的闪光点 */}
                        <Shield className="absolute w-16 h-16 text-amber-300 animate-in zoom-in duration-500 delay-1000 fill-mode-forwards z-20 drop-shadow-[0_0_15px_rgba(251,191,36,1)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 tracking-[0.2em] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">合符成功 · 准予出征</h2>
                    <p className="text-amber-500/70 font-mono text-sm tracking-widest">AUTHORIZED FOR DEPLOYMENT</p>
                </div>
            </div>
        );
    }
  }

  // 默认等待状态
  return (
    <div className="h-full flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-slate-800 rounded-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      AWAITING SOW PAYLOAD...
    </div>
  );
};



// ==========================================
// 🚨 指挥官，请在这里填入您的真实弹药库钥匙！
// ==========================================
const DIFY_API_URL = "https://api.oneplatform.com.cn/v1";   // 堡垒机代理路径


const MOCK_THINKING = `[SYSTEM INIT] Intercepting SOW payload...
[UPLINK] Establishing secure connection to Dify Forge...
[DARROW ENGINE] Parsing legal context...
<thinking>
Executing Tree-sitter AST extraction protocols...
Applying <context_exclude> shields against comment manipulation...
</thinking>
[FORGE] Compiling AST Machine Logic...
[VAULT] Waiting for Turing Coder to apply SHA-256 seals...
`;

export default function OneTrustDashboard() {
  const [status, setStatus] = useState('idle'); // idle, uploading, thinking, complete, error
  const [terminalText, setTerminalText] = useState('');
  const [verdictRules, setVerdictRules] = useState<any[]>([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 模拟打字机动画 (与真实网络请求并行，保持极客压迫感)
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

  // 物理触发器：点击区域打开文件选择
  const handleDropzoneClick = () => {
    if (status === 'idle' || status === 'error' || status === 'complete') {
      fileInputRef.current?.click();
    }
  };

  // 真实 Dify API 斩首逻辑
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setStatus('uploading');
    setVerdictRules([]);

    try {
      // 步骤 1: 将文件物理上传至 Dify
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', 'one-trust-admin');

      const uploadRes = await fetch(`${DIFY_API_URL}/files/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error('File upload failed. 检查API密钥或CORS。');
      const uploadData = await uploadRes.json();

      setStatus('thinking');

      // 步骤 2: 唤醒 Darrow 引擎进行 AST 降维打击
      const runRes = await fetch(`${DIFY_API_URL}/workflows/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            // 👇 卸下数组装甲，恢复最纯粹的单文件对象形态！
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

      // 步骤 3: 提取 Turing Python 节点打好钢印的 text
      const textOutput = runData.data.outputs.text || "[]";
      // 军工级安全解析：如果是字符串就 parse，如果已经是数组就直接用
      const parsedRules = typeof textOutput === 'string' ? JSON.parse(textOutput) : textOutput;
      
      setVerdictRules(parsedRules);
      setTerminalText(prev => prev + `\n[SUCCESS] ${parsedRules.length} AST Redlines Extracted and Sealed.`);
      setStatus('complete');

    } catch (error: any) {
      console.error(error);
      setTerminalText(prev => prev + `\n[FATAL ERROR] ${error.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-6">
      <header className="flex items-center justify-between border-b border-cyan-900/50 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold tracking-widest text-white">ONE <span className="text-cyan-400">TRUST</span> <span className="text-xs text-slate-500 font-mono tracking-normal ml-2">v1.0-PRODUCTION</span></h1>
        </div>
        <div className="text-xs font-mono text-cyan-500/50 flex items-center gap-2">
          {status === 'thinking' && <Loader2 className="w-3 h-3 animate-spin text-cyan-400"/>}
          STATUS: {status.toUpperCase()}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 h-[85vh] min-w-[1200px] overflow-x-auto">
        
        {/* 第一屏：法典投料口 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><UploadCloud className="w-5 h-5 text-cyan-400"/> 法典投料口 (The Forge)</h2>
          <p className="text-sm text-slate-400 mb-6">上传政务协议/外包合同 SOW，One Platform 将自动提取 AST 物理阻断红线。</p>
          
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" />
          
          <div 
            onClick={handleDropzoneClick}
            className={`flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${(status === 'idle' || status === 'complete' || status === 'error') ? 'border-cyan-700/50 hover:border-cyan-400 hover:bg-cyan-950/20' : 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed'}`}
          >
            <FileText className={`w-12 h-12 mb-4 ${(status === 'idle' || status === 'complete') ? 'text-cyan-500' : 'text-slate-600'}`} />
            <span className="text-sm font-mono text-center px-4">
              {status === 'idle' && '[ DROP SOW PDF/WORD HERE ]\nClick to select file'}
              {status === 'uploading' && `UPLOADING: ${selectedFileName}...`}
              {status === 'thinking' && `EXTRACTING: ${selectedFileName}...`}
              {status === 'complete' && `[ ${selectedFileName} PROCESSED ]\nClick to upload another`}
              {status === 'error' && '[ UPLOAD FAILED ]\nClick to retry'}
            </span>
          </div>
        </div>

        {/* 第二屏：真理提炼视窗 */}
        <div className="bg-[#0a0a0a] border border-cyan-900/30 rounded-xl p-6 flex flex-col relative shadow-[0_0_30px_rgba(6,182,212,0.05)]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-cyan-400"/> 真理提炼视窗 (The Crucible)</h2>
          <div className="flex-1 bg-black border border-slate-800 rounded-lg p-4 font-mono text-sm overflow-y-auto">
            {status === 'idle' && <span className="text-slate-600">Awaiting SOW payload...</span>}
            <pre className={`whitespace-pre-wrap leading-relaxed ${status === 'error' ? 'text-red-400' : 'text-cyan-400/80'}`}>
              {terminalText}
              {(status === 'thinking' || status === 'uploading') && <span className="animate-pulse">_</span>}
            </pre>
          </div>
        </div>

        {/* 第三屏：断头台验尸报告 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Crosshair className="w-5 h-5 text-red-500"/> 断头台判决书 (The Verdict)</h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {status === 'complete' && verdictRules.length > 0 ? (
              verdictRules.map((rule, idx) => (
                <div key={idx} className="bg-slate-950 border border-red-900/30 rounded-lg p-4 relative overflow-hidden hover:border-red-500/50 transition-colors animate-in slide-in-from-right-4 fade-in duration-500" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
                  <div className="absolute top-0 right-0 bg-red-500 text-black text-[10px] font-bold px-2 py-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {rule.threat_level}
                  </div>
                  
                  <div className="text-cyan-400 font-mono text-xs mb-2">[{rule.rule_id}]</div>
                  <div className="text-white font-bold text-sm mb-3">{rule.content}</div>
                  
                  <div className="bg-black/50 border border-slate-800 rounded p-3 mb-4">
                    <div className="text-[10px] text-slate-500 font-mono mb-1">// AST Machine Logic</div>
                    <div className="text-green-400 font-mono text-xs break-all">
                      <span className="text-slate-400">target:</span> {rule.machine_logic.target}<br/>
                      <span className="text-slate-400">operator:</span> {rule.machine_logic.operator}<br/>
                      <span className="text-slate-400">regex:</span> {rule.machine_logic.value.join(' | ')}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-800 pt-3 mt-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px]">司法级防伪钢印已生成</span>
                    </div>
                    <div className="text-[9px] font-mono text-slate-600 w-1/2 truncate text-right" title={rule.metadata.sha256_fingerprint}>
                      {rule.metadata.sha256_fingerprint}
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="h-full flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-slate-800 rounded-lg">
                 {status === 'thinking' ? 'FORGING AST REDLINES...' : 'AWAITING EXECUTION'}
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}