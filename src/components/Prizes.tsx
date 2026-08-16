import React from 'react';
import { prizes } from '../data/hackathonData';
import { Crown, Award, Medal } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const Prizes: React.FC = () => {
  const topPodium = prizes.filter((p) => p.rank);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return Crown;
      case 'Award': return Award;
      case 'Medal': return Medal;
      default: return Award;
    }
  };

  return (
    <SectionWrapper id="prizes" stageTag="STAGE 07" accent="amber" bgVariant="cyber" animVariant="zoom-in" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <span>STAGE 06: THE HIGH SCORES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              PRIZE <span className="font-pixel text-yellow-400 neon-text-yellow">PODIUM</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Podium Display (2nd, 1st, 3rd) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end max-w-5xl mx-auto pt-8">
          
          {/* 2nd Place */}
          {topPodium.find(p => p.rank === 2) && (() => {
            const p = topPodium.find(p => p.rank === 2)!;
            const Icon = getIcon(p.icon);
            return (
              <ScrollReveal variant="fade-up" delay={0.1} className="lg:order-1 w-full">
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-6 rounded-2xl bg-slate-900/90 border-2 border-slate-300 shadow-[0_0_25px_rgba(226,232,240,0.3)] space-y-4 hover:-translate-y-2 transition-transform"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-pixel text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded">2ND PLACE</span>
                    <div className="p-3 rounded-xl bg-slate-800 text-slate-200">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <span className="font-pixel text-3xl text-white block neon-text-blue">{p.amount}</span>
                    <h3 className="font-bold text-lg text-slate-200">{p.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            );
          })()}

          {/* 1st Place - Center Champion (Elevated) */}
          {topPodium.find(p => p.rank === 1) && (() => {
            const p = topPodium.find(p => p.rank === 1)!;
            const Icon = getIcon(p.icon);
            return (
              <ScrollReveal variant="arcade-bounce" delay={0.2} className="lg:order-2 w-full">
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-8 rounded-2xl bg-slate-900 border-2 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.5)] space-y-5 lg:-translate-y-6 hover:-translate-y-8 transition-transform relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 font-pixel text-[10px] font-bold px-4 py-1 rounded-full shadow-[0_0_10px_#facc15] uppercase tracking-widest">
                    ★ GRAND CHAMPION ★
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-pixel text-xs text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded border border-yellow-400/40">1ST PLACE</span>
                    <div className="p-3.5 rounded-xl bg-yellow-400 text-slate-950 shadow-[0_0_15px_#facc15]">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  <div>
                    <span className="font-pixel text-4xl text-yellow-400 block neon-text-yellow">{p.amount}</span>
                    <h3 className="font-extrabold text-xl text-white">{p.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            );
          })()}

          {/* 3rd Place */}
          {topPodium.find(p => p.rank === 3) && (() => {
            const p = topPodium.find(p => p.rank === 3)!;
            const Icon = getIcon(p.icon);
            return (
              <ScrollReveal variant="fade-up" delay={0.3} className="lg:order-3 w-full">
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-6 rounded-2xl bg-slate-900/90 border-2 border-orange-400/80 shadow-[0_0_25px_rgba(251,146,60,0.3)] space-y-4 hover:-translate-y-2 transition-transform"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-pixel text-xs text-orange-400 bg-orange-400/10 px-3 py-1 rounded">3RD PLACE</span>
                    <div className="p-3 rounded-xl bg-slate-800 text-orange-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div>
                    <span className="font-pixel text-3xl text-orange-400 block">{p.amount}</span>
                    <h3 className="font-bold text-lg text-slate-200">{p.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            );
          })()}

        </div>

      </div>
    </SectionWrapper>
  );
};
