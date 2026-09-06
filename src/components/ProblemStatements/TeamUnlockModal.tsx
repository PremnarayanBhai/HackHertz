import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Users,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  FileCode,
  Tag,
  Building,
  Mail,
  Phone,
  Layers,
  ArrowRight,
  Flame,
  Radio,
  Award,
  Zap,
  Edit3,
  Share2
} from 'lucide-react';
import { TeamRecord, ProblemStatementDetailed } from '../../types';
import { DomainUnlockConfig } from '../../data/domainUnlockData';
import { soundManager } from '../../utils/sound';
import confetti from 'canvas-confetti';

interface TeamUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamRecord;
  problemStatement?: ProblemStatementDetailed | null;
  allDomainProblems?: ProblemStatementDetailed[];
  isLive: boolean;
  isCelebrityUnlock?: boolean;
  domainConfig?: DomainUnlockConfig | null;
}

export const TeamUnlockModal: React.FC<TeamUnlockModalProps> = ({
  isOpen,
  onClose,
  team,
  problemStatement,
  allDomainProblems = [],
  isLive,
  isCelebrityUnlock = false,
  domainConfig = null,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [selectedPs, setSelectedPs] = useState<ProblemStatementDetailed | null>(problemStatement || null);
  const [claimedPsId, setClaimedPsId] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState<string>(
    team.teamLead?.name && team.teamLead.name !== 'Honored Innovator'
      ? team.teamLead.name
      : 'Celebrity Innovator'
  );
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (problemStatement) {
      setSelectedPs(problemStatement);
    } else if (allDomainProblems.length > 0) {
      setSelectedPs(allDomainProblems[0]);
    }
  }, [problemStatement, allDomainProblems]);

  const isCelebrity = isCelebrityUnlock || team.teamId?.startsWith('HH26-VIP-') || !!domainConfig;

  const isOpenInnovation =
    team.domainId === 'open-innovation' ||
    team.domainName?.toLowerCase().includes('open') ||
    (!selectedPs && allDomainProblems.length === 0) ||
    selectedPs?.problemId === 'OPEN-THEME';

  if (!isOpen) return null;

  const handleCopyCode = () => {
    soundManager.playCoin();
    navigator.clipboard.writeText(team.accessCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleClaimChallenge = (problemId: string) => {
    soundManager.playSuccess();
    setClaimedPsId(problemId);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#facc15', '#22d3ee', '#10b981']
      });
    } catch {}
  };

  const handleShareVip = () => {
    soundManager.playCoin();
    const shareText = `🌟 I just unlocked the live ${team.domainName} Problem Statement (${selectedPs?.problemId || 'OPEN INNOVATION'}) at HackHertz 2026!
Delegate: ${participantName}
Clearance: Level 5 Celebrity Innovator Access
Status: BROADCAST LIVE RIGHT NOW (T-00:00:00)
Let the 30-hour hackathon begin! ⚡ #HackHertz2026 #Innovation`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleCopyBrief = () => {
    soundManager.playCoin();
    const briefText = isOpenInnovation || !selectedPs
      ? `=== HACKHERTZ 2026 OPEN INNOVATION TRACK DOSSIER ===
Delegate / Team: ${participantName} (${team.teamName})
Track: ${team.domainName}
Access Code: ${team.accessCode}
Clearance: VIP Celebrity Delegate
Status: LIVE NOW (No Pre-Assigned Problem Statement - 100% Creative Autonomy)

TRACK POLICY:
No pre-defined problem statement has been assigned for the Open Innovation track.
Participating teams have 100% creative autonomy and unrestricted freedom to identify their own real-world problem statement and engineer an innovative solution or prototype using any technology stack of their choice.

CHALLENGE GUIDANCE:
1. Identify a clear, genuine real-world problem or unmet need.
2. Formulate a novel, creative, and feasible technical solution.
3. Architect and build a working prototype during the 30-hour hackathon.
4. Deliver live demo + GitHub repo + presentation pitch deck.

EVALUATION CRITERIA:
- Innovation & Originality of Idea (30%)
- Technical Complexity & Implementation (30%)
- Problem Relevance & Practical Impact (20%)
- Prototype Completeness & Live Pitch (20%)
=================================================`
      : `=== HACKHERTZ 2026 OFFICIAL PROBLEM STATEMENT ===
Delegate / Team: ${participantName} (${team.teamName})
Track: ${team.domainName}
Access Code: ${team.accessCode}
Clearance: VIP Celebrity Delegate
Problem ID: ${selectedPs.problemId}
Title: ${selectedPs.title}
Difficulty: ${selectedPs.difficulty}
Status: BROADCAST LIVE NOW

DESCRIPTION:
${selectedPs.description}

BACKGROUND:
${selectedPs.background || 'N/A'}

KEY REQUIREMENTS:
${selectedPs.keyRequirements ? selectedPs.keyRequirements.map((r, i) => `${i + 1}. ${r}`).join('\n') : 'See portal'}

EXPECTED DELIVERABLES:
${selectedPs.expectedDeliverables ? selectedPs.expectedDeliverables.map((d, i) => `${i + 1}. ${d}`).join('\n') : 'See portal'}

SUGGESTED TECH:
${selectedPs.suggestedTech?.join(', ') || 'N/A'}

EVALUATION WEIGHTAGE:
${selectedPs.evaluationCriteria?.join('\n') || 'Standard HackHertz rubric'}
=================================================`;

    navigator.clipboard.writeText(briefText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className={`relative w-full max-w-4xl bg-slate-900 border-2 rounded-3xl overflow-hidden my-auto max-h-[92vh] flex flex-col ${
        isCelebrity
          ? 'border-yellow-400 shadow-[0_0_70px_rgba(250,204,21,0.35)]'
          : 'border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.25)]'
      }`}>
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isCelebrity
                ? 'bg-yellow-400/25 border border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                : 'bg-yellow-400/20 border border-yellow-400/40 text-yellow-400'
            }`}>
              {isCelebrity ? <Award className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-pixel text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">
                  {team.teamId}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  {isCelebrity ? 'VIP BROADCAST LIVE NOW' : 'UNLOCKED & VERIFIED'}
                </span>
                {isCelebrity && (
                  <span className="text-[9px] font-pixel px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    ★ CELEBRITY CLEARANCE
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white font-orbitron flex items-center gap-2 mt-0.5">
                <span>{team.teamName}</span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* CELEBRITY VIP SPOTLIGHT BANNER */}
          {isCelebrity && (
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-cyan-500/15 border-2 border-yellow-400/60 shadow-[0_0_30px_rgba(250,204,21,0.2)] overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-15 pointer-events-none">
                <Award className="w-32 h-32 text-yellow-400" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-yellow-400/50 text-yellow-300 font-pixel text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{domainConfig?.celebrityTitle || 'HONORED CELEBRITY INNOVATOR'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShareVip}
                      className="px-3 py-1 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 border border-yellow-400/40 text-xs font-pixel flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedShare ? 'COPIED VIP LINK!' : 'SHARE VIP BADGE'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-yellow-100/90 font-mono italic">
                  "{domainConfig?.celebrityQuote || 'The stage is yours. Engineer the future.'}"
                </p>

                {/* Personalized Innovator Delegate Name */}
                <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-yellow-400/20">
                  <span className="text-[11px] font-mono uppercase text-slate-400">
                    VIP Delegate Credential:
                  </span>
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        placeholder="Enter your name or team name"
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-yellow-400 text-yellow-300 text-xs font-mono focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          soundManager.playCoin();
                          setIsEditingName(false);
                        }}
                        className="px-2 py-1 rounded-lg bg-yellow-400 text-slate-950 text-xs font-bold font-mono"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-orbitron text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                        {participantName}
                      </span>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="p-1 rounded text-slate-400 hover:text-yellow-400 transition-colors"
                        title="Edit Delegate Name"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-emerald-400 ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SATELLITE BROADCAST ACTIVATED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Team Meta & Access Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Domain & Track */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Assigned Track</span>
              <div className="text-sm font-bold text-yellow-400 flex items-center gap-1.5 font-pixel">
                <Layers className="w-4 h-4 text-yellow-400" />
                <span>{team.domainName}</span>
              </div>
            </div>

            {/* College or Arena */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Arena / Institution</span>
              <p className="text-xs font-medium text-slate-200 truncate flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{team.collegeName}</span>
              </p>
            </div>

            {/* Access Code */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-yellow-400/30 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-yellow-400/80 block">
                  {isCelebrity ? 'Domain Unlock Passkey' : 'Team Lead Code'}
                </span>
                <span className="text-xs font-mono font-bold text-yellow-300">{team.accessCode}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-lg bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 transition-colors cursor-pointer"
                title="Copy Access Code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* 4 Team Members Roster (Shown for registered team unlocks) */}
          {!isCelebrity && team.members && team.members.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-pixel text-slate-200">
                    OFFICIAL 4-MEMBER TEAM ROSTER (CERTIFICATE SYNCED)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  4/4 Members Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      member.role === 'Lead'
                        ? 'bg-yellow-400/5 border-yellow-400/40 text-yellow-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        Member 0{idx + 1}
                      </span>
                      {member.role === 'Lead' && (
                        <span className="text-[9px] font-pixel text-yellow-400 flex items-center gap-1">
                          ★ LEAD
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-xs text-white truncate">{member.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate flex items-center gap-1 mt-0.5">
                      <Mail className="w-2.5 h-2.5 shrink-0" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Domain Problem Statement Switcher (Interactive Tabs for all domain problems) */}
          {allDomainProblems.length > 0 && !isOpenInnovation && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-pixel text-yellow-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  AVAILABLE TRACK STATEMENTS ({allDomainProblems.length} LIVE CHALLENGES)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Select a challenge to view detailed specifications
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {allDomainProblems.map((ps) => {
                  const isSelected = selectedPs?.id === ps.id;
                  const isClaimed = claimedPsId === ps.problemId;
                  return (
                    <button
                      key={ps.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedPs(ps);
                      }}
                      className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-yellow-400/10 border-yellow-400 text-white shadow-[0_0_20px_rgba(250,204,21,0.25)]'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-pixel text-[11px] text-yellow-400">
                          {ps.problemId}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          (ps.difficulty as string) === 'Hard' || ps.difficulty === 'Extreme'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : (ps.difficulty as string) === 'Medium' || ps.difficulty === 'Moderate' || ps.difficulty === 'Intermediate'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {ps.difficulty}
                        </span>
                      </div>
                      <div className="font-bold text-xs truncate text-white">{ps.title}</div>
                      {isClaimed && (
                        <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1 font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Claimed by you
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* DEDICATED OPEN INNOVATION VIEW - NO PRE-ASSIGNED PROBLEM STATEMENT */}
          {isOpenInnovation ? (
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-950 border-2 border-cyan-400/60 space-y-6 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              
              {/* Header & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-xs font-pixel">
                      OPEN INNOVATION TRACK
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> 100% UNRESTRICTED CREATIVE FREEDOM
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-orbitron">
                    Bring Your Own Idea — No Pre-Assigned Problem Statement
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Evaluation Mode</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">Open Problem Architecture</span>
                </div>
              </div>

              {/* Core Directive Announcement */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-pixel text-xs">
                  <Flame className="w-4 h-4 text-cyan-400" />
                  <span>OFFICIAL TRACK DIRECTIVE</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  No specific or pre-assigned problem statement is allocated to teams competing in the <strong>Open Innovation</strong> domain. Participating teams have complete creative liberty to identify any real-world challenge, formulate their own problem definition, and architect a cutting-edge prototype using any technology stack of their choice.
                </p>
              </div>

              {/* 4 Pillars of Open Innovation */}
              <div className="space-y-3">
                <h4 className="text-xs font-pixel text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  FOUR PILLARS OF OPEN INNOVATION FREEDOM
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 text-[10px] font-pixel flex items-center justify-center">1</span>
                      Identify Real-World Friction
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Choose any unmet user need or systemic bottleneck across healthcare, logistics, agriculture, governance, robotics, or social impact.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 text-[10px] font-pixel flex items-center justify-center">2</span>
                      Unrestricted Tech Stack
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      No framework limits. Freely employ Web3, IoT hardware, Generative AI models, Mobile apps, Cloud microservices, or embedded chips.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 text-[10px] font-pixel flex items-center justify-center">3</span>
                      Build a Working Prototype
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Engineer a live, testable proof-of-concept within the 30-hour sprint rather than merely a theoretical slide deck.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-fuchsia-400/20 text-fuchsia-400 text-[10px] font-pixel flex items-center justify-center">4</span>
                      Demonstrate Tangible Impact
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Present your solution's market viability, architectural scalability, user feedback, and measurable community value to the jury.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission Deliverables */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-pixel text-cyan-300 block">
                  MANDATORY SUBMISSION DELIVERABLES (FINAL ROUND)
                </span>
                <ul className="text-xs font-mono text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Public GitHub Repository with clean commit history, README setup docs, and open-source license.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Live working demonstration link or local deployment environment for jury testing.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>5-minute live pitch presentation detailing Problem Context, Architecture, Scalability, and Future Roadmap.</span>
                  </li>
                </ul>
              </div>

              {/* Evaluation Weights */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                  Evaluation Rubric & Weightage:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-lg font-pixel text-yellow-400">30%</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1">Novelty &amp; Innovation</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-lg font-pixel text-cyan-400">30%</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1">Technical Execution</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-lg font-pixel text-emerald-400">20%</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1">Practical Impact</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-lg font-pixel text-fuchsia-400">20%</div>
                    <div className="text-[10px] font-mono text-slate-300 mt-1">Pitch &amp; Demo</div>
                  </div>
                </div>
              </div>

            </div>
          ) : selectedPs ? (
            /* STANDARD PROBLEM STATEMENT DETAILS */
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              
              {/* Problem Header & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-xs font-pixel">
                      {selectedPs.problemId}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                      (selectedPs.difficulty as string) === 'Hard' || selectedPs.difficulty === 'Extreme'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : (selectedPs.difficulty as string) === 'Medium' || selectedPs.difficulty === 'Moderate' || selectedPs.difficulty === 'Intermediate'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {selectedPs.difficulty} Difficulty
                    </span>
                    {selectedPs.domainName && (
                      <span className="text-xs font-mono text-slate-400">
                        • {selectedPs.domainName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-orbitron">
                    {selectedPs.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleClaimChallenge(selectedPs.problemId)}
                    className={`px-4 py-2 rounded-xl text-xs font-pixel flex items-center gap-1.5 transition-all cursor-pointer ${
                      claimedPsId === selectedPs.problemId
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    }`}
                  >
                    {claimedPsId === selectedPs.problemId ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CHALLENGE CLAIMED!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>CLAIM THIS CHALLENGE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description & Background */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-pixel text-yellow-400 uppercase tracking-wider mb-1.5">
                    PROBLEM OVERVIEW
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedPs.description}
                  </p>
                </div>

                {selectedPs.background && (
                  <div>
                    <h4 className="text-xs font-pixel text-yellow-400 uppercase tracking-wider mb-1.5">
                      BACKGROUND CONTEXT
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      {selectedPs.background}
                    </p>
                  </div>
                )}
              </div>

              {/* Key Requirements */}
              {selectedPs.keyRequirements && selectedPs.keyRequirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-pixel text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    KEY TECHNICAL REQUIREMENTS
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    {selectedPs.keyRequirements.map((req, i) => (
                      <li
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2"
                      >
                        <span className="text-yellow-400 font-bold shrink-0">{i + 1}.</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expected Deliverables */}
              {selectedPs.expectedDeliverables && selectedPs.expectedDeliverables.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-pixel text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    EXPECTED DELIVERABLES
                  </h4>
                  <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                    {selectedPs.expectedDeliverables.map((deliv, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Evaluation Rubrics & Suggested Tech */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Tech Stack */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    Recommended Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPs.suggestedTech?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Evaluation Weights */}
                {selectedPs.evaluationCriteria && selectedPs.evaluationCriteria.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                      Evaluation Weightage:
                    </span>
                    <div className="space-y-1 text-[11px] font-mono text-slate-400">
                      {selectedPs.evaluationCriteria.map((c, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-slate-800/60 pb-0.5">
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          ) : null}

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Hackathon Duration: <span className="text-yellow-400 font-bold">30 Hours</span> • Helpdesk: <span className="text-white font-bold">+91 95107 05738</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyBrief}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy problem statement brief to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedBrief ? 'Copied Full Dossier!' : 'Copy Official Dossier'}</span>
            </button>

            {isCelebrity && (
              <button
                onClick={handleShareVip}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedShare ? 'Copied VIP Badge!' : 'Share VIP Status'}</span>
              </button>
            )}

            <a
              href="https://whatsapp.com/channel/0029VbEZ3NeBKfi5Lrh2Ck2w"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playCoin()}
              className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-pixel text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
            >
              <span>MENTOR HELPDESK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
