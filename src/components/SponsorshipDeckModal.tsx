import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink, 
  Check, 
  Minus, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Shield, 
  Radio, 
  Layers, 
  GraduationCap, 
  Building2, 
  Award, 
  Users, 
  Zap, 
  Share2, 
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { HackHertzLogo } from './HackHertzLogo';

interface SponsorshipDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export const SponsorshipDeckModal: React.FC<SponsorshipDeckModalProps> = ({ 
  isOpen, 
  onClose,
  initialSlide = 1 
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const totalSlides = 8;

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(initialSlide);
    }
  }, [isOpen, initialSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  if (!isOpen) return null;

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      soundManager.playClick();
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      soundManager.playClick();
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = (page: number) => {
    soundManager.playClick();
    setCurrentSlide(page);
  };

  const handlePrint = () => {
    soundManager.playCoin();
    window.print();
  };

  const slideTitles = [
    "1. Cover Deck",
    "2. About & Domains",
    "3. Organiser (SSIT)",
    "4. Why Sponsor?",
    "5. Tiers & Benefits",
    "6. Past Sponsors",
    "7. Event Gallery",
    "8. Contact & Lead"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#090d24] border-2 border-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.35)] flex flex-col my-auto max-h-[96vh] overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-pixel text-xs">
              HH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs sm:text-sm text-yellow-400 tracking-wider">HACKHERTZ 2.0</span>
                <span className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px]">
                  SPONSORSHIP DECK
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                An Inter-College 30 Hours Hackathon • 8–9 September 2026
              </p>
            </div>
          </div>

          {/* Quick Actions & Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print / Save PDF"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-yellow-400 text-slate-300 hover:text-yellow-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden md:inline">Print / Save PDF</span>
            </button>

            <a
              href="mailto:hackhertz2.0@gmail.com?subject=Sponsorship%20Inquiry%20-%20HACKHERTZ%202.0"
              onClick={() => soundManager.playCoin()}
              className="px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-pixel text-[11px] font-bold hover:bg-cyan-300 transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EMAIL SPONSOR TEAM</span>
            </a>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              aria-label="Close Sponsorship Deck"
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-pink-500 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Selection Sub-bar */}
        <div className="px-3 sm:px-6 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-1 sm:gap-2">
            {slideTitles.map((title, idx) => {
              const pageNum = idx + 1;
              const isActive = currentSlide === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToSlide(pageNum)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] whitespace-nowrap transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(250,204,21,0.3)]'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{title}</span>
                </button>
              );
            })}
          </div>

          <div className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 whitespace-nowrap">
            SLIDE {currentSlide} / {totalSlides}
          </div>
        </div>

        {/* Main Slide Viewer Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-gradient-to-b from-[#090d24] to-[#040614] min-h-[460px]">
          
          {/* SLIDE 1: Cover Deck */}
          {currentSlide === 1 && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8 animate-fadeIn max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>OFFICIAL SPONSORSHIP PROPOSAL</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-pixel text-4xl sm:text-6xl text-yellow-400 neon-text-yellow tracking-wider">
                  hackhertz 2.0
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Sponsorship Deck
                </p>
                <p className="text-cyan-400 font-mono text-base font-semibold">
                  An Inter-College 30 Hours Hackathon
                </p>
              </div>

              {/* Pacman Arcade Graphic */}
              <div className="w-full max-w-md py-4 px-6 rounded-2xl bg-slate-950/80 border border-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.2)]">
                <div className="flex items-center justify-center gap-4 text-2xl animate-pulse">
                  <span>🟡</span>
                  <span className="text-xs font-mono text-yellow-400">••••••••••••</span>
                  <span>👻</span>
                  <span>👾</span>
                  <span>🤖</span>
                </div>
              </div>

              {/* Event Dates & Institution */}
              <div className="space-y-2 pt-2">
                <div className="inline-block px-5 py-2 rounded-xl bg-yellow-400/20 border-2 border-yellow-400 text-yellow-300 font-pixel text-sm sm:text-base">
                  8–9 September 2026
                </div>
                <p className="text-slate-200 font-bold text-base">
                  Shree Swaminarayan Institute of Technology
                </p>
                <p className="text-slate-400 text-xs font-mono">
                  Bhat, Gandhinagar - 382428
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={nextSlide}
                  className="px-6 py-2.5 rounded-xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                >
                  <span>EXPLORE DECK</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* SLIDE 2: What is HackHertz 2.0 & Domains */}
          {currentSlide === 2 && (
            <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto py-2">
              <div className="text-center space-y-3">
                <div className="inline-block px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-pixel text-xs">
                  EVENT OVERVIEW
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  What is <span className="font-pixel text-yellow-400">hackhertz 2.0?</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  HackHertz 2.0 is a <strong>30-hour national-level hackathon</strong> bringing together <strong>400+ students</strong> from across India to innovate, collaborate, and build solutions to real-world challenges.
                </p>
                <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
                  Following its successful first edition in 2025, the event returns on <strong>8–9 September 2026</strong> with a focus on innovation, hands-on learning, and creative problem-solving.
                </p>
              </div>

              {/* 6 Domains Grid matching PDF Page 2 */}
              <div className="space-y-4">
                <h3 className="font-pixel text-center text-sm text-yellow-400 uppercase tracking-wider">
                  EVENT DOMAINS
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/40 text-center space-y-2 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="font-pixel text-xs text-white">Cyber-Security</h4>
                    <p className="text-[11px] text-slate-400">Zero-Trust & Defences</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-400/40 text-center space-y-2 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-400 border border-cyan-400/40 flex items-center justify-center mx-auto">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h4 className="font-pixel text-xs text-white">AI / ML</h4>
                    <p className="text-[11px] text-slate-400">Intelligent Systems</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 text-center space-y-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-pixel text-xs text-white">Defence Tech</h4>
                    <p className="text-[11px] text-slate-400">Strategic Telemetry</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-orange-500/40 text-center space-y-2 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center mx-auto">
                      <Radio className="w-5 h-5" />
                    </div>
                    <h4 className="font-pixel text-xs text-white">Crisis Tech</h4>
                    <p className="text-[11px] text-slate-400">Disaster Mitigation</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-yellow-400/40 text-center space-y-2 shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 flex items-center justify-center mx-auto">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-pixel text-xs text-white">Open Innovation</h4>
                    <p className="text-[11px] text-slate-400">Unrestricted Tech</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 text-center space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h4 className="font-pixel text-xs text-white">ED Tech</h4>
                    <p className="text-[11px] text-slate-400">Next-Gen Education</p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: About The Organiser (SSIT) */}
          {currentSlide === 3 && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto py-2">
              <div className="text-center space-y-3">
                <div className="inline-block px-3 py-1 rounded-md bg-purple-400/10 border border-purple-400/30 text-purple-400 font-pixel text-xs">
                  ACADEMIC LEGACY
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  About The <span className="font-pixel text-cyan-400">Organiser</span>
                </h2>
                <p className="text-yellow-300 font-bold text-base sm:text-lg">
                  Shree Swaminarayan Institute of Technology (SSIT)
                </p>
                <p className="text-slate-400 text-xs font-mono">
                  Bhat, Gandhinagar - 382428
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6 shadow-xl">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  <strong>Shree Swaminarayan Institute of Technology (SSIT)</strong> was established in the year <strong>2001</strong> under the aegis of <strong>Satsang Shiksha Parishad, Gandhinagar</strong> whose members have consummate experience in the fields of education and industry.
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Shree Swaminarayan Institute of Technology is a hub for innovation, learning, and technological excellence. The institute actively conducts events such as <strong>HackHertz</strong>, <strong>Engineers’ Day</strong>, and <strong>Smart India Hackathon (SIH)</strong>, creating platforms for students to showcase their skills, solve real-world problems, and turn ideas into impact.
                </p>

                {/* Major Institutional Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <div className="font-pixel text-cyan-400 text-sm">SMART INDIA HACKATHON</div>
                    <p className="text-xs text-slate-400">Official SIH Host & Participant</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <div className="font-pixel text-yellow-400 text-sm">AI MARATHON</div>
                    <p className="text-xs text-slate-400">National AI Hack Initiative</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <div className="font-pixel text-pink-400 text-sm">SAP CODE UNNATI</div>
                    <p className="text-xs text-slate-400">Industry Skills & Certifications</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Why Sponsor HackHertz 2.0? */}
          {currentSlide === 4 && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
                  PARTNER VALUE
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Why Sponsor <span className="font-pixel text-yellow-400">hackhertz 2.0?</span>
                </h2>
                <p className="text-slate-300 text-sm">
                  Direct reach, talent scouting, and high-impact brand visibility across 400+ student innovators.
                </p>
              </div>

              {/* 5 Pillars matching Page 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-400/40 space-y-2 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-400 border border-cyan-400/40 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-pixel text-sm text-cyan-300">AMPLIFY</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Get your brand seen by <strong>400+ students</strong> and tech enthusiasts across India.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-yellow-400/40 space-y-2 shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-pixel text-sm text-yellow-300">DISCOVER</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Find exceptional talent, fresh perspectives, and potential future tech hires.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-pink-500/40 space-y-2 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-pixel text-sm text-pink-300">INNOVATE</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Engage with creators solving real-world problems through cutting-edge technology.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/40 space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-pixel text-sm text-emerald-300">CONNECT</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Build meaningful relationships with students, developers, mentors, and industry leaders.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/40 space-y-2 sm:col-span-2 lg:col-span-2 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-pixel text-sm text-purple-300">IMPACT</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Empower the next generation to learn, build, experiment, and create solutions with lasting social and industrial value.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* SLIDE 5: Sponsorship Tiers & Benefits Matrix */}
          {currentSlide === 5 && (
            <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
                  TIERS COMPARISON
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  SPONSORSHIP <span className="font-pixel text-yellow-400">TIERS & BENEFITS</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Complete benefits matrix as detailed in the official HackHertz 2.0 Sponsorship Deck.
                </p>
              </div>

              {/* Tiers Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-yellow-400/10 border-2 border-yellow-400 text-center space-y-1">
                  <span className="font-pixel text-xs text-yellow-400 block">TITLE SPONSOR</span>
                  <span className="text-sm font-bold text-white block">₹50,000+</span>
                  <span className="text-[10px] text-yellow-300 font-mono">Highest Visibility</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border-2 border-blue-400 text-center space-y-1">
                  <span className="font-pixel text-xs text-blue-400 block">GOLD SPONSOR</span>
                  <span className="text-sm font-bold text-white block">₹25,000 – ₹49,999</span>
                  <span className="text-[10px] text-blue-300 font-mono">High Visibility</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border-2 border-cyan-400 text-center space-y-1">
                  <span className="font-pixel text-xs text-cyan-400 block">SILVER SPONSOR</span>
                  <span className="text-sm font-bold text-white block">₹10,000 – ₹24,999</span>
                  <span className="text-[10px] text-cyan-300 font-mono">Medium Visibility</span>
                </div>
                <div className="p-3 rounded-xl bg-pink-500/10 border-2 border-pink-400 text-center space-y-1">
                  <span className="font-pixel text-xs text-pink-400 block">PRIZE SPONSOR</span>
                  <span className="text-sm font-bold text-white block">In-Kind / Equiv.</span>
                  <span className="text-[10px] text-pink-300 font-mono">Category Perks</span>
                </div>
              </div>

              {/* Detailed Matrix Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
                <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-mono">
                      <th className="p-3 font-bold text-white">BENEFITS & DELIVERABLES</th>
                      <th className="p-3 text-center text-yellow-400 font-pixel">TITLE (₹50k+)</th>
                      <th className="p-3 text-center text-blue-400 font-pixel">GOLD (₹25k–₹49k)</th>
                      <th className="p-3 text-center text-cyan-400 font-pixel">SILVER (₹10k–₹24k)</th>
                      <th className="p-3 text-center text-pink-400 font-pixel">PRIZE SPONSOR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    
                    {/* Section: EVENT RECOGNITION */}
                    <tr className="bg-slate-900/50">
                      <td colSpan={5} className="p-2.5 font-bold text-yellow-400 font-pixel text-[11px] tracking-wider">
                        ★ EVENT RECOGNITION
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Main Event Recognition</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Stage Acknowledgement</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Welcome at Open Ceremony</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">End the Event (Closing Remarks)</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Judge the Contestants</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>

                    {/* Section: ENGAGEMENT OPPORTUNITIES */}
                    <tr className="bg-slate-900/50">
                      <td colSpan={5} className="p-2.5 font-bold text-cyan-400 font-pixel text-[11px] tracking-wider">
                        ★ ENGAGEMENT OPPORTUNITIES
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Host Seminars / Workshops</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Install Stalls / Booths</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Interact with Participants</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>

                    {/* Section: BRANDING & VISIBILITY */}
                    <tr className="bg-slate-900/50">
                      <td colSpan={5} className="p-2.5 font-bold text-pink-400 font-pixel text-[11px] tracking-wider">
                        ★ BRANDING & VISIBILITY
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Name & Logo on Website</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4 font-semibold text-yellow-300">"Company Presents HackHertz 2.0" (Title Association)</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Posters & Banners</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Pamphlets / Brochures</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Advertisement in Brochure</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Social Media Shoutouts & Posts/Reels</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="p-2.5 pl-4 font-bold text-white">Brand Visibility Level</td>
                      <td className="p-2.5 text-center font-bold text-yellow-400">HIGHEST</td>
                      <td className="p-2.5 text-center font-bold text-blue-400">HIGH</td>
                      <td className="p-2.5 text-center font-bold text-cyan-400">MEDIUM</td>
                      <td className="p-2.5 text-center font-bold text-pink-400">MEDIUM</td>
                    </tr>

                    {/* Section: PRIZE RECOGNITION */}
                    <tr className="bg-slate-900/50">
                      <td colSpan={5} className="p-2.5 font-bold text-emerald-400 font-pixel text-[11px] tracking-wider">
                        ★ PRIZE & ACKNOWLEDGEMENT
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Recognition During Prize Distribution</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-slate-600"><Minus className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 pl-4">Formal Sponsor Acknowledgement</td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                      <td className="p-2.5 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SLIDE 6: Past Sponsors */}
          {currentSlide === 6 && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-pixel text-xs">
                  TRUSTED PARTNERS
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Past <span className="font-pixel text-yellow-400">Sponsors</span>
                </h2>
                <p className="text-slate-300 text-sm">
                  Companies and visionary organizations that backed previous editions of HackHertz.
                </p>
              </div>

              {/* Past Sponsors Grid matching Page 6 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
                
                {/* CREART */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.15)] text-center space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-3xl font-pixel text-cyan-400">🎨 CREART</div>
                    <h3 className="font-bold text-white text-base">CREART</h3>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-300 font-pixel text-xs border border-yellow-400/30 mx-auto">
                    Gold Sponsor
                  </div>
                </div>

                {/* GAP3 */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.15)] text-center space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-3xl font-pixel text-emerald-400 font-extrabold">GAP3</div>
                    <h3 className="font-bold text-white text-base">GAP3</h3>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-pixel text-xs border border-amber-500/30 mx-auto">
                    Bronze Sponsor
                  </div>
                </div>

                {/* AAVISHKAR CODEX INFOTECH LLP */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-purple-400/40 shadow-[0_0_20px_rgba(192,132,252,0.15)] text-center space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-2xl font-pixel text-purple-400">🔮 Aavishkar</div>
                    <h3 className="font-bold text-white text-xs">CodeX Infotech LLP</h3>
                    <p className="text-[10px] text-slate-400 italic">"IF I DECIDE, I CAN."</p>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-300 font-pixel text-xs border border-yellow-400/30 mx-auto">
                    Gold Sponsor
                  </div>
                </div>

                {/* PATEL WEB SOLUTION */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-blue-400/40 shadow-[0_0_20px_rgba(96,165,250,0.15)] text-center space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-3xl font-pixel text-blue-400">p</div>
                    <h3 className="font-bold text-white text-sm">PATEL WEB SOLUTION</h3>
                    <p className="text-[10px] text-slate-400 italic">"We believe in quality"</p>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700 mx-auto">
                    Well Wishers
                  </div>
                </div>

                {/* VEDSHILL.CAREERS */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-red-400/40 shadow-[0_0_20px_rgba(248,113,113,0.15)] text-center space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-red-400 tracking-wider">Vedshil.</div>
                    <p className="text-[10px] font-mono text-slate-400">CAREERS</p>
                    <h3 className="font-bold text-white text-sm">VEDSHILL.CAREERS</h3>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 font-pixel text-xs border border-cyan-400/30 mx-auto">
                    Silver Sponsor
                  </div>
                </div>

                {/* BrainyBeam */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-orange-400/40 shadow-[0_0_20px_rgba(251,146,60,0.15)] text-center space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-red-500">⚡ Brainy</div>
                    <h3 className="font-bold text-white text-sm">BrainyBeam</h3>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700 mx-auto">
                    Well Wishers
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SLIDE 7: Past Events Gallery */}
          {currentSlide === 7 && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 rounded-md bg-pink-400/10 border border-pink-400/30 text-pink-400 font-pixel text-xs">
                  CAMPUS MEMORIES
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Past Events <span className="font-pixel text-yellow-400">Photos</span>
                </h2>
                <p className="text-slate-300 text-sm">
                  Glimpses of high-energy building sessions, award ceremonies, and community celebration.
                </p>
              </div>

              {/* Photo Collage matching Page 7 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl overflow-hidden border-2 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.2)] group relative">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
                    alt="HackHertz Campus Celebration"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2.5 text-center font-mono text-xs text-yellow-400 border-t border-yellow-400/30">
                    Grand Campus Banner & Inauguration
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)] group relative">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                    alt="Participants and Organizing Team"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2.5 text-center font-mono text-xs text-cyan-400 border-t border-cyan-400/30">
                    Faculty, Mentors & Student Innovators
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border-2 border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.2)] group relative">
                  <img
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600"
                    alt="Prize Distribution & Cheque Award"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2.5 text-center font-mono text-xs text-emerald-400 border-t border-emerald-400/30">
                    Prize Podium & Cheque Distribution
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border-2 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.2)] group relative">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                    alt="Active Coding & Hack Session"
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2.5 text-center font-mono text-xs text-pink-400 border-t border-pink-500/30">
                    30-Hour Intensive Coding Arena
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 8: Thank You & Contact Details */}
          {currentSlide === 8 && (
            <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto py-2 text-center">
              <div className="space-y-2">
                <h1 className="font-pixel text-4xl sm:text-5xl text-yellow-400 neon-text-yellow tracking-wider">
                  Thank You!
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  For inquiries, Contact us.
                </p>
                <div className="pt-2">
                  <a
                    href="mailto:hackhertz2.0@gmail.com"
                    className="inline-block px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 font-mono text-sm sm:text-base hover:bg-cyan-400/20 transition-colors"
                  >
                    hackhertz2.0@gmail.com
                  </a>
                </div>
              </div>

              {/* Lead Contact Card matching Page 8 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border-2 border-yellow-400/60 shadow-[0_0_30px_rgba(250,204,21,0.25)] text-center space-y-4 max-w-lg mx-auto">
                <div className="space-y-1">
                  <div className="inline-block px-3 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-pixel text-xs border border-yellow-400/40 mb-1">
                    SPONSORSHIP LEAD
                  </div>
                  <h3 className="font-pixel text-2xl text-white">
                    Naithani Mahak
                  </h3>
                  <p className="text-base font-mono text-cyan-400 font-bold">
                    +91 7574898949
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <a
                    href="mailto:hackhertz2.0@gmail.com?subject=Sponsorship%20Proposal%20-%20HACKHERTZ%202.0"
                    onClick={() => soundManager.playClick()}
                    className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-pixel text-xs font-bold hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>EMAIL DIRECTLY</span>
                  </a>

                  <a
                    href="tel:+917574898949"
                    onClick={() => soundManager.playClick()}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-yellow-400 border border-yellow-400/50 hover:bg-slate-800 font-pixel text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>CALL / WHATSAPP</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:text-white font-mono text-xs transition-all flex items-center gap-1.5"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LINKEDIN</span>
                  </a>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-2 text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
                <span>Learn More at:</span>
                <span className="font-pixel text-yellow-400">hackhertz 2.0</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Navigation Controls */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-3">
          
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className={`px-4 py-2 rounded-xl font-pixel text-xs flex items-center gap-1.5 transition-all ${
              currentSlide === 1
                ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                : 'bg-slate-900 text-slate-200 border border-slate-700 hover:border-yellow-400 hover:text-yellow-400'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV</span>
          </button>

          {/* Dots progress indicator */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = currentSlide === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToSlide(pageNum)}
                  title={`Go to Slide ${pageNum}`}
                  className={`transition-all rounded-full ${
                    isCurrent
                      ? 'w-6 h-2 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                      : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className={`px-4 py-2 rounded-xl font-pixel text-xs flex items-center gap-1.5 transition-all ${
              currentSlide === totalSlides
                ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                : 'bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
            }`}
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};

export default SponsorshipDeckModal;
