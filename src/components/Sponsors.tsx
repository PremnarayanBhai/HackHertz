import React from 'react';
import { sponsors } from '../data/hackathonData';
import { Handshake, ExternalLink, Sparkles, FileText, Download, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

interface SponsorsProps {
  onOpenSponsorModal: () => void;
}

export const Sponsors: React.FC<SponsorsProps> = ({ onOpenSponsorModal }) => {
  const tierCategories = ['Gold', 'Silver', 'Bronze', 'Well Wishers'];

  const officialDeckTiers = [
    {
      name: "TITLE SPONSOR",
      price: "₹50,000+",
      color: "border-yellow-400 text-yellow-400 bg-yellow-400/10",
      glow: "shadow-[0_0_25px_rgba(250,204,21,0.25)]",
      badge: "HIGHEST VISIBILITY",
      features: [
        "Main Event & Open/Close Ceremony",
        "Title Association: 'Company Presents'",
        "Judge Contestants & Keynote Speech",
        "Full Stall & Participant Workshops",
        "Posters, Brochures & Social Shoutouts"
      ]
    },
    {
      name: "GOLD SPONSOR",
      price: "₹25,000 – ₹49,999",
      color: "border-blue-400 text-blue-400 bg-blue-500/10",
      glow: "shadow-[0_0_25px_rgba(96,165,250,0.25)]",
      badge: "HIGH VISIBILITY",
      features: [
        "Stage & Open Ceremony Acknowledgement",
        "Host Seminars & Interactive Workshops",
        "Judge the Contestants & Mentor Teams",
        "Install Dedicated Stalls / Booths",
        "Website, Posters, Brochures & Socials"
      ]
    },
    {
      name: "SILVER SPONSOR",
      price: "₹10,000 – ₹24,999",
      color: "border-cyan-400 text-cyan-400 bg-cyan-500/10",
      glow: "shadow-[0_0_25px_rgba(34,211,238,0.25)]",
      badge: "MEDIUM VISIBILITY",
      features: [
        "Stage Acknowledgement & Mentorship",
        "Install Stalls & Interact with 400+ Hackers",
        "Name & Logo on Website",
        "Advertisement in Brochure & Posters",
        "Dedicated Social Media Shoutouts"
      ]
    },
    {
      name: "PRIZE SPONSOR",
      price: "In-Kind / Equiv.",
      color: "border-pink-400 text-pink-400 bg-pink-500/10",
      glow: "shadow-[0_0_25px_rgba(236,72,153,0.25)]",
      badge: "PRIZE RECOGNITION",
      features: [
        "Recognition During Prize Distribution",
        "Stage Acknowledgement & Co-Branding",
        "Custom Track / Category Mentorship",
        "Posters, Banners & Social Media",
        "Direct Talent Access & Swag Handout"
      ]
    }
  ];

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
              Backing the future of student innovation. Connect your brand with 400+ top engineering minds at Shree Swaminarayan Institute of Technology.
            </p>
            
            {/* Quick Deck Access Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onOpenSponsorModal();
                }}
                className="px-6 py-3 rounded-xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW SPONSORSHIP DECK (PDF)</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Official Sponsorship Tiers from Deck */}
        <div className="space-y-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-pixel text-yellow-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL SPONSORSHIP PACKAGES</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Flexible tiers designed for enterprise leaders, fast-growing startups, and tech communities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officialDeckTiers.map((tier, idx) => (
              <ScrollReveal key={tier.name} variant="pixel-pop" delay={idx * 0.1}>
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playClick();
                    onOpenSponsorModal();
                  }}
                  className={`p-6 rounded-2xl bg-slate-900/90 border-2 ${tier.color.split(' ')[0]} ${tier.glow} transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full cursor-pointer group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-pixel text-xs text-slate-300 group-hover:text-white transition-colors">
                        {tier.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${tier.color}`}>
                        {tier.badge}
                      </span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {tier.price}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-pixel text-slate-400 group-hover:text-yellow-400 transition-colors">
                    <span>VIEW DETAILS</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Past Sponsors Showcase */}
        <div className="space-y-8 pt-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-pixel text-cyan-400 uppercase tracking-widest">
                <Handshake className="w-3.5 h-3.5" />
                <span>PAST SPONSORS & SUPPORTERS</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Organizations that championed previous editions of HackHertz.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sponsors.map((sp, idx) => (
              <ScrollReveal key={sp.id} variant="zoom-in" delay={idx * 0.08}>
                <a
                  href={sp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center space-y-3 h-full text-center"
                >
                  <div className="font-pixel text-lg sm:text-xl text-white group-hover:text-yellow-400 transition-colors tracking-wider">
                    {sp.logo}
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-200 block">{sp.name}</span>
                    {sp.tagline && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-mono text-[10px]">
                        {sp.tagline}
                      </span>
                    )}
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
                className="px-8 py-3.5 rounded-xl font-pixel text-xs bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
              >
                <FileText className="w-4 h-4" />
                <span>OPEN SPONSORSHIP DECK</span>
              </button>

              <a
                href="mailto:hackhertz2.0@gmail.com?subject=HackHertz%202.0%20Sponsorship"
                onClick={() => soundManager.playClick()}
                className="px-6 py-3.5 rounded-xl font-pixel text-xs bg-slate-900 text-cyan-400 border border-cyan-400/40 hover:bg-slate-800 transition-all inline-flex items-center gap-2"
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
