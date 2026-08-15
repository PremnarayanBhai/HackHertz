import React, { useState } from 'react';
import { timelineEvents } from '../data/hackathonData';
import { CheckCircle2, Clock, Play, Trophy, Award, UserPlus, Calendar, ListFilter, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const Timeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>(timelineEvents[0].id);
  const [viewMode, setViewMode] = useState<'roadmap' | 'table'>('roadmap');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserPlus': return UserPlus;
      case 'Clock': return Clock;
      case 'CheckCircle2': return CheckCircle2;
      case 'Play': return Play;
      case 'Trophy': return Trophy;
      default: return Award;
    }
  };

  return (
    <SectionWrapper id="timeline" stageTag="STAGE 05" accent="emerald" bgVariant="noir" animVariant="glitch-reveal" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-pixel text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STAGE 05: THE MASTER TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              HACKHERTZ 2.0 <span className="font-pixel text-pink-400 neon-text-pink">TIMELINE</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Official phase schedule from registration opening to final judging and grand victory ceremony.
            </p>

            {/* View Mode Switcher */}
            <div className="pt-2 flex items-center justify-center gap-2">
              <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('roadmap');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    viewMode === 'roadmap'
                      ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(244,114,182,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>ROADMAP VIEW</span>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('table');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    viewMode === 'table'
                      ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(244,114,182,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>SCHEDULE TABLE</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* View 1: Schedule Table View */}
        {viewMode === 'table' && (
          <ScrollReveal variant="fade-up">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-mono uppercase text-slate-400 tracking-wider">
                      <th className="py-4 px-6 font-semibold w-44">Date</th>
                      <th className="py-4 px-6 font-semibold w-72">Phase</th>
                      <th className="py-4 px-6 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {timelineEvents.map((item) => {
                      const IconComp = getIcon(item.icon);
                      const isCurrent = item.status === 'current';

                      return (
                        <tr 
                          key={item.id}
                          className={`group transition-colors ${
                            isCurrent 
                              ? 'bg-yellow-400/5 hover:bg-yellow-400/10' 
                              : 'hover:bg-slate-800/40'
                          }`}
                        >
                          {/* Date Column */}
                          <td className="py-5 px-6 align-top">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-cyan-400 text-sm whitespace-nowrap">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{item.date}</span>
                            </div>
                            {item.time && (
                              <div className="text-[11px] font-mono text-slate-500 mt-1 pl-1">
                                {item.time}
                              </div>
                            )}
                          </td>

                          {/* Phase Column */}
                          <td className="py-5 px-6 align-top">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg mt-0.5 ${
                                isCurrent 
                                  ? 'bg-yellow-400 text-slate-950 ring-2 ring-yellow-400/40' 
                                  : 'bg-slate-800 text-pink-400 border border-slate-700'
                              }`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-white group-hover:text-pink-400 transition-colors text-base flex items-center gap-2">
                                  <span>{item.title}</span>
                                </h4>
                                {isCurrent && (
                                  <span className="inline-block mt-1 font-pixel text-[9px] uppercase px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-bold animate-pulse">
                                    LIVE NOW
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Details Column */}
                          <td className="py-5 px-6 align-top text-slate-300 leading-relaxed">
                            <p>{item.description}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* View 2: Visual Maze Roadmap View */}
        {viewMode === 'roadmap' && (
          <div className="relative py-4">
            
            {/* Vertical Glowing Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-pink-500 to-cyan-400 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.5)]" />

            <div className="space-y-12 relative z-10">
              {timelineEvents.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const IconComp = getIcon(item.icon);
                const isSelected = selectedMilestone === item.id;

                return (
                  <ScrollReveal 
                    key={item.id} 
                    variant={isEven ? "fade-right" : "fade-left"}
                    delay={0.05}
                  >
                    <div
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedMilestone(item.id);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`flex flex-col md:flex-row items-center cursor-pointer group ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      
                      {/* Content Card Side */}
                      <div className="w-full md:w-1/2 px-0 md:px-8">
                        <div
                          className={`p-6 rounded-2xl bg-slate-900/90 border transition-all duration-300 ${
                            isSelected
                              ? 'border-pink-500 shadow-[0_0_30px_rgba(244,114,182,0.4)] scale-102 bg-slate-900'
                              : 'border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-pixel text-[10px] text-yellow-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                              {item.badge}
                            </span>

                            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                              item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                              item.status === 'current' ? 'bg-yellow-400 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {item.status === 'current' ? '• LIVE NOW' : item.status}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors mb-1">
                            {item.title}
                          </h3>

                          <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.date}</span>
                            {item.time && (
                              <>
                                <span>•</span>
                                <span>{item.time}</span>
                              </>
                            )}
                          </div>

                          <p className="text-slate-300 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Node Circle Center */}
                      <div className="my-4 md:my-0 flex items-center justify-center relative z-20">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-950 transition-all ${
                            item.status === 'current'
                              ? 'bg-yellow-400 ring-4 ring-yellow-400/50 shadow-[0_0_20px_#facc15] scale-110'
                              : item.status === 'completed'
                              ? 'bg-emerald-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Empty Spacer Side */}
                      <div className="w-full md:w-1/2 px-8 hidden md:block" />

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </SectionWrapper>
  );
};

