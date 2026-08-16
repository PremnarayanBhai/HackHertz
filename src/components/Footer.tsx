import React from 'react';
import { Heart, Github, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { hackathonInfo } from '../data/hackathonData';
import { soundManager } from '../utils/sound';
import { HackHertzLogo } from './HackHertzLogo';

interface FooterProps {
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister }) => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050714] border-t border-slate-800 relative pt-16 pb-8 overflow-hidden">
      
      {/* Animated Retro Dot-Eater Footer Strip */}
      <div className="w-full bg-slate-950 border-y border-yellow-400/30 py-3 mb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between font-pixel text-[10px] text-yellow-400">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] animate-pulse" />
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              <div className="w-2 h-2 rounded-full bg-yellow-200" />
            </div>
          </div>

          <span className="animate-pulse">HIGH SCORE 999,990 • GAME OVER IS NOT AN OPTION</span>

          <div className="flex items-center gap-2 text-pink-400">
            <span>© 2026 {hackathonInfo.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <HackHertzLogo size="sm" variant="badge" className="w-11 h-11" />
              <span className="font-pixel text-xl text-yellow-400 tracking-wider">
                {hackathonInfo.name}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The premier national intercollege technical arcade hackathon. Hosted by {hackathonInfo.collegeName}.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={hackathonInfo.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={hackathonInfo.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={hackathonInfo.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={hackathonInfo.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-400/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">QUICK NAVIGATION</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="https://forms.gle/jY7ijJnAAaY1DT7a8"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playCoin()}
                    className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>★ Register Now (Google Form)</span>
                  </a>
                </li>
                <li><a href="#about" className="hover:text-white transition-colors">About Event</a></li>
                <li><a href="#domains" className="hover:text-white transition-colors">Domains & Tracks</a></li>
                <li><a href="#problems" className="hover:text-white transition-colors">Problem Statements (Coming Soon)</a></li>
                <li><a href="#timeline" className="hover:text-white transition-colors">Maze Timeline</a></li>
                <li><a href="#prizes" className="hover:text-white transition-colors">Prize Podium</a></li>
                <li><a href="#sponsors" className="hover:text-white transition-colors">Sponsors & Partners</a></li>
                <li><a href="#patrons" className="hover:text-white transition-colors">Patrons & Leadership</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"} target="_blank" rel="noopener noreferrer" className="text-yellow-400/90 hover:text-yellow-300 transition-colors flex items-center gap-1">Campus Map (Google Maps)</a></li>
              </ul>
            </div>

          {/* Legal & Policies */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-pixel text-xs text-cyan-400 uppercase tracking-wider">LEGAL & CODE OF CONDUCT</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Code of Conduct</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#organization" className="hover:text-white transition-colors">Organization</a></li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-pixel text-slate-300 hover:text-yellow-400 hover:border-yellow-400 transition-colors flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4" /> BACK TO TOP
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 {hackathonInfo.name}. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for hackers nationwide.
          </span>
        </div>
      </div>
    </footer>
  );
};
