import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Gamepad2 } from 'lucide-react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      {/* Background Track */}
      <div className="h-1.5 w-full bg-slate-950/80 backdrop-blur-sm relative overflow-hidden">
        
        {/* Animated Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 shadow-[0_0_12px_#facc15] origin-left"
          style={{ scaleX }}
        />

        {/* Chaser Pac-Dot Sprite aligned with progress */}
        <motion.div
          className="absolute top-0 bottom-0 flex items-center justify-center -translate-x-1/2 transition-transform"
          style={{ left: `${percentage}%` }}
        >
          {percentage > 0 && percentage < 100 && (
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-300 border border-slate-950 shadow-[0_0_10px_#facc15] flex items-center justify-center animate-pulse">
              <div className="w-1 h-1 rounded-full bg-slate-950" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Level Progress Badge (Top Right Corner below navbar) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: percentage > 2 ? 1 : 0, y: percentage > 2 ? 0 : -10 }}
        className="fixed top-20 right-4 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.2)] text-[10px] font-pixel text-yellow-400 pointer-events-auto backdrop-blur-md transition-all"
      >
        <Gamepad2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
        <span>MAZE CLEAR: {percentage}%</span>
      </motion.div>
    </div>
  );
};
