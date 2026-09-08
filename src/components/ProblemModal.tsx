import React from 'react';
import { X, FileText, CheckCircle, Cpu, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { ProblemStatement } from '../types';
import { soundManager } from '../utils/sound';

interface ProblemModalProps {
  problem: ProblemStatement | null;
  onClose: () => void;
  onSelectProblem: (problemId: string) => void;
}

export const ProblemModal: React.FC<ProblemModalProps> = ({ problem, onClose, onSelectProblem }) => {
  if (!problem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090d24] border-2 border-yellow-400 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(250,204,21,0.3)] max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-xs text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-400/30">
                {problem.problemId}
              </span>
              <span className="text-xs text-cyan-400 font-mono uppercase bg-cyan-400/10 px-2 py-1 rounded">
                {problem.domainName}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {problem.title}
            </h3>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sponsor Banner if present */}
        {problem.sponsor && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>Sponsored Track Challenge by <strong>{problem.sponsor}</strong></span>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h4 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">CHALLENGE DESCRIPTION</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {problem.description}
          </p>
        </div>

        {/* Expected Solution */}
        <div className="space-y-2">
          <h4 className="font-pixel text-xs text-cyan-400 uppercase tracking-wider">EXPECTED SOLUTION & DELIVERABLES</h4>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {problem.expectedSolution}
          </p>
        </div>

        {/* Suggested Tech Stack */}
        <div className="space-y-2">
          <h4 className="font-pixel text-xs text-slate-400 uppercase tracking-wider">SUGGESTED TECH STACK</h4>
          <div className="flex flex-wrap gap-2">
            {problem.suggestedTech.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              alert(`Downloading official PDF spec sheet for ${problem.problemId}...`);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-500 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            Download PDF Spec
          </a>

          <button
            onClick={() => {
              soundManager.playCoin();
              onSelectProblem(problem.problemId);
              onClose();
            }}
            className="px-6 py-3 rounded-xl font-pixel text-xs bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center gap-2"
          >
            <span>CHOOSE THIS CHALLENGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
