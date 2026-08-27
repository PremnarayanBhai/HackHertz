import React from 'react';
import { chiefPatron, coPatron, headsOfDepartment } from '../data/hackathonData';
import { Crown, Star, GraduationCap, Building2, Linkedin } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';
import { SSITLogo } from './SSITLogo';

export const PatronsLeadership: React.FC = () => {
  return (
    <SectionWrapper id="patrons" stageTag="STAGE 09" accent="purple" bgVariant="indigo" animVariant="flip-up" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <SSITLogo size="xs" glow={false} className="w-4 h-4" />
              <span>STAGE 09: PATRONS & HEADS OF DEPARTMENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              PATRONS & <span className="font-pixel text-yellow-400 neon-text-yellow">HEADS OF DEPARTMENT</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Esteemed institutional mentors, visionary patrons, and academic leaders at <strong className="text-yellow-400 font-semibold">Shree Swaminarayan Institute of Technology (SSIT)</strong> guiding HACKHERTZ 2.0.
            </p>
          </div>
        </ScrollReveal>

        {/* Tier 1: Chief Patron & Co-Patron */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Chief Patron: Dharmesh Sir */}
          <ScrollReveal variant="pixel-pop" delay={0.1}>
            <div
              onMouseEnter={() => soundManager.playHover()}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-yellow-400/80 shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.35)] transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 font-pixel text-[11px] flex items-center gap-1.5 shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                <Crown className="w-3.5 h-3.5 text-yellow-400" />
                <span>CHIEF PATRON</span>
              </div>

              <div className="space-y-5 text-center mt-2">
                {/* Photo */}
                <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.4)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={chiefPatron.avatar}
                    alt={chiefPatron.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('unsplash')) {
                        target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none" />
                </div>

                <div>
                  <h3 className="font-pixel text-xl sm:text-2xl text-white group-hover:text-yellow-400 transition-colors">
                    {chiefPatron.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1.5 flex-wrap">
                    <span className="px-3 py-0.5 rounded bg-yellow-400/15 text-yellow-300 text-xs font-mono font-bold border border-yellow-400/40">
                      Director, SSIT
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-yellow-400 text-xs font-mono border border-slate-700">
                      Chief Patron
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold mt-2.5 flex items-center justify-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-yellow-400/80" />
                    <span>{chiefPatron.institution}</span>
                  </p>
                </div>

                {chiefPatron.bio && (
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    {chiefPatron.bio}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-6 flex justify-center">
                <a
                  href={chiefPatron.linkedin || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors border border-slate-800"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Co-Patron: Principal Sir */}
          <ScrollReveal variant="pixel-pop" delay={0.2}>
            <div
              onMouseEnter={() => soundManager.playHover()}
              className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 font-pixel text-[11px] flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                <Star className="w-3.5 h-3.5 text-cyan-400" />
                <span>CO-PATRON</span>
              </div>

              <div className="space-y-5 text-center mt-2">
                {/* Photo */}
                <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={coPatron.avatar}
                    alt={coPatron.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('unsplash')) {
                        target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400";
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none" />
                </div>

                <div>
                  <h3 className="font-pixel text-xl sm:text-2xl text-white group-hover:text-cyan-400 transition-colors">
                    {coPatron.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1.5 flex-wrap">
                    <span className="px-3 py-0.5 rounded bg-cyan-400/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-400/40">
                      Principal, SSIT
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-400 text-xs font-mono border border-slate-700">
                      Co-Patron
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold mt-2.5 flex items-center justify-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400/80" />
                    <span>{coPatron.institution}</span>
                  </p>
                </div>

                {coPatron.bio && (
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    {coPatron.bio}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-6 flex justify-center">
                <a
                  href={coPatron.linkedin || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-950 text-xs font-mono text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors border border-slate-800"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Tier 2: Head of Department (Darshan Sir, Dr. Ramesh T. Prajapati, Niraj Sir) */}
        <div className="space-y-8 pt-4">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-pink-500/60" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-pixel text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>HEAD OF DEPARTMENT</span>
              </div>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-pink-500/60" />
            </div>
          </ScrollReveal>

          {/* 3 HOD Cards in exact order: Darshan Sir, Dr. Ramesh T. Prajapati, Niraj Sir */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {headsOfDepartment.map((hod, idx) => (
              <ScrollReveal key={hod.id} variant="pixel-pop" delay={0.15 + idx * 0.1}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/60 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div className="space-y-4 text-center">
                    
                    {/* Photo */}
                    <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={hod.avatar}
                        alt={hod.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('unsplash')) {
                            // Fallback portraits
                            const fallbacks = [
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                              "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
                            ];
                            target.src = fallbacks[idx] || fallbacks[0];
                          }
                        }}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                    </div>

                    <div>
                      <h4 className="font-pixel text-base sm:text-lg text-white group-hover:text-pink-400 transition-colors">
                        {hod.name}
                      </h4>
                      <div className="inline-block mt-1 px-2.5 py-0.5 rounded bg-pink-500/10 text-pink-300 text-xs font-mono font-semibold border border-pink-500/30">
                        {hod.role}
                      </div>
                      {hod.department && (
                        <p className="text-xs font-mono text-cyan-400 mt-1">{hod.department}</p>
                      )}
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{hod.institution}</p>
                    </div>

                    {hod.bio && (
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                        {hod.bio}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 flex justify-center">
                    <a
                      href={hod.linkedin || "https://linkedin.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 text-xs font-mono text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-colors border border-slate-800"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default PatronsLeadership;
