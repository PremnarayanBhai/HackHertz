import React, { useState } from 'react';
import { organizers, hackathonInfo } from '../data/hackathonData';
import { Mail, Phone, MapPin, Send, Linkedin, CheckCircle2, MessageSquare, ExternalLink, Navigation } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

export const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    setFormSent(true);
  };

  return (
    <SectionWrapper id="organization" stageTag="STAGE 10" accent="pink" bgVariant="cyber" animVariant="lift" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <span>STAGE 10: THE CREW</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              <span className="font-pixel text-yellow-400 neon-text-yellow">ORGANIZATION</span>
            </h2>
            <p className="text-slate-300 text-lg">
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
                      <img src={org.avatar} alt={org.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-yellow-400 transition-colors">{org.name}</h4>
                      <span className="text-[11px] font-mono text-yellow-400/90 block mt-0.5 leading-snug">{org.role}</span>
                    </div>

                    <div className="pt-1 text-xs text-slate-400 space-y-1 font-mono">
                      <p className="line-clamp-1 text-[11px]">{org.email}</p>
                      {org.phone && <p className="text-[11px] text-slate-400">{org.phone}</p>}
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

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <ScrollReveal variant="fade-right" className="lg:col-span-5 w-full">
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              <h3 className="font-pixel text-lg text-white">OFFICIAL HEADQUARTERS</h3>

              <div className="space-y-4 text-sm text-slate-300">
                <a
                  href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-slate-900/90 border border-transparent hover:border-yellow-400/30 transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 text-yellow-400 shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Venue & Address</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-yellow-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 group-hover:text-slate-300">{hackathonInfo.venue}, {hackathonInfo.city}</p>
                    <span className="text-[11px] font-mono text-cyan-400 mt-1 inline-flex items-center gap-1 group-hover:underline">
                      <Navigation className="w-3 h-3" /> Open in Google Maps
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Official Email</span>
                    <p className="text-xs text-slate-400 mt-0.5">{hackathonInfo.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-pink-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Helpline Phone</span>
                    <p className="text-xs text-slate-400 mt-0.5">{hackathonInfo.contactPhone}</p>
                  </div>
                </div>
              </div>

              {/* Embedded Interactive Map Card */}
              <a
                href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="block p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-yellow-400/50 transition-all text-center space-y-2 group shadow-md"
              >
                <div className="h-32 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-yellow-400/40 transition-colors">
                  <div className="absolute inset-0 bg-maze-pattern opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <span className="font-pixel text-xs text-yellow-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4 animate-bounce text-red-500" />
                      SSIT CAMPUS MAP
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      <ExternalLink className="w-3 h-3" /> Get Directions (Google Maps)
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Direct Message Form */}
          <ScrollReveal variant="fade-left" delay={0.1} className="lg:col-span-7 w-full">
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <h3 className="font-pixel text-lg text-white">SEND DIRECT MESSAGE</h3>

              {formSent ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-pixel text-sm text-white">MESSAGE TRANSMITTED</h4>
                  <p className="text-xs text-slate-300">
                    Thank you! Our student organizing team will respond to <strong>{email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Johnson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@student.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="Query regarding travel accommodation / domain..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Type your query here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-pixel text-xs bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_#facc15]"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND TRANSMISSION</span>
                  </button>
                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </SectionWrapper>
  );
};
