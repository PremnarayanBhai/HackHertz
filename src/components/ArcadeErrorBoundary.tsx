import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Terminal, Gamepad2, AlertTriangle, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
  miniGameActive: boolean;
  miniGameScore: number;
  pacPosition: number;
}

export class ArcadeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      showDetails: false,
      miniGameActive: false,
      miniGameScore: 0,
      pacPosition: 10,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('HackHertz Arcade Matrix Error Caught:', error, errorInfo);
  }

  private handleReboot = () => {
    soundManager.playCoin();
    setTimeout(() => {
      window.location.reload();
    }, 250);
  };

  private handleClearAndReboot = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Ignore
    }
    soundManager.playPowerUp();
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  private handleMiniGameEat = () => {
    soundManager.playCoin();
    this.setState((prev) => ({
      miniGameScore: prev.miniGameScore + 100,
      pacPosition: (prev.pacPosition + 15) % 90,
    }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030612] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono select-none">
          {/* CRT Scanline Overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-10 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
              backgroundSize: '100% 4px'
            }}
          />

          {/* Vignette & Ambient Glow */}
          <div className="fixed inset-0 bg-radial from-transparent via-[#050714]/80 to-[#020309] pointer-events-none" />
          <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
          <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

          {/* Main Error Terminal Cabinet */}
          <div className="relative z-20 max-w-2xl w-full bg-slate-900/90 border-2 border-red-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-xl">
            
            {/* Header / Arcade Glitch Banner */}
            <div className="flex items-center justify-between border-b border-red-500/30 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500 flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-black text-red-400 tracking-wider flex items-center gap-2">
                    GLITCH IN THE MATRIX
                    <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300">
                      ERR 0x8826
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">HACKHERTZ 2026 // SYSTEM HALT OVERRIDE</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-yellow-400 font-pixel">
                <Sparkles className="w-4 h-4 animate-spin text-yellow-400" />
                <span>COIN: 01</span>
              </div>
            </div>

            {/* Diagnostic Message */}
            <div className="bg-black/60 rounded-xl p-4 border border-slate-800 text-xs sm:text-sm text-slate-300 mb-6 space-y-2 font-mono">
              <div className="flex items-center gap-2 text-yellow-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>ARCADE RECOVERY CONSOLE READY</span>
              </div>
              <p className="text-slate-400">
                The retro arcade client hit an unexpected anomaly while compiling the game arena. 
                Don't panic! Your team registration and portal data remain secure on our servers.
              </p>
              {this.state.error && (
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-red-400 truncate">
                  Cause: {this.state.error.message || 'Render Pipeline Exception'}
                </div>
              )}
            </div>

            {/* Interactive Emergency Mini-Game while waiting */}
            <div className="bg-slate-950/70 border border-yellow-500/30 rounded-xl p-4 mb-6 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-yellow-400 font-pixel mb-3">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                  <span>EMERGENCY PAC REBOOT MINI-GAME</span>
                </div>
                <div>SCORE: {this.state.miniGameScore}</div>
              </div>

              {/* Pac-Man Track */}
              <div 
                onClick={this.handleMiniGameEat}
                className="h-14 bg-[#090d24] border border-slate-800 rounded-lg flex items-center px-4 relative cursor-pointer group hover:border-yellow-400/50 transition-colors"
                title="Click or Tap anywhere to eat power dots!"
              >
                {/* Dots along the path */}
                <div className="absolute inset-x-6 flex justify-between items-center pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-cyan-400/40 shadow-[0_0_6px_#22d3ee]" />
                  ))}
                </div>

                {/* Pacman Sprite */}
                <div 
                  className="absolute w-7 h-7 rounded-full bg-yellow-400 shadow-[0_0_12px_#facc15] flex items-center justify-center transition-all duration-300"
                  style={{ left: `${this.state.pacPosition}%` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950 -mt-1 ml-1" />
                </div>

                <div className="absolute right-4 text-[11px] font-pixel text-slate-500 group-hover:text-yellow-400 transition-colors">
                  [CLICK TO EAT]
                </div>
              </div>
            </div>

            {/* Control Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={this.handleReboot}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-pixel text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                <span>INSERT COIN & REBOOT</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearAndReboot}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-pixel text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>CLEAR CACHE & RESTART</span>
              </button>
            </div>

            {/* Technical Trace Toggle */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline cursor-pointer transition-colors"
              >
                {this.state.showDetails ? 'Hide Anomaly Diagnostics' : 'Inspect Diagnostic Stack Trace'}
              </button>

              {this.state.showDetails && this.state.error && (
                <pre className="mt-3 p-3 bg-black/80 rounded-lg text-[10px] text-left text-slate-400 max-h-40 overflow-auto font-mono border border-slate-800 whitespace-pre-wrap">
                  {this.state.error.stack || this.state.error.message}
                </pre>
              )}
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
