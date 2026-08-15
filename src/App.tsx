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
import { JudgesMentors } from './components/JudgesMentors';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SponsorModal } from './components/SponsorModal';
import { RegistrationFlow } from './components/Registration/RegistrationFlow';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingArcadeCTA } from './components/FloatingArcadeCTA';
import { ParticleTrailCanvas } from './components/ParticleTrailCanvas';
import { ArcadeMusicPlayer } from './components/ArcadeMusicPlayer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  
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

  const handleOpenRegister = (problemId?: string, domainId?: string) => {
    if (problemId) {
      setSelectedProblemId(problemId);
    }
    if (domainId) {
      setSelectedDomain(domainId);
    }
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050714] text-slate-100 selection:bg-yellow-400 selection:text-slate-950">
      
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
        {/* Section 1: Hero Section */}
        <Hero onOpenRegister={() => handleOpenRegister()} />

        {/* Section 2: About Hackathon */}
        <About />

        {/* Section 3: Why Participate */}
        <WhyParticipate />

        {/* Section 4: Themes / Domains */}
        <ThemesDomains
          onSelectDomain={(domainId) => {
            setSelectedDomain(domainId);
          }}
          onOpenRegister={(domainId) => {
            handleOpenRegister(undefined, domainId);
          }}
        />

        {/* Section 5: Stage 4 Problem Statements (Coming Soon) */}
        <ProblemStatements
          onOpenRegister={(domainId) => {
            handleOpenRegister(undefined, domainId);
          }}
        />

        {/* Section 6: Timeline */}
        <Timeline />

        {/* Section 6: Prizes */}
        <Prizes />

        {/* Section 7: Sponsors & Partners */}
        <Sponsors onOpenSponsorModal={() => setIsSponsorModalOpen(true)} />

        {/* Section 8: Judges & Mentors */}
        <JudgesMentors />

        {/* Section 9: FAQ */}
        <FAQ />

        {/* Section 10: Contact */}
        <Contact />
      </main>

      {/* Section 11: Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Interactive Modals */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />

      {/* Multi-step Registration Flow & Success Screen */}
      <RegistrationFlow
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preselectedDomain={selectedDomain}
        preselectedProblemId={selectedProblemId}
      />

    </div>
  );
}

