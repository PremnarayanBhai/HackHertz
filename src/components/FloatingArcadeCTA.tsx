import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowUp } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface FloatingArcadeCTAProps {
  onOpenRegister: () => void;
}

export const FloatingArcadeCTA: React.FC<FloatingArcadeCTAProps> = ({ onOpenRegister }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-3"
        >
          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            title="Scroll back to top"
            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/90 border border-slate-700 text-slate-300 hover:text-yellow-400 hover:border-yellow-400 backdrop-blur-md shadow-lg transition-all active:scale-90"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Floating Coin CTA Button */}
          <a
            href="https://forms.gle/jY7ijJnAAaY1DT7a8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              soundManager.playCoin();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="group relative px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-yellow-400 text-slate-950 font-pixel text-[10px] sm:text-xs font-bold border-2 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all backdrop-blur-md flex items-center gap-2 sm:gap-2.5 overflow-hidden"
          >
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-950 animate-ping" />
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wider">REGISTER</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

