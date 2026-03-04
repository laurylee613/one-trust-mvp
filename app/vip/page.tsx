"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Shield, ChevronDown, Lock, Unlock, FileText, CheckCircle2, Zap, Scale, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';


// ==========================================
// 🧩 模块 1：权力与利润视觉暴击
// ==========================================
const HeroSection = () => (
  <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center z-10">
    <div className="absolute top-8 w-full flex justify-between items-center px-6">
      <div className="flex items-center gap-2">
        <Scale className="w-5 h-5 text-[#D4AF37]" />
        <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest border border-[#D4AF37]/30 px-2 py-0.5 rounded-sm">ONE TRIBUNAL</span>
      </div>
      <span className="text-[10px] text-slate-500 font-serif tracking-widest">定向内测版</span>
    </div>

    <h1 className="text-3xl font-serif font-bold text-slate-100 leading-tight mt-16 mb-6 drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]">
      将合规审计成本降至 <span className="text-[#D4AF37]">1/10</span><br/>
      将客户信任溢价放大 <span className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">5倍</span>
    </h1>
    <p className="text-sm text-slate-400 font-serif leading-relaxed px-4">
      专为顶级精品科技律所打造的 AI 时代<br/>“底层数字印钞机”与“法庭级免责护盾”。
    </p>

    <div className="absolute bottom-12 animate-bounce">
      <ChevronDown className="w-6 h-6 text-[#D4AF37]/60" />
    </div>
  </div>
);

// ==========================================
// 🧩 模块 2：实弹靶场 (Live Forge Scanner) - CMO & RedTeam 升级版
// ==========================================
const LiveForgeScanner = () => {
  const [scanState, setScanState] = useState<'idle' | 'uploading' | 'scanning' | 'analyzing' | 'parsing' | 'blocking' | 'stamped' | 'rejected'>('idle');
  const [sniffStep, setSniffStep] = useState(0); // 专为 B 路线增加的悬疑步伐
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/kada.mp3');
    audioRef.current.volume = 1.0;
  }, []);

  const triggerAnimationSequence = (isLegalDoc: boolean) => {
    setScanState('scanning');
    setSniffStep(0);
    
    if (isLegalDoc) {
      // 🚀 路线 A：高危合同，触发物理熔断剧本
      setTimeout(() => setScanState('parsing'), 1500);
      setTimeout(() => setScanState('blocking'), 3000);
      setTimeout(() => {
        setScanState('stamped');
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([200, 100, 200]);
        if (audioRef.current) audioRef.current.play().catch(()=>console.log('Audio blocked'));
      }, 4500);
    } else {
      // 🛡️ 路线 B：非法律文本，触发高冷拒收剧本 (增加 3.5秒 悬疑节奏)
      setTimeout(() => { setScanState('analyzing'); setSniffStep(1); }, 1000); // 假装分析段落
      setTimeout(() => setSniffStep(2), 1800); // 假装排除管理规章
      setTimeout(() => setSniffStep(3), 2600); // 假装未发现红线
      setTimeout(() => {
        setScanState('rejected');
        // 军工级警告震动：滴-滴两声短促震动
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 100, 50]);
      }, 3500);
    }
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const legalKeywords = ['合同', '协议', '保密', '合规', '数据', '条款', '隐私', '声明', 'nda', 'sow', 'contract', 'agreement', 'privacy', 'policy', '法'];
      const isLikelyLegal = legalKeywords.some(keyword => file.name.toLowerCase().includes(keyword));
      triggerAnimationSequence(isLikelyLegal);
    }
  };

  const handleReUpload = () => {
    setScanState('idle');
    setSniffStep(0);
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  return (
    <div className="py-16 px-6 relative border-t border-[#D4AF37]/10 bg-gradient-to-b from-[#0B132B] to-black">
      <h2 className="text-xl font-serif text-[#D4AF37] mb-8 text-center tracking-widest">极速靶场 (The Live Forge)</h2>
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
        {/* 初始状态 */}
        {scanState === 'idle' && (
          <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-all">
              <FileText className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <p className="text-center text-sm text-slate-400 font-serif leading-relaxed">
              请上传一份保密协议或合规 PDF<br/>
              <span className="text-xs text-slate-500">(仅限前 3 页，阅后即焚)</span>
            </p>
            <input type="file" ref={fileInputRef} onChange={handleSimulateUpload} className="hidden" accept=".pdf,.docx,.doc,.txt" />
          </div>
        )}

        {/* 运行状态 */}
        {scanState !== 'idle' && (
          <div className="w-full flex flex-col h-full space-y-4">
            
            <div className={`text-xs font-mono border-b pb-2 flex items-center gap-2 ${scanState === 'rejected' || scanState === 'analyzing' ? 'text-amber-500 border-amber-500/20' : 'text-[#00E5FF] border-[#00E5FF]/20'}`}>
              {(scanState === 'scanning' || scanState === 'parsing' || scanState === 'blocking' || scanState === 'analyzing') && <Zap className="w-3 h-3 animate-pulse" />}
              {scanState === 'scanning' && "> 浅层特征提取中..."}
              {scanState === 'analyzing' && "> 深度文意嗅探启动..."}
              
              {/* 路线 A 文字 */}
              {scanState === 'parsing' && "> 锁定违规实体：数据出境限制"}
              {scanState === 'blocking' && "> 编译拦截指令：AST 生成中..."}
              {scanState === 'stamped' && <span className="text-rose-500">&gt; 威胁已物理清除</span>}
              
              {/* 路线 B 文字 */}
              {scanState === 'rejected' && <span className="text-amber-500">&gt; 引擎挂起：未检测到法理约束</span>}
            </div>

            {/* 路线 B 的悬疑扫描日志 */}
            {scanState === 'analyzing' && (
              <div className="font-mono text-[10px] text-amber-500/70 space-y-2 mt-2">
                {sniffStep >= 1 && <div className="animate-in fade-in slide-in-from-bottom-2">&gt; 分析文档段落实体... [排除]</div>}
                {sniffStep >= 2 && <div className="animate-in fade-in slide-in-from-bottom-2">&gt; 扫描业务绩效与管理条款... [跳过]</div>}
                {sniffStep >= 3 && <div className="animate-in fade-in slide-in-from-bottom-2">&gt; 未发现数据出境或金融合规红线...</div>}
              </div>
            )}

            {/* 路线 A 动画区 */}
            {(scanState === 'parsing' || scanState === 'blocking' || scanState === 'stamped') && (
              <div className="bg-black/60 p-3 rounded border border-slate-800 animate-in fade-in duration-500">
                <span className="text-[#00E5FF] text-[11px] font-serif bg-[#00E5FF]/10 px-1">"未经脱敏不得跨境传输"</span>
              </div>
            )}
            {(scanState === 'blocking' || scanState === 'stamped') && (
              <div className="relative mt-auto">
                <div className="font-mono text-[10px] text-slate-500 bg-[#0A0F18] p-3 rounded">
                  <span className="text-rose-400">🚨 INTERCEPT DETECTED</span><br/>
                  <span className="typing-effect text-slate-400">send_data(user_info, overseas_server)</span>
                </div>
                {scanState === 'stamped' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in zoom-in duration-200">
                    <div className="border-4 border-rose-600 text-rose-600 font-black text-3xl tracking-[0.3em] px-4 py-2 transform -rotate-12 shadow-[0_0_30px_rgba(225,29,72,0.6)] rounded">BLOCK</div>
                  </div>
                )}
              </div>
            )}

            {/* 路线 B 动画区：琥珀金高冷拒收 + 重新装填 */}
            {scanState === 'rejected' && (
              <div className="flex flex-col items-center justify-center mt-6 animate-in slide-in-from-bottom-4 duration-500">
                <Scale className="w-12 h-12 text-amber-500/60 mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]" />
                <div className="text-center font-mono text-xs text-amber-500/80 space-y-2 bg-[#1A1500] p-4 rounded border border-amber-900/40 w-full">
                  <p className="text-amber-400">卷宗分类：非典型契约文本</p>
                  <p className="opacity-80">未在文件中检测到实质性法律约束。</p>
                  <p className="text-[#D4AF37] mt-2 font-bold">虎符引擎拒绝浪费算力。</p>
                </div>
                <button 
                  onClick={handleReUpload}
                  // 💎 尚锐的终极要求：暗金底色 + 微弱光晕 + 呼吸灯效 (animate-pulse)
                  className="mt-6 flex items-center gap-2 text-xs text-[#D4AF37] border border-[#D4AF37]/50 px-5 py-2.5 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-pulse"
                >
                  <RotateCcw className="w-3 h-3" /> 重新装填真实契约
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 路线 A 底部文案 (加入 RedTeam 免责声明) */}
      {scanState === 'stamped' && (
        <div className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg animate-in slide-in-from-bottom-4 duration-500">
          <p className="text-sm text-[#D4AF37] font-serif font-bold mb-2">您的意志，机器已执行。</p>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">仅凭刚才这一击，您已为客户免除了千万级合规罚款风险。</p>
          <p className="text-[9px] text-slate-500 leading-relaxed opacity-70 border-t border-[#D4AF37]/20 pt-2 font-mono">
            * 注：此为基于核心规则生成的“模拟代码拦截演示”，旨在展示引擎将法理转化为物理阻断的能力。
          </p>
        </div>
      )}

      {/* 路线 B 底部文案 */}
      {scanState === 'rejected' && (
        <div className="mt-6 p-4 bg-[#1A1500]/50 border border-amber-900/30 rounded-lg animate-in slide-in-from-bottom-4 duration-500">
          <p className="text-sm text-amber-500 font-serif font-bold mb-2">测试系统边界？明智之举。</p>
          <p className="text-xs text-amber-500/60 leading-relaxed">要想体验真正的机器物理熔断，请上传一份包含隐患的真实 NDA / SOW，或索取邀请码前往 Web 核心大屏进行深度测试。</p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 🧩 模块 3：商业洗脑
// ==========================================
const ValueProps = () => (
  <div className="py-12 px-6 bg-[#0B132B]">
    <div className="space-y-8">
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-1"><Scale className="w-4 h-4 text-[#D4AF37]"/></div>
        <div>
          <h3 className="text-md font-serif font-bold text-slate-200 mb-1">捍卫绝对定价权</h3>
          <p className="text-xs text-slate-400 leading-relaxed">停止出卖廉价工时。将单次审查升级为“含物理阻断的 30 万级产品包”，净利润率跃升至 90%。</p>
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-1"><Shield className="w-4 h-4 text-[#D4AF37]"/></div>
        <div>
          <h3 className="text-md font-serif font-bold text-slate-200 mb-1">零连带责任风险</h3>
          <p className="text-xs text-slate-400 leading-relaxed">不可篡改的机器黑匣子与客户自持密钥(CMK)，是保护您免受失职诉讼的终极防弹衣。</p>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 🧩 模块 4：回旋镖门禁 (连通极乐空间云端大脑)
// ==========================================
const InviteGate = ({ onUnlock }: { onUnlock: (code: string) => void }) => {
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    // 💎 增加这段：监听网址上的 ?code=XXX，实现自动装填
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlCode = params.get('code');
        if (urlCode) {
          setCode(urlCode.toUpperCase());
        }
      }
    }, []);

  
    const handleUnlock = async () => {
      const trimmedCode = code.trim().toUpperCase();
      if (!trimmedCode) return;
  
      setIsLoading(true);
      setErrorMsg('');
  
      try {
        // 🚀 发射真实的请求到极乐空间后端 API
        const res = await fetch('/api/verify-invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: trimmedCode })
        });
  
        const data = await res.json();
  
        if (res.ok && data.success) {
          // 鉴权通过，核销成功！
          if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([100]);
          onUnlock(trimmedCode);
        } else {
          // 鉴权失败 (码不对或次数耗尽)
          setErrorMsg(data.error || '无效的序列号，虎符引擎拒绝响应');
          if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 50]);
        }
      } catch (err) {
        setErrorMsg('云端网络异常，请稍后重试');
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 50]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="py-16 px-6 relative flex flex-col items-center border-t border-slate-800 bg-black">
        <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-6 border border-slate-800 px-3 py-1 rounded-full">
          🔒 定向邀请访问 (BY INVITATION ONLY)
        </div>
        <h2 className="text-lg font-serif text-slate-200 text-center mb-8 leading-relaxed">
          2026 领航者计划<br/><span className="text-[#D4AF37]">本月度仅限 3 席</span>
        </h2>
        
        <div className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center shadow-2xl">
          <Lock className="w-8 h-8 text-[#D4AF37]/80 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            权限已锁定。如需获取领航者内测资格及《合规产品化菜单》，请联系专属联系人索取内部邀请码。
          </p>
          
          <input 
            type="text" 
            value={code}
            onChange={(e) => { setCode(e.target.value); setErrorMsg(''); }}
            placeholder="请输入您的 Alpha 级专属邀请码"
            disabled={isLoading}
            className={`w-full bg-black border ${errorMsg ? 'border-rose-500 text-rose-500' : 'border-slate-700 text-[#D4AF37]'} rounded-lg px-4 py-3 text-center font-serif text-sm mb-2 uppercase focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-50`}
          />
          
          {/* 精确的错误提示位 */}
          {errorMsg && (
            <div className="text-rose-500 text-[10px] font-mono mb-4 animate-in slide-in-from-top-1">
              {errorMsg}
            </div>
          )}
          
          <button 
            onClick={handleUnlock}
            disabled={isLoading || !code.trim()}
            className="w-full mt-2 bg-[#D4AF37] hover:bg-[#b5952f] disabled:bg-slate-700 disabled:text-slate-500 text-black font-bold font-serif text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 animate-pulse" /> 正在连线极乐空间...</span>
            ) : (
              <span className="flex items-center gap-2"><Unlock className="w-4 h-4" /> 解锁领航者权益</span>
            )}
          </button>
  
          <p className="text-[10px] text-slate-500 mt-4 opacity-70">
            提示：该序列号通常由向您推荐本系统的朋友持有。
          </p>
        </div>
      </div>
    );
  };


// ==========================================
// 🧩 模块 5：登舰传送门 (重构版：展示价值，而非强推价格)
// ==========================================
const UnlockedPortal = ({ activeCode }: { activeCode: string }) => {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
  
    const handleEnterCore = () => {
      setIsRedirecting(true);
      // 模拟 1.5 秒的系统启动加载感，然后将客户传送到 V2.1 真实大屏
      // 💎 核心安全补丁：在浏览器底层打上防伪烙印
      if (typeof window !== 'undefined') {
      sessionStorage.setItem('tribunal_vip_pass', activeCode);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  }

  // 1.5 秒后传送
  setTimeout(() => {
    // 现在不需要带参数了，直接去无参数的纯净根目录
    router.push(`/`); 
  }, 1500);
    };
  
    return (
      <div className="py-16 px-6 border-t border-[#D4AF37]/30 bg-gradient-to-b from-[#0B132B] to-black animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-[#D4AF37]/50">
            <Shield className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-serif text-[#D4AF37] mb-2 tracking-widest">身份确认。协议已签署。</h2>
          <p className="text-sm text-slate-400 font-mono leading-relaxed mt-2">
            欢迎您，Alpha 级领航者。<br/>
            系统已为您分配 <span className="text-[#00E5FF]">最高权限 (Enterprise Tier)</span> 临时沙箱。
          </p>
        </div>
  
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 relative overflow-hidden mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 bg-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-bold px-3 py-1 rounded-bl-lg font-mono">
            UNLOCKED
          </div>
          <h3 className="text-md font-serif text-slate-200 mb-4 border-b border-slate-800 pb-2">您即将进入的核心能力矩阵：</h3>
          <ul className="text-xs text-slate-400 space-y-3 font-mono">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]"/> 多模态合规条款逆向工程提取</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]"/> AST (抽象语法树) 级代码阻断沙箱</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]"/> 军工级不可篡改司法审计日志</li>
          </ul>
        </div>
  
        <button 
          onClick={handleEnterCore}
          disabled={isRedirecting}
          className="w-full bg-[#D4AF37] hover:bg-[#b5952f] disabled:bg-slate-800 disabled:text-slate-500 text-black font-bold font-serif text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          {isRedirecting ? (
            <span className="flex items-center gap-2"><Zap className="w-5 h-5 animate-pulse" /> 主引擎点火中...</span>
          ) : (
            <span className="flex items-center gap-2">进入全域核武大屏 <Zap className="w-5 h-5" /></span>
          )}
        </button>
  
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            * 建议在 PC 端打开该系统以获得最佳的实弹演算体验。<br/>您的密钥授权有效时长为 24 小时。
          </p>
        </div>
      </div>
    );
  };


// ==========================================
// 🚀 主页面拼装
// ==========================================
export default function VIPInvitationPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeCode, setActiveCode] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    return () => { document.body.style.backgroundColor = ''; }
  }, []);

  const handleUnlock = (code: string) => {
    setActiveCode(code);
    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-300 font-sans selection:bg-[#D4AF37]/30">
      <div className="max-w-md mx-auto bg-[#0B132B] min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-x-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1a2b5c] via-[#0B132B] to-[#050914] opacity-50 pointer-events-none"></div>
        <HeroSection />
        <LiveForgeScanner />
        <ValueProps />
        {!isUnlocked ? <InviteGate onUnlock={handleUnlock} /> : <UnlockedPortal activeCode={activeCode} />}
      </div>
    </div>
  );
}