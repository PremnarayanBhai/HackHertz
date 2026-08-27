import React from 'react';
import { Hammer, Lightbulb, Users2, Trophy, ShieldCheck, GraduationCap, Clock, Building2, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { hackathonInfo } from '../data/hackathonData';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';
import { SSIPLogo } from './SSIPLogo';
import { SSITLogo } from './SSITLogo';

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
      description: "Tackle real-world industry problem statements across AI, Cyber Security, Open Innovation, and Defense."
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
                Open to all undergraduate and diploma students from any accredited university or college worldwide. Cross-college teams are welcome!
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

        {/* Organizing Institution Spotlight: Shree Swaminarayan Institute of Technology */}
        <ScrollReveal variant="zoom-in" delay={0.22}>
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.15)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative z-10">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-yellow-500/40 shadow-[0_0_20px_rgba(250,204,21,0.2)] shrink-0 group-hover:scale-105 transition-transform">
                <SSITLogo size="lg" glow={true} className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-pixel text-[10px] border border-yellow-400/40">
                    ORGANIZING INSTITUTE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                    AICTE APPROVED • GTU AFFILIATED
                  </span>
                </div>
                <h3 className="font-bold text-white text-xl sm:text-2xl leading-tight">
                  Shree Swaminarayan Institute of Technology (SSIT)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Established under the auspices of Shree Swaminarayan Vishvamangaldak Trust, SSIT Gandhinagar is committed to technical excellence, research innovations, and empowering the next generation of engineers and entrepreneurs.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-yellow-400" />
                    Bhat, Gandhinagar, Gujarat - 382428
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 relative z-10">
              <a
                href="https://ssit.co.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playCoin()}
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-pixel text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all hover:scale-105"
              >
                <span>VISIT SSIT PORTAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* SSIP Institutional Policy Endorsement */}
        <ScrollReveal variant="arcade-bounce" delay={0.25}>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900/90 to-slate-950/90 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(237,28,36,0.15)]">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="p-3 rounded-xl bg-slate-950 border border-red-500/30 shrink-0">
                <SSIPLogo size="md" glow={true} className="h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-[10px] font-pixel text-red-400 tracking-wider">SUPPORTED BY SSIP</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">Govt. of Gujarat</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Student Startup & Innovation Policy (SSIP) facilitates student innovation, prototype development grants, and early-stage startup nurturing at SSIT.
                </p>
              </div>
            </div>

            <a
              href="http://ssipgujarat.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 hover:text-white font-pixel text-xs flex items-center gap-2 shrink-0 transition-all"
            >
              <span>LEARN MORE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </SectionWrapper>
  );
};
