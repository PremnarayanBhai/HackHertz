import React from 'react';
import { Hammer, Lightbulb, Users2, Trophy, ShieldCheck, GraduationCap, Clock, Building2, CheckCircle2 } from 'lucide-react';
import { hackathonInfo } from '../data/hackathonData';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const About: React.FC = () => {
  const corePillars = [
    {
      title: "BUILD",
      icon: Hammer,
      color: "#facc15",
      glow: "rgba(250, 204, 21, 0.2)",
      description: "Transform ambitious ideas into production-ready software prototypes in 30 continuous hours of intense coding."
    },
    {
      title: "INNOVATE",
      icon: Lightbulb,
      color: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.2)",
      description: "Tackle real-world industry problem statements across AI, FinTech, Cybersecurity, and Open Innovation."
    },
    {
      title: "COLLABORATE",
      icon: Users2,
      color: "#f472b6",
      glow: "rgba(244, 114, 182, 0.2)",
      description: "Team up with brilliant minds from across the nation to build high-impact tech solutions."
    },
    {
      title: "WIN",
      icon: Trophy,
      color: "#34d399",
      glow: "rgba(52, 211, 153, 0.2)",
      description: "Compete for ₹XXXX in cash prizes, cloud credits, sponsor job offers, and eternal high-score arcade glory!"
    }
  ];

  return (
    <SectionWrapper id="about" stageTag="STAGE 02" accent="cyan" bgVariant="indigo" animVariant="slide-right" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <span>STAGE 02: THE MISSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              ABOUT <span className="font-pixel text-yellow-400 neon-text-yellow">{hackathonInfo.name}</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Organized by <strong className="text-cyan-400">{hackathonInfo.collegeName}</strong>, {hackathonInfo.name} is an arcade-themed national intercollege hackathon engineered to unite the brightest student engineers, creators, and visionaries.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pillar Arcade Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} variant="arcade-bounce" delay={idx * 0.12}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 shadow-lg h-full"
                  style={{
                    boxShadow: `0 0 20px ${pillar.glow}`
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-pixel text-slate-950 mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: pillar.color }}
                  >
                    <IconComp className="w-6 h-6 text-slate-950" />
                  </div>

                  <div className="font-pixel text-xs text-slate-400 mb-1">PART 0{idx + 1}</div>
                  <h3 className="font-pixel text-lg text-white mb-2" style={{ color: pillar.color }}>
                    {pillar.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Detail Matrix Grid */}
        <ScrollReveal variant="zoom-in" delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 rounded-2xl bg-slate-950/80 border border-yellow-400/30">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-yellow-400">
                <GraduationCap className="w-6 h-6" />
                <h4 className="font-pixel text-sm text-white">WHO CAN PARTICIPATE?</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Open to all undergraduate, postgraduate, and diploma students from any accredited university or college worldwide. Cross-college teams are welcome!
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-cyan-400">
                <Users2 className="w-6 h-6" />
                <h4 className="font-pixel text-sm text-white">TEAM ARCHITECTURE</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Teams of <strong>{hackathonInfo.teamSizeMin} to {hackathonInfo.teamSizeMax} members</strong>. Cross-college teams and multidisciplinary team compositions are welcome!
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-pink-400">
                <Clock className="w-6 h-6" />
                <h4 className="font-pixel text-sm text-white">DURATION & MODE</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong>30 Continuous Hours</strong> of hackathon time in <strong>{hackathonInfo.mode} Mode</strong> at <a href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline font-medium inline-flex items-center gap-1">{hackathonInfo.venue}</a>.
              </p>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </SectionWrapper>
  );
};
