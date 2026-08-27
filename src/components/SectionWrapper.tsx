import React from 'react';
import { motion, Variants } from 'motion/react';

export type SectionAccent = 'yellow' | 'cyan' | 'pink' | 'purple' | 'emerald' | 'amber';
export type BgVariant = 'abyss' | 'indigo' | 'midnight' | 'cyber' | 'noir' | 'obsidian';
export type AnimVariant = 'lift' | 'slide-left' | 'slide-right' | 'zoom-in' | 'flip-up' | 'glitch-reveal';

export interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  stageTag?: string;
  amount?: number | 'some' | 'all';
  accent?: SectionAccent;
  bgVariant?: BgVariant;
  animVariant?: AnimVariant;
  showDividerLine?: boolean;
}

export const sectionAnimationVariants: Record<AnimVariant, Variants> = {
  lift: {
    hidden: { opacity: 0, y: 50, scale: 0.97, filter: 'blur(4px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  },
  'slide-left': {
    hidden: { opacity: 0, x: 60, scale: 0.98, filter: 'blur(3px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  'slide-right': {
    hidden: { opacity: 0, x: -60, scale: 0.98, filter: 'blur(3px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.92, y: 20, filter: 'blur(5px)' },
    visible: (delay: number = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, delay, ease: [0.34, 1.56, 0.64, 1] },
    }),
  },
  'flip-up': {
    hidden: { opacity: 0, rotateX: 12, y: 40, scale: 0.96 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  'glitch-reveal': {
    hidden: { opacity: 0, x: -20, y: 25, skewX: -3 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      skewX: 0,
      transition: { duration: 0.75, delay, ease: [0.25, 1, 0.5, 1] },
    }),
  },
};

export const levelUnlockItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 24,
    },
  },
};

const accentStyles: Record<SectionAccent, { line: string; tag: string; spot1: string; spot2: string }> = {
  yellow: {
    line: 'from-transparent via-yellow-400 to-transparent',
    tag: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10 shadow-[0_0_12px_rgba(250,204,21,0.25)]',
    spot1: 'bg-yellow-500/12',
    spot2: 'bg-cyan-500/08',
  },
  cyan: {
    line: 'from-transparent via-cyan-400 to-transparent',
    tag: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_12px_rgba(34,211,238,0.25)]',
    spot1: 'bg-cyan-500/12',
    spot2: 'bg-purple-500/08',
  },
  pink: {
    line: 'from-transparent via-pink-500 to-transparent',
    tag: 'text-pink-400 border-pink-400/40 bg-pink-400/10 shadow-[0_0_12px_rgba(244,114,182,0.25)]',
    spot1: 'bg-pink-500/12',
    spot2: 'bg-amber-500/08',
  },
  purple: {
    line: 'from-transparent via-purple-500 to-transparent',
    tag: 'text-purple-400 border-purple-400/40 bg-purple-400/10 shadow-[0_0_12px_rgba(168,85,247,0.25)]',
    spot1: 'bg-purple-500/12',
    spot2: 'bg-cyan-500/08',
  },
  emerald: {
    line: 'from-transparent via-emerald-400 to-transparent',
    tag: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_12px_rgba(16,185,129,0.25)]',
    spot1: 'bg-emerald-500/12',
    spot2: 'bg-yellow-500/08',
  },
  amber: {
    line: 'from-transparent via-amber-400 to-transparent',
    tag: 'text-amber-400 border-amber-400/40 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.25)]',
    spot1: 'bg-amber-500/12',
    spot2: 'bg-pink-500/08',
  },
};

const bgClasses: Record<BgVariant, string> = {
  abyss: 'bg-[#030617] bg-gradient-to-b from-[#020412] via-[#050828] to-[#03061a]',
  indigo: 'bg-[#080b26] bg-gradient-to-b from-[#03061a] via-[#0d0e3a] to-[#060824]',
  midnight: 'bg-[#050718] bg-gradient-to-b from-[#060824] via-[#110732] to-[#08051e]',
  cyber: 'bg-[#0a0728] bg-gradient-to-b from-[#08051e] via-[#160840] to-[#0a0624]',
  noir: 'bg-[#09061c] bg-gradient-to-b from-[#0a0624] via-[#0b1038] to-[#040822]',
  obsidian: 'bg-[#04081c] bg-gradient-to-b from-[#040822] via-[#031830] to-[#020412]',
};

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  className = '',
  children,
  delay = 0,
  stageTag,
  amount = 0.1,
  accent = 'yellow',
  bgVariant = 'abyss',
  animVariant = 'lift',
  showDividerLine = true,
}) => {
  const currentAccent = accentStyles[accent] || accentStyles.yellow;
  const currentBg = bgClasses[bgVariant] || bgClasses.abyss;
  const selectedVariant = sectionAnimationVariants[animVariant] || sectionAnimationVariants.lift;

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={delay}
      variants={selectedVariant}
      className={`relative overflow-hidden transform-gpu transition-colors duration-1000 ${currentBg} ${className}`}
    >
      {/* Top & Bottom Seamless Section Color Blend Overlays */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none z-10" />

      {/* Animated Glowing Top Seam Divider */}
      {showDividerLine && (
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full h-full bg-gradient-to-r ${currentAccent.line}`}
          />
        </div>
      )}

      {/* Ambient Radial Color Spot Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute -top-32 -left-20 w-96 h-96 rounded-full blur-3xl ${currentAccent.spot1}`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className={`absolute -bottom-32 -right-20 w-96 h-96 rounded-full blur-3xl ${currentAccent.spot2}`}
        />
      </div>

      {/* Unlocked Stage Tag (Desktop / Tablet only to prevent mobile overlay collisions) */}
      {stageTag && (
        <div
          className="hidden md:flex absolute top-6 sm:top-8 right-4 sm:right-8 pointer-events-none z-30 items-center"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-pixel uppercase tracking-widest backdrop-blur-md border ${currentAccent.tag}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>{stageTag} [UNLOCKED]</span>
          </div>
        </div>
      )}

      {/* Main Section Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};
