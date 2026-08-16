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
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
        >
          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            title="Scroll back to top"
            className="p-3 rounded-2xl bg-slate-950/90 border-2 border-slate-700 text-slate-300 hover:text-yellow-400 hover:border-yellow-400 backdrop-blur-md shadow-lg transition-all active:scale-90"
          >
            <ArrowUp className="w-5 h-5" />
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
            className="group relative px-5 py-3 rounded-2xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold border-2 border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.6)] hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all backdrop-blur-md flex items-center gap-2.5 overflow-hidden"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
            <Trophy className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wider">INSERT COIN</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

