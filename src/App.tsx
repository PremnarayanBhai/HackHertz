import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyParticipate } from './components/WhyParticipate';
import { ThemesDomains } from './components/ThemesDomains';
import { ProblemStatements } from './components/ProblemStatements';
import { Timeline } from './components/Timeline';
import { Prizes } from './components/Prizes';
import { Sponsors } from './components/Sponsors';
import { PatronsLeadership } from './components/PatronsLeadership';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SponsorModal } from './components/SponsorModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingArcadeCTA } from './components/FloatingArcadeCTA';
import { ParticleTrailCanvas } from './components/ParticleTrailCanvas';
import { ArcadeMusicPlayer } from './components/ArcadeMusicPlayer';
import { ArcadeBootScreen } from './components/ArcadeBootScreen';
import { NetworkSentinel } from './components/NetworkSentinel';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [showBootScreen, setShowBootScreen] = useState(false);
  
  // Prefill state for registration
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  const handleOpenRegister = (_problemId?: string, _domainId?: string) => {
    window.open('https://forms.gle/jY7ijJnAAaY1DT7a8', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#050714] text-slate-100 selection:bg-yellow-400 selection:text-slate-950">
      
      {/* Interactive Arcade Machine Boot Sequence */}
      <ArcadeBootScreen 
        forceShow={showBootScreen} 
        onBootComplete={() => setShowBootScreen(false)} 
      />

      {/* Network & Offline Telemetry Sentinel */}
      <NetworkSentinel />

      {/* Desktop Mouse Particle Trail Canvas */}
      <ParticleTrailCanvas />

      {/* Top Arcade Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Arcade Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Floating Arcade Actions (Scroll to Top & Quick Register) */}
      <FloatingArcadeCTA onOpenRegister={() => handleOpenRegister()} />

      {/* Retro 8-Bit Arcade Music Player & Chiptune Jukebox */}
      <ArcadeMusicPlayer />

      {/* Main Sections Stack */}
      <main>
        {/* Stage 1: Hero Section */}
        <Hero onOpenRegister={() => handleOpenRegister()} />

        {/* Stage 2: About Hackathon */}
        <About />

        {/* Stage 3: Why Participate */}
        <WhyParticipate />

        {/* Stage 4: Themes & Domains */}
        <ThemesDomains
          onSelectDomain={(domainId) => {
            setSelectedDomain(domainId);
          }}
          onOpenRegister={(domainId) => {
            handleOpenRegister(undefined, domainId);
          }}
        />

        {/* Stage 5: Problem Statements */}
        <ProblemStatements
          onOpenRegister={(domainId) => {
            handleOpenRegister(undefined, domainId);
          }}
        />

        {/* Stage 6: Timeline */}
        <Timeline />

        {/* Stage 7: Prizes */}
        <Prizes />

        {/* Stage 8: Sponsors & Partners */}
        <Sponsors onOpenSponsorModal={() => setIsSponsorModalOpen(true)} />

        {/* Stage 9: Patrons & Heads of Department */}
        <PatronsLeadership />

        {/* Stage 10: FAQ */}
        <FAQ />

        {/* Stage 12: Organization */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer 
        onOpenRegister={() => handleOpenRegister()} 
        onReplayBoot={() => setShowBootScreen(true)}
      />

      {/* Interactive Modals */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />

    </div>
  );
}

