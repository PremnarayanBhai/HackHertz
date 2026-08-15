import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Play, Sparkles, Trophy, Users, ShieldCheck, Music, Disc3 } from 'lucide-react';
import { hackathonInfo } from '../data/hackathonData';
import { soundManager } from '../utils/sound';
import { musicEngine } from '../utils/musicEngine';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';
import { HackHertzLogo } from './HackHertzLogo';
import { HeroPacMaze } from './HeroPacMaze';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(musicEngine.getIsPlaying());

  useEffect(() => {
    const unsub = musicEngine.subscribe(() => {
      setIsMusicPlaying(musicEngine.getIsPlaying());
    });
    return unsub;
  }, []);

  useEffect(() => {
    const targetDate = new Date(hackathonInfo.startDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper id="hero" stageTag="STAGE 01" accent="yellow" bgVariant="abyss" animVariant="lift" className="min-h-screen pt-28 pb-16 flex items-center bg-maze-pattern">
      {/* Retro Glow Backdrops */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <ScrollReveal variant="fade-right" className="lg:col-span-7 space-y-6 text-center flex flex-col items-center">
            
            {/* Status Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <span className="px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-pixel text-[9px] border border-yellow-400/30">
                STAGE 01 [UNLOCKED]
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-pixel text-[10px] sm:text-[11px] text-yellow-400 tracking-widest uppercase">
                OPEN FOR REGISTRATIONS
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs text-slate-300 font-mono">
                Deadline: {hackathonInfo.registrationDeadline}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-4 text-center flex flex-col items-center">
              {/* Official Emblem */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <HackHertzLogo size="xl" variant="badge" className="relative w-24 h-24 sm:w-28 sm:h-28 shadow-2xl group-hover:scale-105 transition-transform" />
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                <span className="block font-pixel text-yellow-400 neon-text-yellow text-3xl sm:text-5xl lg:text-6xl mb-2">
                  {hackathonInfo.name}
                </span>
                <span className="text-slate-100 text-3xl sm:text-5xl font-orbitron">
                  RETRO ARCADE HACK
                </span>
              </h1>
              
              <p className="font-arcade text-xl sm:text-2xl text-cyan-400 tracking-wider text-center">
                {hackathonInfo.tagline}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto text-center leading-relaxed">
              Step into the ultimate 30-hour intercollege technical arcade. Build cutting-edge AI, Web3, FinTech, and Mobile applications, battle on the leaderboard, and claim your share of over <strong className="text-yellow-400">{hackathonInfo.totalPrizePool}</strong> in rewards!
            </p>

            {/* Meta Details Pill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 w-full max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="p-2 rounded-lg bg-yellow-400/10 text-yellow-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-slate-400 block uppercase font-mono">Event Dates</span>
                  <span className="text-sm font-semibold text-slate-100">{hackathonInfo.date}</span>
                </div>
              </div>

              <a
                href={hackathonInfo.mapUrl || "https://maps.app.goo.gl/tKik8JfmTBg5fwu38"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center justify-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 hover:bg-slate-900 transition-all group"
                title="View location on Google Maps"
              >
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-slate-400 block uppercase font-mono group-hover:text-cyan-300">Venue & Mode</span>
                  <span className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{hackathonInfo.mode} • {hackathonInfo.collegeName}</span>
                </div>
              </a>
            </div>

            {/* Countdown Timer Display */}
            <div className="pt-2 w-full flex flex-col items-center">
              <div className="text-xs font-pixel text-slate-400 mb-2 uppercase tracking-widest flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-pink-400" />
                COUNTDOWN TO INSERT COIN
              </div>

              <div className="grid grid-cols-4 gap-3 w-full max-w-md mx-auto">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINS', val: timeLeft.minutes },
                  { label: 'SECS', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/90 border border-yellow-400/30 text-center shadow-[inset_0_0_10px_rgba(250,204,21,0.1)]"
                  >
                    <span className="font-pixel text-xl sm:text-2xl text-yellow-400 block">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="font-arcade text-xs text-slate-400 tracking-widest">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  soundManager.playCoin();
                  onOpenRegister();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="px-8 py-4 rounded-xl font-pixel text-xs sm:text-sm bg-yellow-400 text-slate-950 font-bold tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_25px_rgba(250,204,21,0.6)] flex items-center gap-3 group active:scale-95"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#domains"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-4 rounded-xl font-pixel text-xs text-cyan-400 bg-slate-900/90 border border-cyan-400/40 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                EXPLORE HACKATHON
              </a>

              <button
                onClick={() => {
                  soundManager.playClick();
                  musicEngine.togglePlay();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-5 py-4 rounded-xl font-mono text-xs font-bold border transition-all flex items-center gap-2.5 ${
                  isMusicPlaying
                    ? 'bg-pink-500/20 border-pink-500 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                    : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-yellow-400 hover:border-yellow-400/50'
                }`}
                title={isMusicPlaying ? "Pause Arcade BGM" : "Play 8-Bit Chiptune BGM"}
              >
                {isMusicPlaying ? (
                  <>
                    <Disc3 className="w-4 h-4 text-pink-400 animate-spin" />
                    <span>8-BIT BGM: PLAYING</span>
                  </>
                ) : (
                  <>
                    <Music className="w-4 h-4 text-yellow-400" />
                    <span>PLAY 8-BIT BGM</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 w-full max-w-xl mx-auto text-center">
              <div>
                <span className="font-pixel text-lg text-yellow-400 block">₹XXXX</span>
                <span className="text-xs text-slate-400 font-sans">Prize Pool</span>
              </div>
              <div>
                <span className="font-pixel text-lg text-cyan-400 block">500+</span>
                <span className="text-xs text-slate-400 font-sans">Hackers</span>
              </div>
              <div>
                <span className="font-pixel text-lg text-pink-400 block">30 Hours</span>
                <span className="text-xs text-slate-400 font-sans">Non-stop Hacking</span>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Arcade Animated Visual Canvas */}
          <ScrollReveal variant="fade-left" delay={0.2} className="lg:col-span-5 flex justify-center w-full">
            <HeroPacMaze />
          </ScrollReveal>

        </div>
      </div>
    </SectionWrapper>
  );
};
