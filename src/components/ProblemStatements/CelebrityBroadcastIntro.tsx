import React, { useEffect, useState } from 'react';
import { Radio, Sparkles, Flame, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/sound';

interface CelebrityBroadcastIntroProps {
  isOpen: boolean;
  domainName: string;
  passkey: string;
  color?: string;
  celebrityTitle?: string;
  onComplete: () => void;
}

export const CelebrityBroadcastIntro: React.FC<CelebrityBroadcastIntroProps> = ({
  isOpen,
  domainName,
  passkey,
  color = '#facc15',
  celebrityTitle = 'HONORED CELEBRITY INNOVATOR',
  onComplete
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    // Play celebrity fanfare audio
    soundManager.playCelebrityUnlock();

    // Trigger initial multi-burst confetti
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#facc15', '#22d3ee', '#e879f9', '#10b981', '#ffffff']
      });
    } catch {
      // Ignore
    }

    // Stepped reveal timeline
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1100);
    const t3 = setTimeout(() => {
      setStep(3);
      try {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#facc15', '#f59e0b', '#38bdf8']
        });
      } catch {}
    }, 1800);
    const t4 = setTimeout(() => {
      setStep(4);
      soundManager.playCoin();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in">
      {/* Ambient glowing orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-25 animate-pulse pointer-events-none"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-0 bg-maze-pattern opacity-20 pointer-events-none" />

      {/* Main Holographic Terminal Card */}
      <div className="relative w-full max-w-2xl bg-slate-900/95 border-2 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-[0_0_80px_rgba(250,204,21,0.3)] overflow-hidden"
        style={{ borderColor: color }}
      >
        {/* Top VIP Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-yellow-400/40 text-yellow-300 font-pixel text-xs shadow-[0_0_20px_rgba(250,204,21,0.2)]">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          <span>CELEBRITY VIP BROADCAST PROTOCOL // LEVEL 5 ACCESS</span>
        </div>

        {/* Live Satellite Uplink Animation */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 border-2 border-yellow-400 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] relative">
            <Radio className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
            SATELLITE BROADCAST ACTIVATED
          </span>
        </div>

        {/* Dynamic Titles */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-orbitron">
            UNLEASHING <span style={{ color }}>{domainName.toUpperCase()}</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-lg mx-auto">
            Passkey <span className="text-yellow-400 font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-yellow-400/30 font-mono">{passkey}</span> verified. You have triggered the official live problem statement broadcast!
          </p>
        </div>

        {/* Decryption Progress Steps */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
            <span>UPLINK SEQUENCE:</span>
            <span className="text-yellow-400 font-bold">T-00:00:00</span>
          </div>

          <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>VIP Clearance Authenticated: {celebrityTitle}</span>
          </div>

          <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 2 ? 'text-cyan-300' : 'text-slate-600'}`}>
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Decrypted Mission Dossier for {domainName}</span>
          </div>

          <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 3 ? 'text-yellow-400' : 'text-slate-600'}`}>
            <Flame className="w-3.5 h-3.5 shrink-0" />
            <span>Global Broadcast Initiated: 100 Teams Synced</span>
          </div>

          <div className={`flex items-center gap-2 transition-all duration-300 ${step >= 4 ? 'text-white font-bold' : 'text-slate-600'}`}>
            <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0 animate-bounce" />
            <span>STATUS: LIVE RIGHT NOW! THE ARENA IS OPEN.</span>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onComplete();
            }}
            className="px-8 py-3.5 rounded-2xl font-pixel text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mx-auto transition-all shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: color, color: '#020617' }}
          >
            <span>ENTER VIP CHALLENGE PORTAL</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
