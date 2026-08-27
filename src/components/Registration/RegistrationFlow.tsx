import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, CheckCircle2, User, GraduationCap, Code, Users, Settings, ShieldCheck, AlertCircle } from 'lucide-react';
import { RegistrationFormData, RegistrationRecord } from '../../types';
import { hackathonInfo, domains, problemStatements } from '../../data/hackathonData';
import { soundManager } from '../../utils/sound';
import { SuccessScreen } from './SuccessScreen';
import { HackHertzLogo } from '../HackHertzLogo';
import { SSITLogo } from '../SSITLogo';

interface RegistrationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDomain?: string;
  preselectedProblemId?: string;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  isOpen,
  onClose,
  preselectedDomain = '',
  preselectedProblemId = '',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    country: 'United States / Global',

    collegeName: '',
    course: '',
    branch: '',
    year: '3rd Year',
    studentId: '',

    github: '',
    linkedin: '',
    portfolio: '',
    resumeUrl: '',
    primarySkills: ['TypeScript', 'React'],
    secondarySkills: ['Tailwind CSS'],
    experienceLevel: 'Intermediate',
    previousHackathonsCount: 1,
    previousWins: '',
    areasOfInterest: ['AI/ML', 'Web Dev'],

    teamMode: 'create',
    teamName: '',
    teamCode: '',
    teamMembers: [
      { name: '', email: '', college: '', role: 'Developer' }
    ],

    preferredDomain: preselectedDomain || 'ai-ml',
    preferredProblemId: preselectedProblemId || 'ARC-AI-01',
    dietaryNeeds: 'Vegetarian',
    accommodationRequired: true,
    tshirtSize: 'L'
  });

  if (!isOpen) return null;

  const updateField = (field: keyof RegistrationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
      if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required.';
      if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    } else if (step === 2) {
      if (!formData.collegeName.trim()) errs.collegeName = 'College/University Name is required.';
      if (!formData.course.trim()) errs.course = 'Degree/Course is required.';
      if (!formData.branch.trim()) errs.branch = 'Branch/Department is required.';
    } else if (step === 4) {
      if (formData.teamMode === 'create' && !formData.teamName.trim()) {
        errs.teamName = 'Team Name is required when creating a team.';
      }
      if (formData.teamMode === 'join' && !formData.teamCode?.trim()) {
        errs.teamCode = 'Team Code is required to join a team.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      soundManager.playClick();
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    } else {
      soundManager.playClick();
    }
  };

  const handleBack = () => {
    soundManager.playClick();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    soundManager.playSuccess();
    const generatedId = `HACK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: RegistrationRecord = {
      ...formData,
      registrationId: generatedId,
      submittedAt: new Date().toISOString()
    };

    setSubmittedRecord(record);
  };

  const steps = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'College', icon: GraduationCap },
    { num: 3, label: 'Skills', icon: Code },
    { num: 4, label: 'Team', icon: Users },
    { num: 5, label: 'Preferences', icon: Settings },
    { num: 6, label: 'Confirm', icon: ShieldCheck },
  ];

  if (submittedRecord) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
        <SuccessScreen record={submittedRecord} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d24] border-2 border-yellow-400/80 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(250,204,21,0.3)] my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <HackHertzLogo size="sm" variant="badge" className="w-10 h-10 shrink-0" />
              <SSITLogo size="xs" glow={false} className="w-6 h-6 shrink-0 hidden sm:block" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded border border-yellow-400/30 inline-block">
                  OFFICIAL REGISTRATION
                </span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                  SSIT Gandhinagar
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                Insert Coin to Register for {hackathonInfo.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Direct Google Form Callout Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
          <div className="flex items-center gap-2.5 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Official Google Form registration link is live:</span>
          </div>
          <a
            href="https://forms.gle/jY7ijJnAAaY1DT7a8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playCoin()}
            className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-pixel text-[11px] font-bold tracking-wider flex items-center gap-2 shadow-[0_0_12px_#22d3ee] active:scale-95 transition-all whitespace-nowrap"
          >
            <span>OPEN GOOGLE FORM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Step Progress Indicator Bar */}
        <div className="grid grid-cols-6 gap-2 mb-8 border-b border-slate-800/80 pb-6">
          {steps.map((s) => {
            const IconComp = s.icon;
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div key={s.num} className="text-center space-y-1">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl mx-auto flex items-center justify-center text-xs font-pixel transition-all ${
                    isCurrent
                      ? 'bg-yellow-400 text-slate-950 shadow-[0_0_15px_#facc15] font-bold scale-105'
                      : isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <IconComp className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] font-mono block hidden sm:block ${
                  isCurrent ? 'text-yellow-400 font-bold' : isDone ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  0{s.num}. {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Contents */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: PERSONAL */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">STEP 1: PERSONAL DETAILS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@student.edu"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2831"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="Same as phone"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">State / Province</label>
                  <input
                    type="text"
                    placeholder="California"
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: COLLEGE */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">STEP 2: ACADEMIC DETAILS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300 mb-1">College / University Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Shree Swaminarayan Institute of Technology"
                    value={formData.collegeName}
                    onChange={(e) => updateField('collegeName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                  {errors.collegeName && <p className="text-xs text-red-400 mt-1">{errors.collegeName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Degree / Course *</label>
                  <input
                    type="text"
                    required
                    placeholder="B.S. / B.Tech / M.S."
                    value={formData.course}
                    onChange={(e) => updateField('course', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                  {errors.course && <p className="text-xs text-red-400 mt-1">{errors.course}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Branch / Major *</label>
                  <input
                    type="text"
                    required
                    placeholder="Computer Science & Engineering"
                    value={formData.branch}
                    onChange={(e) => updateField('branch', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                  {errors.branch && <p className="text-xs text-red-400 mt-1">{errors.branch}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Current Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => updateField('year', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Student ID / Enrollment No.</label>
                  <input
                    type="text"
                    placeholder="STU-2026-99"
                    value={formData.studentId}
                    onChange={(e) => updateField('studentId', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TECHNICAL PROFILE */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">STEP 3: TECHNICAL PROFILE</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.github}
                    onChange={(e) => updateField('github', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Portfolio / Project URL</label>
                  <input
                    type="url"
                    placeholder="https://myportfolio.dev"
                    value={formData.portfolio}
                    onChange={(e) => updateField('portfolio', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Previous Hackathons Participated</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.previousHackathonsCount}
                    onChange={(e) => updateField('previousHackathonsCount', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TEAM */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">STEP 4: TEAM FORMATION</h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span>Rule: Teams must consist of <strong>{hackathonInfo.teamSizeMin} to {hackathonInfo.teamSizeMax} members</strong>. Cross-college teams are welcome!</span>
              </div>

              {/* Toggle Create / Join */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('teamMode', 'create')}
                  className={`p-4 rounded-xl font-pixel text-xs transition-all border ${
                    formData.teamMode === 'create'
                      ? 'bg-yellow-400 text-slate-950 font-bold border-yellow-400 shadow-[0_0_15px_#facc15]'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  CREATE A NEW TEAM
                </button>
                <button
                  type="button"
                  onClick={() => updateField('teamMode', 'join')}
                  className={`p-4 rounded-xl font-pixel text-xs transition-all border ${
                    formData.teamMode === 'join'
                      ? 'bg-cyan-400 text-slate-950 font-bold border-cyan-400 shadow-[0_0_15px_#22d3ee]'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  JOIN EXISTING TEAM
                </button>
              </div>

              {formData.teamMode === 'create' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Team Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CyberGhosts"
                      value={formData.teamName}
                      onChange={(e) => updateField('teamName', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                    />
                    {errors.teamName && <p className="text-xs text-red-400 mt-1">{errors.teamName}</p>}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Team Join Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TEAM-ARC-9912"
                      value={formData.teamCode}
                      onChange={(e) => updateField('teamCode', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                    {errors.teamCode && <p className="text-xs text-red-400 mt-1">{errors.teamCode}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: PREFERENCES */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">STEP 5: TRACK & LOGISTICS PREFERENCES</h3>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2.5">
                <span className="font-pixel text-[10px] bg-cyan-400 text-slate-950 px-1.5 py-0.5 rounded">INFO</span>
                <span>Stage 4 challenge statements will be revealed on the day of the hackathon. Select your domain track below to reserve your team's spot.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300 mb-1">Preferred Domain Track *</label>
                  <select
                    value={formData.preferredDomain}
                    onChange={(e) => updateField('preferredDomain', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Dietary Requirements</label>
                  <select
                    value={formData.dietaryNeeds}
                    onChange={(e) => updateField('dietaryNeeds', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Jain">Jain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Swag T-Shirt Size</label>
                  <select
                    value={formData.tshirtSize}
                    onChange={(e) => updateField('tshirtSize', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                    <option value="XXL">Double XL (XXL)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION REVIEW */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="font-pixel text-xs text-yellow-400 uppercase tracking-wider">STEP 6: REVIEW & SUBMIT REGISTRATION</h3>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block uppercase">Full Name</span>
                    <span className="text-white font-bold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase">Email</span>
                    <span className="text-slate-200">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase">College / University</span>
                    <span className="text-slate-200">{formData.collegeName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase">Team Mode</span>
                    <span className="text-yellow-400 uppercase">{formData.teamMode === 'create' ? `Create: ${formData.teamName}` : `Join Code: ${formData.teamCode}`}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-xs text-yellow-200">
                <span>By submitting, you agree to abide by the HACKHERTZ 2.0 Code of Conduct and event guidelines. Registration fee is ₹400 per team.</span>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-pixel text-xs border border-slate-700 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
            ) : <div />}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_15px_#facc15]"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-10 py-4 rounded-xl bg-yellow-400 text-slate-950 font-pixel text-xs font-bold hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-[0_0_25px_#facc15] scale-105"
              >
                <span>SUBMIT REGISTRATION</span>
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
