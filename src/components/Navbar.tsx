import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Trophy, Music, Disc3 } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { musicEngine } from '../utils/musicEngine';
import { HackHertzLogo } from './HackHertzLogo';

interface NavbarProps {
  onOpenRegister: () => void;
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  activeSection,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [isMusicPlaying, setIsMusicPlaying] = useState(musicEngine.getIsPlaying());
  const [currentTrackTitle, setCurrentTrackTitle] = useState(musicEngine.getCurrentTrack().title);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = musicEngine.subscribe(() => {
      setIsMusicPlaying(musicEngine.getIsPlaying());
      setCurrentTrackTitle(musicEngine.getCurrentTrack().title);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  const toggleMusic = () => {
    soundManager.playClick();
    musicEngine.togglePlay();
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Domains', href: '#domains' },
    { name: 'Problems', href: '#problems' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'light'
            ? 'bg-slate-100/95 backdrop-blur-md border-b border-amber-500/40 shadow-lg shadow-slate-300/50'
            : 'bg-[#090d24]/90 backdrop-blur-md border-b border-yellow-400/30 shadow-lg shadow-black/50'
          : 'bg-transparent border-b border-slate-700/20'
      }`}
    >
      {/* Maze Accent Top Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-cyan-400 via-pink-500 to-yellow-400 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a
            href="#"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-3 group"
          >
            <HackHertzLogo size="sm" variant="badge" className="group-hover:scale-110 transition-transform duration-300 w-11 h-11" />
            <div>
              <span 
                className="font-pixel text-yellow-400 tracking-wider neon-text-yellow block"
                style={{ fontSize: '18px', lineHeight: '21px', fontWeight: 'normal' }}
              >
                HACKHERTZ
              </span>
              <span 
                className="font-arcade text-cyan-400 tracking-widest uppercase block"
                style={{
                  fontSize: '20px',
                  marginTop: '-11px',
                  marginLeft: '6px',
                  paddingLeft: '56px',
                  paddingRight: '0px',
                  marginRight: '3px'
                }}
              >
                2.0
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                    isActive ? 'text-yellow-400 font-semibold underline decoration-yellow-400 decoration-2 underline-offset-8' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Retro 8-Bit BGM Music Button */}
            <button
              onClick={toggleMusic}
              title={isMusicPlaying ? `Music Playing: ${currentTrackTitle} (Click to pause)` : "Play 8-Bit Retro BGM"}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                isMusicPlaying
                  ? 'bg-yellow-400/15 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                  : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-yellow-400 hover:border-slate-600'
              }`}
            >
              {isMusicPlaying ? (
                <>
                  <Disc3 className="w-4 h-4 text-yellow-400 animate-spin" />
                  <span className="hidden xl:inline max-w-[110px] truncate">{currentTrackTitle}</span>
                  <span className="xl:hidden">BGM ON</span>
                  <div className="flex items-center gap-0.5 ml-0.5">
                    <span className="w-1 h-2.5 bg-yellow-400 animate-pulse rounded-full" />
                    <span className="w-1 h-3.5 bg-pink-500 animate-pulse rounded-full delay-75" />
                    <span className="w-1 h-2 bg-cyan-400 animate-pulse rounded-full delay-150" />
                  </div>
                </>
              ) : (
                <>
                  <Music className="w-4 h-4 text-slate-400" />
                  <span>PLAY BGM</span>
                </>
              )}
            </button>

            {/* Audio SFX Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-yellow-400 hover:border-yellow-400/50 transition-all"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-yellow-400 animate-pulse" />}
            </button>

            {/* REGISTER NOW Button */}
            <button
              onClick={() => {
                soundManager.playCoin();
                onOpenRegister();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="relative group px-5 py-2.5 rounded-lg font-pixel text-xs bg-yellow-400 text-slate-950 font-bold tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.5)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-slate-950" />
                INSERT COIN
              </span>
              <div className="absolute inset-0 rounded-lg bg-yellow-200 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile Hamburger & Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-lg border ${
                isMusicPlaying
                  ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
              title="Toggle Music"
            >
              <Music className="w-4 h-4" />
            </button>

            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-yellow-400/30 text-yellow-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d24]/95 backdrop-blur-xl border-b border-yellow-400/30 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-yellow-400 hover:bg-yellow-400/10 border border-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundManager.playCoin();
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-lg font-pixel text-xs bg-yellow-400 text-slate-950 font-bold tracking-wider shadow-[0_0_15px_rgba(250,204,21,0.5)] flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              REGISTER NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

