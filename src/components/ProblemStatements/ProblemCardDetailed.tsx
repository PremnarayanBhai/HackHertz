import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  FileCode,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  BrainCircuit,
  AlertTriangle,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ProblemStatementDetailed } from '../../types';
import { soundManager } from '../../utils/sound';

interface ProblemCardDetailedProps {
  problem: ProblemStatementDetailed;
  isUnlocked: boolean;
  onUnlockClick: () => void;
  onViewSpec?: (problem: ProblemStatementDetailed) => void;
}

export const ProblemCardDetailed: React.FC<ProblemCardDetailedProps> = ({
  problem,
  isUnlocked,
  onUnlockClick,
  onViewSpec,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-yellow-400/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden space-y-4">
      
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[11px] px-2.5 py-1 rounded-md bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
              {problem.problemId}
            </span>
          </div>

          {isUnlocked ? (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
              <Unlock className="w-3 h-3" /> LIVE SPEC
            </span>
          ) : (
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
              <Lock className="w-3 h-3 text-yellow-400" /> LEAD CODE REQUIRED
            </span>
          )}
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
            {problem.domainName}
          </span>
          <h4 className="font-bold text-base sm:text-lg text-white group-hover:text-yellow-400 transition-colors leading-snug">
            {problem.title}
          </h4>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {problem.description}
        </p>

        {/* Tech Tags */}
        {problem.suggestedTech && problem.suggestedTech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {problem.suggestedTech.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 text-[10px] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Expanded View */}
        {expanded && (
          <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-fade-in text-xs">
            {problem.background && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Background:</span>
                <p className="text-slate-400 leading-relaxed">{problem.background}</p>
              </div>
            )}

            {problem.keyRequirements && problem.keyRequirements.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-yellow-400 block font-bold">Requirements:</span>
                <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                  {problem.keyRequirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-yellow-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          onClick={() => {
            soundManager.playClick();
            setExpanded(!expanded);
          }}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
        >
          <span>{expanded ? 'Hide Details' : 'Quick Preview'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onUnlockClick();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-pixel text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(250,204,21,0.2)]"
        >
          <KeyRound className="w-3 h-3" />
          <span>Unlock with Code</span>
        </button>
      </div>

    </div>
  );
};
