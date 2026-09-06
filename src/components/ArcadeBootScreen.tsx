import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Zap, Play, FastForward, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ArcadeBootScreenProps {
  forceShow?: boolean;
  onBootComplete?: () => void;
}

export const ArcadeBootScreen: React.FC<ArcadeBootScreenProps> = ({
  forceShow = false,
  onBootComplete,
}) => {
  const [hasBooted, setHasBooted] = useState<boolean>(() => {
    if (forceShow) return false;
    try {
      return sessionStorage.getItem('hackhertz_arcade_booted') === 'true';
    } catch {
      return false;
    }
  });

  const [bootPhase, setBootPhase] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(!soundManager.isMuted);
  const [countdown, setCountdown] = useState<number>(1);

  // Progressive telemetry sequence
  useEffect(() => {
    if (hasBooted && !forceShow) return;

    const timer1 = setTimeout(() => setBootPhase(1), 180);
    const timer2 = setTimeout(() => setBootPhase(2), 400);
    const timer3 = setTimeout(() => setBootPhase(3), 700);
    const timer4 = setTimeout(() => setBootPhase(4), 1000);

    // Auto-advance countdown
    const autoTimer = setTimeout(() => {
      handleEnterArena();
    }, 1400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleEnterArena();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(autoTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasBooted, forceShow]);

  const handleEnterArena = () => {
    try {
      sessionStorage.setItem('hackhertz_arcade_booted', 'true');
    } catch {
      // Ignore
    }
    soundManager.playCoin();
    setHasBooted(true);
    if (onBootComplete) onBootComplete();
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.isMuted = !soundManager.isMuted;
    setSoundEnabled(!soundManager.isMuted);
    if (!soundManager.isMuted) {
      soundManager.playClick();
    }
  };

  if (hasBooted && !forceShow) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="fixed inset-0 z-[999] bg-[#030612] text-slate-100 flex flex-col items-center justify-center p-4 select-none overflow-hidden"
        onClick={handleEnterArena}
      >
        {/* CRT Scanline and Phosphor Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Ambient Neon Backlights */}
        <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none animate-pulse" />

        {/* Arcade Cabinet Screen Shell */}
        <div className="relative z-20 max-w-xl w-full bg-slate-950/90 border-2 border-yellow-400/80 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(250,204,21,0.25)] backdrop-blur-2xl text-center space-y-6">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-yellow-400/20 pb-3 text-xs font-pixel text-yellow-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span>ARENA BIOS v2.06</span>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              className="p-1 rounded bg-slate-900 border border-slate-700 hover:border-yellow-400 text-slate-300 hover:text-yellow-400 transition-colors"
              title="Toggle 8-bit Audio"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-yellow-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>
          </div>

          {/* Glowing Retro Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-pixel">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>INTERCOLLEGE RETRO HACKATHON</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-cyan-300 to-pink-400 filter drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              HACKHERTZ 2026
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              30 Hours of Innovation • ₹15,000+ Prize Vault • SSIT Campus
            </p>
          </div>

          {/* Animated Diagnostics Sequence */}
          <div className="bg-black/60 border border-slate-800 rounded-xl p-4 text-left font-mono text-xs space-y-1.5 text-slate-300">
            <div className="flex items-center justify-between text-yellow-400 text-[11px] font-bold border-b border-slate-800/80 pb-1">
              <span>SYSTEM BOOT TELEMETRY</span>
              <span className="text-cyan-400">READY</span>
            </div>

            <div className={`flex items-center justify-between transition-opacity duration-300 ${bootPhase >= 1 ? 'opacity-100' : 'opacity-20'}`}>
              <span className="text-slate-400">01. 8-Bit Synthesizer Core:</span>
              <span className="text-emerald-400 font-bold">[ONLINE]</span>
            </div>

            <div className={`flex items-center justify-between transition-opacity duration-300 ${bootPhase >= 2 ? 'opacity-100' : 'opacity-20'}`}>
              <span className="text-slate-400">02. 6 Domain Problem Vaults:</span>
              <span className="text-emerald-400 font-bold">[SYNCED]</span>
            </div>

            <div className={`flex items-center justify-between transition-opacity duration-300 ${bootPhase >= 3 ? 'opacity-100' : 'opacity-20'}`}>
              <span className="text-slate-400">03. Celebrity Lead Decryption:</span>
              <span className="text-cyan-400 font-bold">[ARMED]</span>
            </div>

            <div className={`flex items-center justify-between transition-opacity duration-300 ${bootPhase >= 4 ? 'opacity-100' : 'opacity-20'}`}>
              <span className="text-slate-400">04. Interactive Pac-Maze Arena:</span>
              <span className="text-yellow-400 font-bold">[ACTIVE]</span>
            </div>
          </div>

          {/* Pacman Dot-Eating Mini Progress Bar */}
          <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-yellow-400 to-cyan-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.3, ease: 'linear' }}
            />
          </div>

          {/* Call to Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleEnterArena}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-pixel text-xs sm:text-sm font-black shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-current animate-bounce" />
              <span>INSERT 1 COIN // ENTER ARENA</span>
              <FastForward className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Press [SPACE] or Click anywhere</span>
              <span className="text-yellow-400/80 animate-pulse">Auto-entering...</span>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
