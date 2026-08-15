import React from 'react';
import { Trophy, Award, Code, Compass } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const WhyParticipate: React.FC = () => {
  const benefits = [
    {
      title: "₹XXXX Cash Pool",
      desc: "Direct cash rewards for top 3 teams, domain track winners, and special category awards.",
      icon: Trophy,
      ghostColor: "text-yellow-400",
      borderColor: "hover:border-yellow-400/60"
    },
    {
      title: "Verifiable Certificates",
      desc: "Official digital credentials signed by Shree Swaminarayan Institute of Technology and industry leaders for all finishers.",
      icon: Award,
      ghostColor: "text-emerald-400",
      borderColor: "hover:border-emerald-400/60"
    },
    {
      title: "Open-Source Impact",
      desc: "Publish your solution, gain GitHub stars, and contribute real tools to the dev ecosystem.",
      icon: Code,
      ghostColor: "text-amber-400",
      borderColor: "hover:border-amber-400/60"
    },
    {
      title: "Pan-India Networking",
      desc: "Connect with 500+ top student developers, designers, and innovators across India.",
      icon: Compass,
      ghostColor: "text-rose-400",
      borderColor: "hover:border-rose-400/60"
    }
  ];

  return (
    <SectionWrapper id="why" stageTag="STAGE 03" accent="pink" bgVariant="midnight" animVariant="zoom-in" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-pixel text-xs">
              <span>POWER-UPS & REWARDS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              WHY <span className="font-pixel text-cyan-400 neon-text-blue">PARTICIPATE?</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Every hacker leaves HACKHERTZ 2.0 with valuable power-ups, recognized credentials, and unforgettable memories.
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid with Arcade Ghost Motif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <ScrollReveal key={b.title} variant="pixel-pop" delay={idx * 0.08}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className={`p-6 rounded-2xl bg-slate-900/80 border border-slate-800 ${b.borderColor} transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden h-full`}
                >
                  {/* Background Ghost Motif Visual */}
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none">
                    <div className="w-16 h-16 rounded-t-full bg-current flex items-center justify-center gap-1 text-slate-100">
                      <div className="w-2 h-2 rounded-full bg-slate-950" />
                      <div className="w-2 h-2 rounded-full bg-slate-950" />
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit mb-4 ${b.ghostColor}`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="font-pixel text-sm text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
};
