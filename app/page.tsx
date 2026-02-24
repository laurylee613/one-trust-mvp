"use client";

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Shield, FileText, Terminal, Crosshair, Lock, AlertTriangle, Loader2 } from 'lucide-react';

// ==========================================
// 🚨 指挥官，请在这里填入您的真实弹药库钥匙！
// ==========================================
const DIFY_API_KEY = "app-851IUQwtpGa2DlUn2GsnJN7a"; // 替换为您的 Dify 工作流 API Key
const DIFY_API_URL = "https://api.dify.ai/v1";   // 本地代理路径/api/dify

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

      const uploadRes = await fetch(`${DIFY_API_URL}/files`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${DIFY_API_KEY}` },
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error('File upload failed. 检查API密钥或CORS。');
      const uploadData = await uploadRes.json();

      setStatus('thinking');

      // 步骤 2: 唤醒 Darrow 引擎进行 AST 降维打击
      const runRes = await fetch(`${DIFY_API_URL}/workflows/run`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {}, // 如果您的工作流需要特定的文本输入参数，请在这里加上
          files: [{
            type: "document",
            transfer_method: "local_file",
            upload_file_id: uploadData.id
          }],
          response_mode: "blocking",
          user: "one-trust-admin"
        })
      });

      if (!runRes.ok) throw new Error('Workflow execution failed.');
      const runData = await runRes.json();

      // 步骤 3: 提取 Turing Python 节点打好钢印的 chunks_data
      const rawChunks = runData.data.outputs.chunks_data || [];
      const parsedRules = rawChunks.map((chunkStr: string) => JSON.parse(chunkStr));
      
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