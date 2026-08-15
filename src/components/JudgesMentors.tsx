import React, { useState } from 'react';
import { judges, mentors } from '../data/hackathonData';
import { Linkedin, Twitter, Award, Sparkles, Building2 } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const JudgesMentors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'judges' | 'mentors'>('judges');

  return (
    <SectionWrapper id="judges" stageTag="STAGE 09" accent="purple" bgVariant="indigo" animVariant="flip-up" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <span>STAGE 08: EXPERT MASTERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              JUDGES & <span className="font-pixel text-yellow-400 neon-text-yellow">MENTORS</span>
            </h2>
            <p className="text-slate-300 text-lg">
              Evaluated and guided by industry executives, AI leaders, security researchers, and startup founders.
            </p>

            {/* Toggle Tabs */}
            <div className="inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 gap-2 mt-4">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('judges');
                }}
                className={`px-6 py-2.5 rounded-lg font-pixel text-xs transition-all ${
                  activeTab === 'judges'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_#facc15]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JUDGES ({judges.length})
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('mentors');
                }}
                className={`px-6 py-2.5 rounded-lg font-pixel text-xs transition-all ${
                  activeTab === 'mentors'
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_#22d3ee]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MENTORS ({mentors.length})
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Judges View */}
        {activeTab === 'judges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {judges.map((j, idx) => (
              <ScrollReveal key={j.id} variant="pixel-pop" delay={idx * 0.08}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4 text-center">
                    
                    {/* Pixel Frame Photo */}
                    <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                      <img
                        src={j.avatar}
                        alt={j.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">
                        {j.name}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400">{j.designation}</p>
                      <p className="text-xs text-slate-400 font-semibold">{j.company}</p>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {j.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 flex justify-center">
                    <a
                      href={j.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Mentors View */}
        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((m, idx) => (
              <ScrollReveal key={m.id} variant="pixel-pop" delay={idx * 0.08}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4 text-center">
                    
                    {/* Pixel Frame Photo */}
                    <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold">{m.company}</p>
                    </div>

                    {/* Expertise Badges */}
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {m.expertise.map((e) => (
                        <span key={e} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-cyan-300 font-mono border border-slate-800">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 flex justify-center">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </SectionWrapper>
  );
};
