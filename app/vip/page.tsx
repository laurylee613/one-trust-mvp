"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Shield, ChevronDown, Lock, Unlock, FileText, CheckCircle2, Zap, Scale } from 'lucide-react';

// ==========================================
// 🚨 核心配置与密钥字典 (MVP 阶段硬编码，未来可接 DB)
// ==========================================
const DIFY_API_URL = "https://api.oneplatform.com.cn/v1"; 
const VALID_INVITE_CODES: Record<string, string> = {
  'TRIBUNAL-X7A9': 'ALPHA-001 (张三专属渠道)',
  'TRIBUNAL-B4V2': 'ALPHA-002 (李四专属渠道)'
};

// ==========================================
// 🧩 模块 1：权力与利润视觉暴击 (Hero Section)
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
// 🧩 模块 2：实弹靶场 (Live Forge Scanner) - 具备本地智能嗅探能力
// ==========================================
const LiveForgeScanner = () => {
    const [scanState, setScanState] = useState<'idle' | 'uploading' | 'scanning' | 'parsing' | 'blocking' | 'stamped' | 'rejected'>('idle');
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    useEffect(() => {
      audioRef.current = new Audio('/kada.mp3');
      audioRef.current.volume = 1.0;
    }, []);
  
    const triggerAnimationSequence = (isLegalDoc: boolean) => {
      setScanState('scanning');
      
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
        // 🛡️ 路线 B：非法律文本，触发高冷拒收剧本
        setTimeout(() => setScanState('parsing'), 1500);
        setTimeout(() => {
          setScanState('rejected');
          // 轻微震动提示异常
          if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50]);
        }, 2500);
      }
    };
  
    const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        // 🧠 前端本地轻量级嗅探器：通过文件名特征判断是否为法律文书
        const legalKeywords = ['合同', '协议', '保密', '合规', '数据', '条款', '隐私', '声明', 'nda', 'sow', 'contract', 'agreement', 'privacy', 'policy', '法'];
        const isLikelyLegal = legalKeywords.some(keyword => file.name.toLowerCase().includes(keyword));
        
        triggerAnimationSequence(isLikelyLegal);
      }
    };
  
    return (
      <div className="py-16 px-6 relative border-t border-[#D4AF37]/10 bg-gradient-to-b from-[#0B132B] to-black">
        <h2 className="text-xl font-serif text-[#D4AF37] mb-8 text-center tracking-widest">极速靶场 (The Live Forge)</h2>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
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
  
          {scanState !== 'idle' && (
            <div className="w-full flex flex-col h-full space-y-4">
              <div className="text-xs font-mono text-[#00E5FF] border-b border-[#00E5FF]/20 pb-2 flex items-center gap-2">
                {(scanState === 'scanning' || scanState === 'parsing' || scanState === 'blocking') && <Zap className="w-3 h-3 animate-pulse" />}
                {scanState === 'scanning' && "> 浅层特征提取中..."}
                
                {/* 路线 A 文字 */}
                {scanState === 'parsing' && "> 锁定违规实体：数据出境限制"}
                {scanState === 'blocking' && "> 编译拦截指令：AST 生成中..."}
                {scanState === 'stamped' && <span className="text-rose-500">> 威胁已物理清除</span>}
                
                {/* 路线 B 文字 */}
                {scanState === 'rejected' && <span className="text-slate-500">> 引擎挂起：未检测到法理约束</span>}
              </div>
  
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
  
              {/* 路线 B 动画区：高冷拒收 */}
              {scanState === 'rejected' && (
                <div className="flex flex-col items-center justify-center mt-8 animate-in slide-in-from-bottom-4 duration-500">
                  <Scale className="w-12 h-12 text-slate-600 mb-4 opacity-50" />
                  <div className="text-center font-mono text-xs text-slate-400 space-y-2 bg-[#0A0F18] p-4 rounded border border-slate-800">
                    <p className="text-slate-300">卷宗分类：非典型契约文本</p>
                    <p>未在文件中检测到实质性法律约束与商业红线。</p>
                    <p className="text-[#D4AF37] mt-2">虎符引擎拒绝浪费算力。</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
  
        {/* 路线 A 底部文案 */}
        {scanState === 'stamped' && (
          <div className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg animate-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-[#D4AF37] font-serif font-bold mb-2">您的意志，机器已执行。</p>
            <p className="text-xs text-slate-400 leading-relaxed">仅凭刚才这一击，您已为客户免除了千万级合规罚款风险。(此为极速演示，真实业务拦截请前往 Web 端测试)</p>
          </div>
        )}
  
        {/* 路线 B 底部文案 */}
        {scanState === 'rejected' && (
          <div className="mt-6 p-4 bg-slate-900 border border-slate-800 rounded-lg animate-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-slate-300 font-serif font-bold mb-2">测试系统边界？明智之举。</p>
            <p className="text-xs text-slate-500 leading-relaxed">我们能精准分辨业务文档与法律文书。要想体验真正的机器物理熔断，请上传一份包含隐患的真实 NDA / SOW，或索取邀请码前往 Web 核心大屏进行深度测试。</p>
          </div>
        )}
      </div>
    );
  };

// ==========================================
// 🧩 模块 3：商业洗脑 (Value Props)
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
// 🧩 模块 4：回旋镖门禁 (Invite Gate)
// ==========================================
const InviteGate = ({ onUnlock }: { onUnlock: (code: string) => void }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (VALID_INVITE_CODES[code.trim().toUpperCase()]) {
      setError(false);
      onUnlock(code.trim().toUpperCase());
    } else {
      setError(true);
      // 震动提示错误
      if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }
  };

  return (
    <div className="py-16 px-6 relative flex flex-col items-center border-t border-slate-800 bg-black">
      <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-6 border border-slate-800 px-3 py-1 rounded-full">
        🔒 定向邀请访问 (BY INVITATION ONLY)
      </div>
      <h2 className="text-lg font-serif text-slate-200 text-center mb-8 leading-relaxed">
        2026 领航者计划<br/><span className="text-[#D4AF37]">本季度仅限 3 席</span>
      </h2>
      
      <div className="w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center">
        <Lock className="w-8 h-8 text-slate-600 mx-auto mb-4" />
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          权限已锁定。如需获取领航者内测资格及《合规产品化菜单》，请联系为您转发此页面的专属联系人，索取【内部邀请码】。
        </p>
        
        <input 
          type="text" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="TRIBUNAL-XXXX"
          className={`w-full bg-black border ${error ? 'border-rose-500 text-rose-500' : 'border-slate-700 text-[#D4AF37]'} rounded-lg px-4 py-3 text-center font-mono text-sm mb-4 uppercase focus:outline-none focus:border-[#D4AF37] transition-colors`}
        />
        
        <button 
          onClick={handleUnlock}
          className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold font-serif text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          验证序列号
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 🧩 模块 5：核武菜单 (Pricing Menu - Unlocked)
// ==========================================
const PricingMenu = () => (
  <div className="py-16 px-6 border-t border-[#D4AF37]/30 bg-gradient-to-b from-[#0B132B] to-black animate-in slide-in-from-bottom-8 duration-700">
    <div className="flex flex-col items-center mb-8 text-center">
      <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
        <Unlock className="w-6 h-6 text-[#D4AF37]" />
      </div>
      <h2 className="text-xl font-serif text-[#D4AF37] mb-2">验证通过。虎符引擎已解锁。</h2>
      <p className="text-xs text-slate-400">尊贵的领航者：您的专属《合规产品化菜单 v2.0》已生成。</p>
    </div>

    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-[#D4AF37]/50 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">主推款</div>
        <h3 className="text-lg font-serif text-slate-200 mb-1">标准熔断包 (Standard)</h3>
        <div className="text-2xl font-mono text-[#D4AF37] mb-3">¥300,000 <span className="text-xs text-slate-500">/年</span></div>
        <ul className="text-xs text-slate-400 space-y-2">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#00E5FF]"/> 包含 5 个核心业务节点的 AST 拦截</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#00E5FF]"/> 律所联合署名 (Powered by One Tribunal)</li>
        </ul>
      </div>

      <div className="bg-black border border-slate-700 rounded-xl p-5 opacity-80">
        <h3 className="text-lg font-serif text-slate-300 mb-1">全域霸权包 (Enterprise)</h3>
        <div className="text-2xl font-mono text-slate-300 mb-3">¥800,000+ <span className="text-xs text-slate-500">/年</span></div>
        <ul className="text-xs text-slate-500 space-y-2">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> 无限节点拦截 + 私有化节点部署</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> 客户 CMK 自持级司法链防篡改</li>
        </ul>
      </div>
    </div>

    <div className="mt-12 text-center">
      <p className="text-xs text-slate-500 font-mono">
        One Tribunal 创始团队已收到您的 Alpha 序列响应。<br/>随时待命为您提供闭门路演。
      </p>
    </div>
  </div>
);

// ==========================================
// 🚀 主页面拼装 (Main Layout)
// ==========================================
export default function VIPInvitationPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeCode, setActiveCode] = useState('');

  // 微信浏览器处理：强制禁止滑动透传等体验优化
  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    return () => { document.body.style.backgroundColor = ''; }
  }, []);

  const handleUnlock = (code: string) => {
    setActiveCode(code);
    setIsUnlocked(true);
    // 这里未来可以调用 API： trackLead({ code, source: VALID_INVITE_CODES[code] })
  };

  return (
    // 强制居中且限制最大宽度，完美模拟手机竖屏体验 (H5 质感)
    <div className="min-h-screen bg-[#0B132B] text-slate-300 font-sans selection:bg-[#D4AF37]/30">
      <div className="max-w-md mx-auto bg-[#0B132B] min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-x-hidden">
        
        {/* 背景暗纹 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1a2b5c] via-[#0B132B] to-[#050914] opacity-50 pointer-events-none"></div>

        {/* 模块拼装区 */}
        <HeroSection />
        <LiveForgeScanner />
        <ValueProps />
        
        {!isUnlocked ? (
          <InviteGate onUnlock={handleUnlock} />
        ) : (
          <PricingMenu />
        )}
        
      </div>
    </div>
  );
}