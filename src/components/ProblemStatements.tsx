import React, { useState, useEffect } from 'react';
import {
  Unlock,
  KeyRound,
  AlertTriangle,
  Radio
} from 'lucide-react';
import { TeamRecord, ProblemStatementDetailed, SystemSettingsRecord } from '../types';
import {
  fetchAllTeams,
  subscribeToTeams,
  validateTeamLeadAccessCode,
  fetchSystemSettings,
  subscribeToSystemSettings,
  fetchProblemStatements
} from '../services/firebaseService';
import { DomainUnlockConfig } from '../data/domainUnlockData';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';
import { TeamUnlockModal } from './ProblemStatements/TeamUnlockModal';
import { CelebrityBroadcastIntro } from './ProblemStatements/CelebrityBroadcastIntro';

interface ProblemStatementsProps {
  onOpenRegister: (domainId?: string) => void;
}

export const ProblemStatements: React.FC<ProblemStatementsProps> = ({ onOpenRegister }) => {
  // State
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Teams & Problem Statements
  const [teams, setTeams] = useState<TeamRecord[]>([]);
  const [problems, setProblems] = useState<ProblemStatementDetailed[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettingsRecord>({
    isProblemStatementsLive: false,
    liveRevealDate: '2026-09-08T11:00:00',
    announcement: '⚡ Welcome to HackHertz 2026! Problem statements for all 100 teams unlock on Hackathon Day.',
    totalTeams: 100,
    totalParticipants: 400
  });

  // Unlocked Team Modal
  const [unlockedTeam, setUnlockedTeam] = useState<TeamRecord | null>(null);
  const [unlockedPs, setUnlockedPs] = useState<ProblemStatementDetailed | null>(null);
  const [allDomainProblems, setAllDomainProblems] = useState<ProblemStatementDetailed[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Celebrity Domain Unlock State
  const [celebrityConfig, setCelebrityConfig] = useState<DomainUnlockConfig | null>(null);
  const [showCelebrityIntro, setShowCelebrityIntro] = useState(false);
  const [activePasskey, setActivePasskey] = useState<string>('');

  // Load initial data and subscribe to Firestore
  useEffect(() => {
    loadData();
    const unsubTeams = subscribeToTeams((updatedTeams) => setTeams(updatedTeams));
    const unsubSettings = subscribeToSystemSettings((settings) => setSystemSettings(settings));

    return () => {
      unsubTeams();
      unsubSettings();
    };
  }, []);

  const loadData = async () => {
    const [fetchedTeams, fetchedPs, fetchedSettings] = await Promise.all([
      fetchAllTeams(),
      fetchProblemStatements(),
      fetchSystemSettings()
    ]);
    setTeams(fetchedTeams);
    setProblems(fetchedPs);
    setSystemSettings(fetchedSettings);
  };

  // Handle Team Lead Access Code Validation
  const handleValidateCode = async (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const codeToTest = customCode || accessCodeInput;
    if (!codeToTest.trim()) return;

    soundManager.playClick();
    setIsValidating(true);
    setValidationError(null);

    const result = await validateTeamLeadAccessCode(codeToTest);
    setIsValidating(false);

    if (result.isValid && result.team) {
      soundManager.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setUnlockedTeam(result.team);
      setUnlockedPs(result.problemStatement || null);
      setAllDomainProblems(result.allDomainProblems || []);

      if (result.isDomainUnlock && result.domainConfig) {
        setCelebrityConfig(result.domainConfig);
        setActivePasskey(codeToTest.trim().toUpperCase());
        setShowCelebrityIntro(true);
      } else {
        setCelebrityConfig(null);
        setIsModalOpen(true);
      }
      setAccessCodeInput('');
    } else {
      soundManager.playGameOver();
      setValidationError(result.message);
    }
  };

  return (
    <SectionWrapper
      id="problems"
      stageTag="STAGE 05"
      accent="yellow"
      bgVariant="obsidian"
      animVariant="slide-left"
      className="py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-pixel text-xs">
              <KeyRound className="w-3.5 h-3.5" />
              <span>STAGE 05: PROBLEM STATEMENTS &amp; 100 TEAMS PORTAL</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span>PROBLEM</span>
              <span className="font-pixel text-yellow-400 neon-text-yellow">STATEMENTS</span>
              {systemSettings.isProblemStatementsLive ? (
                <span className="text-[10px] sm:text-xs font-pixel px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                  LIVE NOW
                </span>
              ) : (
                <span className="text-[10px] sm:text-xs font-pixel px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping inline-block"></span>
                  LOCKED FOR KICKOFF
                </span>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              HackHertz 2026 features 100 competing teams (400 participants) across 6 tracks. Team Leads can enter their unique access code below to unlock their domain-specific challenge statement.
            </p>
          </div>
        </ScrollReveal>

        {/* TEAM LEAD ACCESS CODE GATEWAY CARD */}
        <ScrollReveal variant="pixel-pop" delay={0.1}>
          <div className="relative rounded-3xl bg-slate-900/95 border-2 border-yellow-400 p-6 sm:p-10 overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.18)]">
            
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-maze-pattern opacity-30 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6 max-w-3xl mx-auto text-center">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/90 border border-yellow-400/30 text-yellow-300 text-xs font-mono">
                <Radio className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                <span>TEAM LEAD ACCESS GATEWAY // 100 TEAMS SECURE PORTAL</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-pixel text-xl sm:text-3xl text-white">
                  ENTER UNIQUE TEAM LEAD ACCESS CODE
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Enter your team's secret access code or registered Team Lead email to unlock your domain track problem statement and view your verified 4-member roster.
                </p>
              </div>

              {/* Access Code Input Form */}
              <form onSubmit={handleValidateCode} className="space-y-4 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      required
                      value={accessCodeInput}
                      onChange={(e) => setAccessCodeInput(e.target.value)}
                      placeholder="e.g. HH26-CYBER-001-8910 or lead email"
                      className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-slate-950 border-2 border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm font-mono tracking-wider uppercase transition-all shadow-inner"
                    />
                    <KeyRound className="w-5 h-5 text-yellow-400 absolute left-3.5 top-4 pointer-events-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={isValidating}
                    className="px-7 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-pixel text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.35)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>{isValidating ? 'VALIDATING...' : 'UNLOCK SPEC'}</span>
                  </button>
                </div>

                {/* Validation Error Message */}
                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center justify-center gap-2 animate-shake">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
              </form>

            </div>

          </div>
        </ScrollReveal>

      </div>

      {/* Celebrity Broadcast Reveal Intro */}
      {celebrityConfig && (
        <CelebrityBroadcastIntro
          isOpen={showCelebrityIntro}
          domainName={celebrityConfig.name}
          passkey={activePasskey || celebrityConfig.primaryPasskey}
          color={celebrityConfig.color}
          celebrityTitle={celebrityConfig.celebrityTitle}
          onComplete={() => {
            setShowCelebrityIntro(false);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Team Unlock Modal */}
      {unlockedTeam && (
        <TeamUnlockModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCelebrityConfig(null);
          }}
          team={unlockedTeam}
          problemStatement={unlockedPs}
          allDomainProblems={allDomainProblems}
          isLive={systemSettings.isProblemStatementsLive}
          isCelebrityUnlock={Boolean(celebrityConfig)}
          domainConfig={celebrityConfig}
        />
      )}
    </SectionWrapper>
  );
};
