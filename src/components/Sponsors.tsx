import React from 'react';
import { ExternalLink, FileText, Award, Sparkles, Building2, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';
import { SSIPLogo } from './SSIPLogo';
import { SSITLogo } from './SSITLogo';
import skillDevLogo from '../assets/images/regenerated_image_1787815842354.jpg';
import univynHubLogo from '../assets/images/regenerated_image_1787816195561.jpg';

interface SponsorsProps {
  onOpenSponsorModal: () => void;
}

export interface SponsorEntity {
  id: string;
  name: string;
  category: string;
  tierTag: string;
  logoUrl?: string; // Image URL or asset import
  logoPlaceholderText?: string;
  websiteUrl?: string;
  tagline?: string;
  description: string;
  accentColor: 'yellow' | 'cyan' | 'pink' | 'purple' | 'emerald';
}

export interface CommunityPartnerEntity {
  id: string;
  name: string;
  logoUrl: string;
  bg?: 'white' | 'dark';
}

export const Sponsors: React.FC<SponsorsProps> = ({ onOpenSponsorModal }) => {
  // Official confirmed event sponsors
  const officialSponsors: SponsorEntity[] = [
    {
      id: "sp-01",
      name: "BrainyBeam Info-Tech Pvt. Ltd.",
      category: "Official Sponsor",
      tierTag: "OFFICIAL SPONSOR",
      logoUrl: "/brainybeam-logo.svg",
      logoPlaceholderText: "BrainyBeam Info-Tech",
      tagline: "Better Brains for your Idea",
      description: "",
      accentColor: "yellow"
    },
    {
      id: "sp-02",
      name: "Patel Web Solution",
      category: "Official Sponsor",
      tierTag: "OFFICIAL SPONSOR",
      logoUrl: "/patel-web-solution-logo.svg",
      logoPlaceholderText: "Patel Web Solution",
      tagline: "We believe in quality",
      description: "",
      accentColor: "cyan"
    }
  ];

  // Community Partners (Logos only)
  const communityPartners: CommunityPartnerEntity[] = [
    {
      id: "cp-01",
      name: "{CODERS} CLUB",
      logoUrl: "/coders-club-logo.svg",
      bg: "white"
    },
    {
      id: "cp-03",
      name: "Skill Development Club",
      logoUrl: skillDevLogo,
      bg: "white"
    },
    {
      id: "cp-04",
      name: "Univyn Hub",
      logoUrl: univynHubLogo,
      bg: "white"
    }
  ];

  return (
    <SectionWrapper id="sponsors" stageTag="STAGE 08" accent="cyan" bgVariant="abyss" animVariant="slide-right" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-pixel text-xs">
              <span>STAGE 08: SPONSORS & PARTNERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              SPONSORS & <span className="font-pixel text-cyan-400 neon-text-blue">PARTNERS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Backing the future of student innovation. Connect your brand with 400+ top engineering minds at Shree Swaminarayan Institute of Technology.
            </p>
            
            {/* Quick Deck Access Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onOpenSponsorModal();
                }}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW SPONSORSHIP DECK (PDF)</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 1. Official Event Sponsors Showcase (Two Sponsored Brand Slots) */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-xs font-pixel text-yellow-400 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>OFFICIAL EVENT SPONSORS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                PROUDLY SUPPORTED BY
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-mono">
                Featured industry leaders partnering with HackHertz 2.0 to foster technology and student entrepreneurship.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {officialSponsors.map((sponsor, idx) => {
              const isYellow = sponsor.accentColor === 'yellow';
              const borderColor = isYellow ? 'border-yellow-400/50 hover:border-yellow-400' : 'border-cyan-400/50 hover:border-cyan-400';
              const glowColor = isYellow ? 'hover:shadow-[0_0_35px_rgba(250,204,21,0.25)]' : 'hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]';
              const badgeBg = isYellow ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40' : 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40';

              return (
                <ScrollReveal key={sponsor.id} variant="arcade-bounce" delay={idx * 0.15}>
                  <div
                    onMouseEnter={() => soundManager.playHover()}
                    className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-950 to-[#080d26] border-2 ${borderColor} ${glowColor} transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-xl`}
                  >
                    {/* Top ambient glow */}
                    <div className={`absolute top-0 right-0 w-44 h-44 ${isYellow ? 'bg-yellow-400/10' : 'bg-cyan-400/10'} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                    <div className="space-y-5 relative z-10">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-3">
                        <span className={`px-3 py-1 rounded-full ${badgeBg} border font-pixel text-[10px] tracking-wider`}>
                          {sponsor.tierTag}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Official Partner</span>
                        </span>
                      </div>

                      {/* Sponsor Logo Box Container */}
                      <div className="w-full h-36 sm:h-44 rounded-2xl bg-white/95 border border-slate-700/60 flex items-center justify-center p-3 text-center group-hover:border-yellow-400 transition-colors relative overflow-hidden shadow-inner">
                        {sponsor.logoUrl ? (
                          <img
                            src={sponsor.logoUrl}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-2 text-slate-900">
                            <div className={`w-12 h-12 rounded-2xl bg-slate-900/10 border border-slate-900/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <Building2 className="w-6 h-6 text-slate-800" />
                            </div>
                            <div className="font-pixel text-sm sm:text-base text-slate-900 tracking-wider">
                              {sponsor.logoPlaceholderText}
                            </div>
                            <span className="text-[10px] font-mono text-slate-600">
                              (Insert Sponsor Logo Image Here)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Brand Info */}
                      <div className="space-y-1 text-center sm:text-left pt-1">
                        <h4 className="font-bold text-xl sm:text-2xl text-white group-hover:text-yellow-400 transition-colors">
                          {sponsor.name}
                        </h4>
                        {sponsor.tagline && (
                          <p className="text-xs font-mono text-slate-400">
                            "{sponsor.tagline}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Status Footer */}
                    <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between relative z-10 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>HackHertz 2.0 Sponsor</span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        SSIT Gandhinagar
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* 2. Institutional Host & Policy Innovation Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4">
          {/* Host: SSIT Gandhinagar */}
          <ScrollReveal variant="arcade-bounce" delay={0.1}>
            <div className="p-6 rounded-3xl bg-slate-950/90 border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(250,204,21,0.15)] h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-yellow-500/40 shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.2)] group-hover:scale-105 transition-transform">
                    <SSITLogo size="md" glow={true} className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-pixel text-[10px] border border-yellow-400/40 inline-block mb-1">
                      ORGANIZING INSTITUTE
                    </span>
                    <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                      Shree Swaminarayan Institute of Technology
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Premier engineering & technological institution in Gandhinagar, driving experiential tech education and high-impact student innovation under SSVT Trust.
                </p>
              </div>

              <div className="pt-4 mt-auto border-t border-slate-800/80 flex items-center justify-between relative z-10">
                <span className="text-[11px] font-mono text-slate-400">Bhat, Gandhinagar - 382428</span>
                <a
                  href="https://ssit.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playCoin()}
                  className="px-3.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-pixel text-[10px] flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(250,204,21,0.3)] active:scale-95"
                >
                  <span>PORTAL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Policy Partner: SSIP Gujarat */}
          <ScrollReveal variant="arcade-bounce" delay={0.2}>
            <div className="p-6 rounded-3xl bg-slate-950/90 border-2 border-red-500/40 shadow-[0_0_30px_rgba(237,28,36,0.15)] h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-red-500/40 shrink-0 shadow-[0_0_15px_rgba(237,28,36,0.2)] group-hover:scale-105 transition-transform">
                    <SSIPLogo size="md" glow={true} className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-pixel text-[10px] border border-red-500/40 inline-block mb-1">
                      GOVERNMENT OF GUJARAT
                    </span>
                    <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                      Student Startup & Innovation Policy (SSIP)
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Education Department initiative empowering student inventors and campus startups across Gujarat with seed grants, mentorship, and IPR support.
                </p>
              </div>

              <div className="pt-4 mt-auto border-t border-slate-800/80 flex items-center justify-between relative z-10">
                <span className="text-[11px] font-mono text-slate-400">Education Dept., Gujarat</span>
                <a
                  href="http://ssipgujarat.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playCoin()}
                  className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-pixel text-[10px] flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(237,28,36,0.3)] active:scale-95"
                >
                  <span>SSIP PORTAL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 3. Community Partners (Ecosystem & Tech Communities - Logos Only) */}
        <div className="space-y-6 max-w-5xl mx-auto pt-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-pixel text-cyan-400 uppercase tracking-widest">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>COMMUNITY PARTNERS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                ECOSYSTEM &amp; TECH COMMUNITIES
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-mono">
                Empowered by leading student clubs, developer circles, and technology networks.
              </p>
            </div>
          </ScrollReveal>

          {/* Centered Showcase - Each partner shown exactly once, zero duplicates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto py-2">
            {communityPartners.map((partner) => {
              const isDark = partner.bg === 'dark';
              return (
                <div
                  key={partner.id}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`h-[110px] sm:h-[130px] rounded-2xl ${
                    isDark
                      ? 'bg-slate-950 border border-slate-800 hover:border-cyan-400/70 shadow-md'
                      : 'bg-white border border-slate-200/80 hover:border-cyan-400 shadow-md'
                  } p-4 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] cursor-pointer group/logo`}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover/logo:scale-105 transition-transform duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Become a Sponsor CTA Banner */}
        <ScrollReveal variant="arcade-bounce">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-2 border-dashed border-yellow-400/50 text-center space-y-4 max-w-4xl mx-auto relative overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.15)]">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-pixel text-lg sm:text-2xl text-white">READY TO PARTNER WITH HACKHERTZ 2.0?</h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                Explore our full 8-page Sponsorship Deck, discover customizable tracks, recruitment benefits, and connect directly with our Sponsorship Lead.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onOpenSponsorModal();
                }}
                className="px-8 py-3.5 rounded-xl font-pixel text-xs bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>OPEN SPONSORSHIP DECK</span>
              </button>

              <a
                href="mailto:hackhertz2.0@gmail.com?subject=HackHertz%202.0%20Sponsorship"
                onClick={() => soundManager.playClick()}
                className="px-6 py-3.5 rounded-xl font-pixel text-xs bg-slate-900 text-cyan-400 border border-cyan-400/40 hover:bg-slate-800 transition-all inline-flex items-center gap-2 active:scale-95"
              >
                <span>EMAIL LEAD DIRECTLY</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </SectionWrapper>
  );
};

