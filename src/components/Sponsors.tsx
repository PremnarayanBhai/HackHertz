import React from 'react';
import { sponsors } from '../data/hackathonData';
import { Handshake, ExternalLink, Sparkles, PlusCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

interface SponsorsProps {
  onOpenSponsorModal: () => void;
}

export const Sponsors: React.FC<SponsorsProps> = ({ onOpenSponsorModal }) => {
  const tiers = ['Title', 'Gold', 'Silver', 'Community', 'Media'];

  return (
    <SectionWrapper id="sponsors" stageTag="STAGE 08" accent="cyan" bgVariant="abyss" animVariant="slide-right" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-pixel text-xs">
              <span>STAGE 07: COIN PROVIDERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              SPONSORS & <span className="font-pixel text-cyan-400 neon-text-blue">PARTNERS</span>
            </h2>
            <p className="text-slate-300 text-lg">
              Backing the future of student innovation. Powered by world-class technology leaders and industry pioneers.
            </p>
          </div>
        </ScrollReveal>

        {/* Tier Groups */}
        <div className="space-y-12">
          {tiers.map((tierName) => {
            const tierSponsors = sponsors.filter((s) => s.tier === tierName);
            if (tierSponsors.length === 0) return null;

            return (
              <div key={tierName} className="space-y-4 text-center">
                <ScrollReveal variant="fade-up">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-pixel text-slate-400 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{tierName} PARTNERS</span>
                  </div>
                </ScrollReveal>

                <div className={`grid gap-6 ${
                  tierName === 'Title' ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' :
                  tierName === 'Gold' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {tierSponsors.map((sp, idx) => (
                    <ScrollReveal key={sp.id} variant="zoom-in" delay={idx * 0.1}>
                      <a
                        href={sp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => soundManager.playHover()}
                        onClick={() => soundManager.playClick()}
                        className={`group p-6 rounded-2xl bg-slate-900/80 border transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center space-y-3 h-full ${
                          tierName === 'Title'
                            ? 'border-yellow-400/50 shadow-[0_0_25px_rgba(250,204,21,0.2)] p-8'
                            : 'border-slate-800 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="font-pixel text-xl sm:text-2xl text-white group-hover:text-yellow-400 transition-colors tracking-wider">
                          {sp.logo}
                        </div>

                        <div className="text-center space-y-1">
                          <span className="text-sm font-bold text-slate-200 block">{sp.name}</span>
                          {sp.description && (
                            <p className="text-xs text-slate-400 line-clamp-1">{sp.description}</p>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Visit Website <ExternalLink className="w-3 h-3" />
                        </span>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Become a Sponsor CTA Banner */}
        <ScrollReveal variant="arcade-bounce">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-2 border-dashed border-cyan-400/40 text-center space-y-4 max-w-4xl mx-auto relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 flex items-center justify-center mx-auto">
              <Handshake className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-pixel text-lg sm:text-xl text-white">WANT TO SPONSOR HACKHERTZ 2.0?</h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                Custom tracks, recruiting access, keynotes, and product workshops available for enterprise partners and tech startups.
              </p>
            </div>

            <button
              onClick={() => {
                soundManager.playCoin();
                onOpenSponsorModal();
              }}
              className="px-8 py-3.5 rounded-xl font-pixel text-xs bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>BECOME A SPONSOR</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </SectionWrapper>
  );
};
