import React, { useState } from 'react';
import { X, Send, Building, Mail, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [tierInterest, setTierInterest] = useState('Gold');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#090d24] border-2 border-cyan-400 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
        
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-pixel text-lg text-white">SPONSOR PROPOSAL SENT</h3>
            <p className="text-slate-300 text-sm">
              Thank you for supporting HACKHERTZ 2.0! Our sponsorship lead will get back to <strong>{email}</strong> within 24 hours with our complete deck.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-pixel text-xs font-bold"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="font-pixel text-xs text-cyan-400 uppercase">PARTNER WITH HACKHERTZ</span>
              <h3 className="text-xl font-bold text-white">Become an Event Sponsor</h3>
              <p className="text-xs text-slate-400">
                Connect your brand with 500+ top student engineers, host custom domain challenges, and scout top engineering talent.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Company / Organization Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. Acme Tech Solutions"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Work Email *</label>
              <input
                required
                type="email"
                placeholder="sponsor@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Tier Preference</label>
              <select
                value={tierInterest}
                onChange={(e) => setTierInterest(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
              >
                <option value="Title">Title Partner ($10,000+)</option>
                <option value="Gold">Gold Sponsor ($5,000)</option>
                <option value="Silver">Silver Sponsor ($2,500)</option>
                <option value="Community">Community / Tech Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Message / Special Requests</label>
              <textarea
                rows={3}
                placeholder="Tell us about custom track ideas or hiring preferences..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-pixel text-xs bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              <Send className="w-4 h-4" />
              <span>REQUEST SPONSORSHIP DECK</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
