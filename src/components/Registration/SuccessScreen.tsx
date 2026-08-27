import React from 'react';
import { Download, Calendar, Share2, Mail, QrCode, ArrowRight, ShieldCheck, Copy, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RegistrationRecord } from '../../types';
import { hackathonInfo } from '../../data/hackathonData';
import { soundManager } from '../../utils/sound';
import { HackHertzLogo } from '../HackHertzLogo';

interface SuccessScreenProps {
  record: RegistrationRecord;
  onClose: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ record, onClose }) => {
  React.useEffect(() => {
    // Launch celebratory arcade confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }
  }, []);

  const handleCopyId = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(record.registrationId);
    alert(`Registration ID copied: ${record.registrationId}`);
  };

  const handleCalendarExport = () => {
    soundManager.playClick();
    const eventTitle = encodeURIComponent(`${hackathonInfo.name} - Hackathon Kickoff`);
    const details = encodeURIComponent(`30-Hour Retro Arcade Hackathon at ${hackathonInfo.venue}`);
    const location = encodeURIComponent(hackathonInfo.venue);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${details}&location=${location}&dates=20260908T090000Z/20260909T150000Z`;
    window.open(googleCalendarUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    soundManager.playClick();
    alert(`Downloading HACKHERTZ 2.0 Official Registration Confirmation Pass (PDF) for ${record.fullName}...`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#090d24] border-2 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)] text-center space-y-8 animate-in zoom-in-95 duration-300">
      
      {/* Banner Logo */}
      <div className="flex justify-center">
        <HackHertzLogo size="lg" variant="badge" className="w-20 h-20 shadow-[0_0_25px_#facc15] hover:scale-105 transition-transform" />
      </div>

      <div className="space-y-2">
        <span className="font-pixel text-xs text-yellow-400 tracking-widest uppercase block">
          ★ COIN ACCEPTED • REGISTRATION CONFIRMED ★
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          🎉 REGISTRATION SUCCESSFUL!
        </h2>
        <p className="text-slate-300 text-base max-w-md mx-auto">
          Welcome to <strong className="text-yellow-400">{hackathonInfo.name}</strong>, <strong>{record.fullName}</strong>! Your ticket for the 30-hour arcade hackathon is locked in.
        </p>
      </div>

      {/* Ticket Details Badge */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-left max-w-lg mx-auto relative overflow-hidden">
        
        {/* Decorative Scanlines */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-pixel text-[11px] text-cyan-400">ARCADE PASS</span>
          <span className="text-xs font-mono text-emerald-400">STATUS: VERIFIED</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block uppercase">Registration ID</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-pixel text-yellow-400 text-sm">{record.registrationId}</span>
              <button onClick={handleCopyId} className="text-slate-400 hover:text-white">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block uppercase">Team Name</span>
            <span className="text-white text-sm font-semibold">{record.teamName || 'Solo / Unassigned'}</span>
          </div>

          <div>
            <span className="text-slate-500 block uppercase">College / University</span>
            <span className="text-slate-300 line-clamp-1">{record.collegeName}</span>
          </div>

          <div>
            <span className="text-slate-500 block uppercase">Domain Track</span>
            <span className="text-cyan-400 uppercase">{record.preferredDomain || 'Open Track'}</span>
          </div>
        </div>

        {/* QR Code Placeholder */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <QrCode className="w-8 h-8 text-yellow-400 shrink-0" />
            <span>Present QR badge at check-in desk at {hackathonInfo.venue}.</span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 rounded-xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_15px_#facc15]"
        >
          <Download className="w-4 h-4" />
          <span>DOWNLOAD PASS (PDF)</span>
        </button>

        <a
          href="https://forms.gle/jY7ijJnAAaY1DT7a8"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playCoin()}
          className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-pixel text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_#22d3ee]"
        >
          <ArrowRight className="w-4 h-4" />
          <span>OPEN GOOGLE FORM</span>
        </a>

        <button
          onClick={handleCalendarExport}
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-pixel text-xs hover:border-cyan-400 transition-all flex items-center gap-2"
        >
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>ADD TO CALENDAR</span>
        </button>

        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-mono text-xs"
        >
          Return to Portal
        </button>
      </div>

    </div>
  );
};
