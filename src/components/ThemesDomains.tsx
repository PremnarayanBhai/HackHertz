import React, { useState } from 'react';
import { domains } from '../data/hackathonData';
import {
  BrainCircuit,
  Layout,
  Coins,
  Activity,
  Building2,
  ShieldAlert,
  Gamepad2,
  Cpu,
  Boxes,
  GraduationCap,
  Sprout,
  Glasses,
  Leaf,
  Clapperboard,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { Domain } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

interface ThemesDomainsProps {
  onSelectDomain: (domainId: string) => void;
  onOpenRegister?: (domainId?: string) => void;
}

export const ThemesDomains: React.FC<ThemesDomainsProps> = ({ onSelectDomain, onOpenRegister }) => {
  const [activeDomainModal, setActiveDomainModal] = useState<Domain | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return BrainCircuit;
      case 'ShieldAlert': return ShieldAlert;
      case 'Clapperboard': return Clapperboard;
      case 'AlertTriangle': return AlertTriangle;
      case 'Gamepad2': return Gamepad2;
      case 'GraduationCap': return GraduationCap;
      case 'Layout': return Layout;
      case 'Coins': return Coins;
      case 'Activity': return Activity;
      case 'Building2': return Building2;
      case 'Cpu': return Cpu;
      case 'Boxes': return Boxes;
      case 'Sprout': return Sprout;
      case 'Glasses': return Glasses;
      case 'Leaf': return Leaf;
      default: return Sparkles;
    }
  };

  return (
    <SectionWrapper id="domains" stageTag="STAGE 04" accent="purple" bgVariant="cyber" animVariant="flip-up" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <span>STAGE 04: THEMES & DOMAINS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              THEMES & <span className="font-pixel text-yellow-400 neon-text-yellow">DOMAINS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Choose your arena. Build solutions across {domains.length} high-impact domain tracks or create something totally uninhibited in Open Innovation.
            </p>
          </div>
        </ScrollReveal>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {domains.map((dom, idx) => {
            const IconComp = getIcon(dom.icon);
            return (
              <ScrollReveal key={dom.id} variant="arcade-bounce" delay={idx * 0.1}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="group relative p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full"
                  style={{
                    boxShadow: `0 0 25px ${dom.bgGlow}`
                  }}
                >
                  <div className="space-y-4">
                    
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                      <div
                        className="p-3.5 rounded-xl text-slate-950 font-bold"
                        style={{ backgroundColor: dom.color }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-pixel text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                        {dom.exampleProblemsCount} CHALLENGES
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {dom.name}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {dom.shortDescription}
                      </p>
                    </div>

                    {/* Example Challenges List */}
                    <div className="pt-2 space-y-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-pixel text-slate-400 uppercase tracking-wider block">
                        Sample Challenges:
                      </span>
                      <ul className="space-y-1.5">
                        {dom.exampleProblems.map((prob, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-yellow-400 font-bold">•</span>
                            <span className="line-clamp-1">{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Select Track & Register Action Button */}
                  <div className="pt-6">
                    <a
                      href="https://forms.gle/jY7ijJnAAaY1DT7a8"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        soundManager.playCoin();
                        onSelectDomain(dom.id);
                      }}
                      className="w-full py-3 rounded-xl font-pixel text-xs bg-slate-950 border border-slate-700 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2 group-hover:border-yellow-400 shadow-md"
                    >
                      <span>SELECT TRACK & REGISTER</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
};
