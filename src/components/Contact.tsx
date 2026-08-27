import React from 'react';
import { organizers, hackathonInfo } from '../data/hackathonData';
import { Phone, MapPin, Linkedin, ExternalLink, Navigation, Instagram, MessageCircle, Sparkles, Radio } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';
import { SSITLogo } from './SSITLogo';

export const Contact: React.FC = () => {
  return (
    <SectionWrapper id="organization" stageTag="STAGE 11" accent="pink" bgVariant="cyber" animVariant="lift" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <span>STAGE 11: ORGANIZATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              <span className="font-pixel text-yellow-400 neon-text-yellow">ORGANIZATION</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Meet the student leadership committee behind HACKHERTZ 2.0 driving operations, technical tracks, sponsorships, and logistics.
            </p>
          </div>
        </ScrollReveal>

        {/* Organizing Team - 7 Member Cards */}
        <div className="space-y-6">
          <ScrollReveal variant="fade-up">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-yellow-400/50" />
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-widest text-center">
                ORGANIZING COMMITTEE LEADS (7 MEMBERS)
              </h3>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-yellow-400/50" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {organizers.map((org, idx) => (
              <ScrollReveal key={org.id} variant="pixel-pop" delay={idx * 0.06}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-yellow-400/60 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] transition-all text-center space-y-3 h-full flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-yellow-400/80 shadow-[0_0_15px_rgba(250,204,21,0.25)] group-hover:scale-105 transition-transform duration-300 relative">
                      <img src={org.avatar} alt={org.name} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full pointer-events-none" />
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-yellow-400 transition-colors">{org.name}</h4>
                      <span className="text-[11px] font-mono text-yellow-400/90 block mt-0.5 leading-snug">{org.role}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <a
                      href={org.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:underline w-full py-1 font-mono"
                    >
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Official Headquarters & Broadcast Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Official Headquarters & Venue Info */}
          <ScrollReveal variant="fade-right" className="lg:col-span-6 w-full h-full">
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 flex flex-col justify-between h-full shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="font-pixel text-lg text-white">OFFICIAL HEADQUARTERS</h3>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <a
                    href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-yellow-400/40 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-slate-950 border border-yellow-500/30 text-yellow-400 shrink-0 group-hover:scale-105 transition-transform">
                      <SSITLogo size="sm" glow={true} className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Shree Swaminarayan Institute of Technology</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-yellow-400 transition-colors" />
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 group-hover:text-slate-300">{hackathonInfo.venue}, {hackathonInfo.city}</p>
                      <span className="text-[11px] font-mono text-cyan-400 mt-1 inline-flex items-center gap-1 group-hover:underline">
                        <Navigation className="w-3 h-3" /> Open in Google Maps
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all">
                    <div className="p-2.5 rounded-xl bg-slate-950 text-pink-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Helpline Phone (Prachi Thakkar)</span>
                      <a href={`tel:${hackathonInfo.contactPhone.replace(/\s+/g, '')}`} className="text-sm font-mono text-pink-400 hover:text-pink-300 hover:underline mt-0.5 block font-bold">
                        {hackathonInfo.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Campus Directions Card */}
              <a
                href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="block p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-yellow-400/50 transition-all text-center space-y-2 group shadow-md mt-4"
              >
                <div className="h-28 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-yellow-400/40 transition-colors">
                  <div className="absolute inset-0 bg-maze-pattern opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <span className="font-pixel text-xs text-yellow-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4 animate-bounce text-red-500" />
                      SSIT CAMPUS MAP (BHAT, GANDHINAGAR)
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 bg-slate-900/80 px-3 py-0.5 rounded-full border border-cyan-500/30">
                      <ExternalLink className="w-3 h-3" /> Get Navigation Route
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Right: Official Social & Announcement Channels */}
          <ScrollReveal variant="fade-left" delay={0.1} className="lg:col-span-6 w-full h-full">
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 flex flex-col justify-between h-full shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-pixel text-lg text-white">OFFICIAL BROADCAST CHANNELS</h3>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Join our official communication hubs for live hackathon announcements, team matching, mentor round timings, and event highlights.
                </p>

                {/* Channel Cards */}
                <div className="space-y-4 pt-2">
                  
                  {/* WhatsApp Channel */}
                  <a
                    href="https://whatsapp.com/channel/0029VbEZ3NeBKfi5Lrh2Ck2w"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playCoin()}
                    id="contact-whatsapp-channel-card"
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border-2 border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-400 transition-colors">WhatsApp Channel</h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-pixel text-[9px] sm:text-[10px] border border-emerald-500/40">OFFICIAL</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">Instant alerts, schedule updates & hackathon announcements</p>
                      </div>
                    </div>
                    <div className="shrink-0 self-end sm:self-auto sm:pl-2">
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono inline-flex items-center gap-1.5 group-hover:bg-emerald-400 transition-colors shadow-md">
                        Join Channel <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>

                  {/* Instagram Channel */}
                  <a
                    href="https://www.instagram.com/ssit_aavishkar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playCoin()}
                    id="contact-instagram-channel-card"
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border-2 border-pink-500/50 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.2)]">
                        <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-pink-400 transition-colors">Instagram</h4>
                          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-pixel text-[9px] sm:text-[10px] border border-pink-500/40">@ssit_aavishkar</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">Behind-the-scenes stories, speaker spotlights & photo reels</p>
                      </div>
                    </div>
                    <div className="shrink-0 self-end sm:self-auto sm:pl-2">
                      <span className="px-3.5 py-1.5 rounded-xl bg-pink-500 text-white font-bold text-xs font-mono inline-flex items-center gap-1.5 group-hover:bg-pink-400 transition-colors shadow-md">
                        Follow <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>

                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <p className="text-xs text-slate-400 font-mono">
                  Need direct assistance? Call Helpline: <strong className="text-pink-400">Prachi Thakkar ({hackathonInfo.contactPhone})</strong>
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </SectionWrapper>
  );
};
