import React, { useState } from 'react';
import { domains } from '../data/hackathonData';
import {
  Lock,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldAlert,
  BrainCircuit,
  Clapperboard,
  AlertTriangle,
  Gamepad2,
  GraduationCap,
  Calendar,
  Radio,
  FileText,
  KeyRound
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

interface ProblemStatementsProps {
  onOpenRegister: (domainId?: string) => void;
}

export const ProblemStatements: React.FC<ProblemStatementsProps> = ({ onOpenRegister }) => {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'BrainCircuit': return BrainCircuit;
      case 'Clapperboard': return Clapperboard;
      case 'AlertTriangle': return AlertTriangle;
      case 'Gamepad2': return Gamepad2;
      case 'GraduationCap': return GraduationCap;
      default: return Sparkles;
    }
  };

  return (
    <SectionWrapper id="problems" stageTag="STAGE 05" accent="yellow" bgVariant="obsidian" animVariant="slide-left" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <KeyRound className="w-3.5 h-3.5" />
              <span>STAGE 05: PROBLEM STATEMENTS</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span>PROBLEM</span>
              <span className="font-pixel text-yellow-400 neon-text-yellow">STATEMENTS</span>
              <span className="text-[10px] sm:text-sm font-pixel px-2.5 sm:px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping inline-block"></span>
                COMING SOON
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Official challenge statements and industry partner problem specs will be revealed live during the Opening Ceremony. Choose your preferred track and register early!
            </p>
          </div>
        </ScrollReveal>

        {/* Hero Coming Soon Arcade Terminal */}
        <ScrollReveal variant="pixel-pop" delay={0.1}>
          <div className="relative rounded-3xl bg-slate-900/90 border-2 border-yellow-400/40 p-6 sm:p-10 overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.12)]">
            
            {/* Scanline and Glowing Background Ambience */}
            <div className="absolute inset-0 bg-maze-pattern opacity-40 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left Terminal Details */}
              <div className="space-y-6 max-w-2xl text-center lg:text-left">
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-yellow-400/30 text-yellow-300 text-xs font-mono">
                  <Radio className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  <span>SIGNAL TRANSMISSION: ENCRYPTED // LEVEL 04</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-pixel text-xl sm:text-2xl text-white">
                    STAGE 04: UNLOCKS ON HACKATHON DAY
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    To maintain fair competition across all participating colleges, problem statements, detailed technical evaluation rubrics, and sponsor datasets will be unlocked on this stage when the 30-hour countdown begins.
                  </p>
                </div>

                {/* Release Schedule Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Release Date</div>
                      <div className="font-pixel text-xs text-white">SEP 08, 2026</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Live Reveal</div>
                      <div className="font-pixel text-xs text-white">11:00 AM IST</div>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="https://forms.gle/jY7ijJnAAaY1DT7a8"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      soundManager.playCoin();
                    }}
                    className="px-6 py-3.5 rounded-xl font-pixel text-xs bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                  >
                    <span>INSERT COIN / REGISTER</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#rules"
                    onClick={() => soundManager.playClick()}
                    className="px-5 py-3.5 rounded-xl font-mono text-xs bg-slate-950 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>View Rules & Format</span>
                  </a>
                </div>

              </div>

              {/* Right Big Lock Graphic */}
              <div className="shrink-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-950/90 border border-yellow-400/30 text-center space-y-4 shadow-xl">
                <div className="relative w-24 h-24 rounded-2xl bg-yellow-400/10 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.3)]">
                  <Lock className="w-12 h-12 animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-rose-500 animate-ping"></div>
                </div>
                <div className="space-y-1">
                  <div className="font-pixel text-xs text-yellow-400">STATUS: LOCKED</div>
                  <div className="font-mono text-[11px] text-slate-400">6 TRACKS READY FOR REVEAL</div>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* 6 Track Preview Cards - Encrypted Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-pixel text-xs text-slate-300 tracking-wider uppercase">
              UPCOMING CHALLENGE TRACKS (6 DOMAINS)
            </h3>
            <span className="font-mono text-xs text-yellow-400/80">
              [SELECTION AVAILABLE AT REGISTRATION]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((dom, idx) => {
              const IconComp = getDomainIcon(dom.icon);
              const isHovered = hoveredDomain === dom.id;

              return (
                <ScrollReveal key={dom.id} variant="pixel-pop" delay={idx * 0.06}>
                  <div
                    onMouseEnter={() => {
                      soundManager.playHover();
                      setHoveredDomain(dom.id);
                    }}
                    onMouseLeave={() => setHoveredDomain(null)}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-yellow-400/50 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
                  >
                    {/* Top Glow Accent */}
                    <div
                      className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
                      style={{ backgroundColor: dom.color, opacity: isHovered ? 0.35 : 0.1 }}
                    ></div>

                    <div className="space-y-4">
                      
                      {/* Header with Icon & Encrypted Chip */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 border"
                          style={{
                            backgroundColor: `${dom.color}15`,
                            borderColor: `${dom.color}40`,
                            color: dom.color
                          }}
                        >
                          <IconComp className="w-6 h-6" />
                        </div>

                        <span className="font-mono text-[10px] uppercase px-2 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-yellow-400" />
                          <span>COMING SOON</span>
                        </span>
                      </div>

                      {/* Title & Domain Name */}
                      <div>
                        <span className="font-mono text-xs text-slate-400 block mb-1 uppercase">
                          TRACK 0{idx + 1}
                        </span>
                        <h4 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">
                          {dom.name}
                        </h4>
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {dom.shortDescription}
                      </p>

                      {/* Locked problem preview teaser */}
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                        <div className="text-[10px] font-mono text-yellow-400 flex items-center gap-1">
                          <KeyRound className="w-3 h-3" />
                          <span>CHALLENGES PREVIEW</span>
                        </div>
                        <ul className="text-xs text-slate-400 space-y-1 font-sans">
                          {dom.exampleProblems.slice(0, 2).map((ex, i) => (
                            <li key={i} className="line-clamp-1 flex items-center gap-1.5">
                              <span className="text-yellow-400/70">•</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Choose Track CTA */}
                    <div className="pt-5 mt-3 border-t border-slate-800">
                      <a
                        href="https://forms.gle/jY7ijJnAAaY1DT7a8"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          soundManager.playClick();
                        }}
                        className="w-full py-2.5 rounded-xl font-mono text-xs bg-slate-950 border border-slate-700 text-slate-200 hover:bg-yellow-400 hover:text-slate-950 hover:border-yellow-400 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Choose {dom.name.split('&')[0].trim()} (Register)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

