import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Zap } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const NetworkSentinel: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [justReconnected, setJustReconnected] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setJustReconnected(true);
      soundManager.playSuccess();
      const timer = setTimeout(() => {
        setJustReconnected(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      soundManager.playGameOver();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualCheck = async () => {
    setIsChecking(true);
    soundManager.playClick();
    try {
      // Ping cache-busted endpoint
      await fetch(`/?ping=${Date.now()}`, { method: 'HEAD', cache: 'no-store' });
      setIsOnline(true);
      setJustReconnected(true);
      soundManager.playSuccess();
      setTimeout(() => setJustReconnected(false), 3000);
    } catch {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  if (isOnline && !justReconnected) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-lg transition-all animate-in fade-in slide-in-from-top-4 duration-300">
      {justReconnected ? (
        <div className="bg-emerald-950/95 border-2 border-emerald-400 text-emerald-200 px-4 py-2.5 rounded-xl shadow-[0_0_25px_rgba(52,211,153,0.4)] backdrop-blur-md flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>SATELLITE LINK RESTORED // READY TO HACK</span>
          </div>
          <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
        </div>
      ) : (
        <div className="bg-red-950/95 border-2 border-red-500 text-red-200 px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.5)] backdrop-blur-md flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <WifiOff className="w-4 h-4 text-red-400 animate-pulse" />
            <div>
              <div className="font-bold text-red-300 flex items-center gap-1.5 font-pixel text-[10px]">
                OFFLINE DETECTED
              </div>
              <div className="text-[11px] text-slate-300">
                Network link paused. Offline cache active.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleManualCheck}
            disabled={isChecking}
            className="px-2.5 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white text-[10px] font-pixel transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'TESTING' : 'RETRY'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
