import React, { useState, useEffect, useMemo } from 'react';
import { timelineEvents, eventDaySchedule, ScheduleSlot } from '../data/hackathonData';
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  Trophy, 
  Award, 
  UserPlus, 
  Calendar, 
  ListFilter, 
  Sparkles,
  Coffee,
  Code2,
  Presentation,
  ShieldCheck,
  Flame,
  Radio,
  Timer
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { ScrollReveal } from './ScrollReveal';
import { SectionWrapper } from './SectionWrapper';

interface EventTimeStatus {
  status: 'completed' | 'current' | 'upcoming';
  statusLabel: string;
  timeLabel: string;
  timeRemainingText?: string;
}

export const Timeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>(timelineEvents[3].id); // Default to Phase 4 (Hackathon Starts)
  const [viewMode, setViewMode] = useState<'roadmap' | 'table' | 'itinerary'>('roadmap');
  const [activeItineraryDay, setActiveItineraryDay] = useState<'day1' | 'day2'>('day1');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Real-time ticking clock for synchronized timeline tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format real-time IST clock
  const formattedIST = useMemo(() => {
    try {
      const timeStr = currentTime.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const dateStr = currentTime.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      return { timeStr, dateStr };
    } catch {
      return {
        timeStr: currentTime.toLocaleTimeString(),
        dateStr: currentTime.toLocaleDateString()
      };
    }
  }, [currentTime]);

  // Dynamic time status calculator adhering to exact proper timestamps
  const getMilestoneTimeStatus = (
    startTime?: string,
    endTime?: string,
    fallbackStatus: 'completed' | 'current' | 'upcoming' = 'upcoming'
  ): EventTimeStatus => {
    if (!startTime) {
      return {
        status: fallbackStatus,
        statusLabel: fallbackStatus === 'completed' ? 'COMPLETED' : fallbackStatus === 'current' ? 'LIVE NOW' : 'UPCOMING',
        timeLabel: ''
      };
    }

    const nowMs = currentTime.getTime();
    const startMs = new Date(startTime).getTime();
    const endMs = endTime ? new Date(endTime).getTime() : startMs + (24 * 60 * 60 * 1000);

    if (nowMs > endMs) {
      return {
        status: 'completed',
        statusLabel: 'COMPLETED',
        timeLabel: 'Stage Concluded'
      };
    }

    if (nowMs >= startMs && nowMs <= endMs) {
      const remainingMs = endMs - nowMs;
      const remHours = Math.floor(remainingMs / (1000 * 60 * 60));
      const remMins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      return {
        status: 'current',
        statusLabel: '• LIVE NOW',
        timeLabel: 'Active Stage',
        timeRemainingText: remHours > 0 ? `${remHours}h ${remMins}m remaining` : `${remMins}m remaining`
      };
    }

    // Future milestone
    const diffMs = startMs - nowMs;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let timeRemainingText = '';
    if (days > 0) {
      timeRemainingText = `Starts in ${days}d ${hours}h`;
    } else if (hours > 0) {
      timeRemainingText = `Starts in ${hours}h ${mins}m`;
    } else if (mins > 0) {
      timeRemainingText = `Starts in ${mins}m`;
    } else {
      timeRemainingText = `Starting shortly`;
    }

    return {
      status: 'upcoming',
      statusLabel: 'UPCOMING',
      timeLabel: 'Next Milestone',
      timeRemainingText
    };
  };

  const getSlotLiveStatus = (startTime: string, endTime: string): 'past' | 'live' | 'future' => {
    const nowMs = currentTime.getTime();
    const startMs = new Date(startTime).getTime();
    const endMs = new Date(endTime).getTime();

    if (nowMs > endMs) return 'past';
    if (nowMs >= startMs && nowMs <= endMs) return 'live';
    return 'future';
  };

  const getPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserPlus': return UserPlus;
      case 'Clock': return Clock;
      case 'CheckCircle2': return CheckCircle2;
      case 'Play': return Play;
      case 'Trophy': return Trophy;
      default: return Award;
    }
  };

  const getScheduleSlotIcon = (type: ScheduleSlot['icon']) => {
    switch (type) {
      case 'food': return Coffee;
      case 'hacking': return Code2;
      case 'mentorship': return Flame;
      case 'judging': return Presentation;
      case 'ceremony': return Trophy;
      case 'general': return ShieldCheck;
      default: return Clock;
    }
  };

  return (
    <SectionWrapper id="timeline" stageTag="STAGE 06" accent="emerald" bgVariant="noir" animVariant="glitch-reveal" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-pixel text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STAGE 06: OFFICIAL TIME & SCHEDULE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              HACKHERTZ 2.0 <span className="font-pixel text-pink-400 neon-text-pink">TIMELINE</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
              Synchronized event milestones and precise 30-hour on-site hackathon itinerary in Indian Standard Time (IST).
            </p>

            {/* Live Clock HUD */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/90 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <Radio className="w-3.5 h-3.5" />
                <span className="font-bold">LIVE IST CLOCK:</span>
              </span>
              <span className="text-white font-bold bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 tracking-wider">
                {formattedIST.timeStr}
              </span>
              <span className="text-slate-400 hidden sm:inline">
                {formattedIST.dateStr}
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
              <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-xl flex-wrap justify-center">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('roadmap');
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    viewMode === 'roadmap'
                      ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(244,114,182,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>ROADMAP VIEW</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('table');
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    viewMode === 'table'
                      ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(244,114,182,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>PHASE TABLE</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('itinerary');
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    viewMode === 'itinerary'
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>30H EVENT ITINERARY</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* View 1: Phase Schedule Table View */}
        {viewMode === 'table' && (
          <ScrollReveal variant="fade-up">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-mono uppercase text-slate-400 tracking-wider">
                      <th className="py-4 px-6 font-semibold w-48">Date & Proper Time</th>
                      <th className="py-4 px-6 font-semibold w-72">Phase Title</th>
                      <th className="py-4 px-6 font-semibold">Status & Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {timelineEvents.map((item) => {
                      const IconComp = getPhaseIcon(item.icon);
                      const timeStatus = getMilestoneTimeStatus(item.startTime, item.endTime, item.status);
                      const isCurrent = timeStatus.status === 'current';
                      const isCompleted = timeStatus.status === 'completed';

                      return (
                        <tr 
                          key={item.id}
                          className={`group transition-colors ${
                            isCurrent 
                              ? 'bg-yellow-400/10 hover:bg-yellow-400/15' 
                              : isCompleted 
                              ? 'opacity-80 hover:opacity-100 hover:bg-slate-800/30'
                              : 'hover:bg-slate-800/40'
                          }`}
                        >
                          {/* Date & Time Column */}
                          <td className="py-5 px-6 align-top">
                            <div className="space-y-1.5">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-cyan-400 text-sm whitespace-nowrap">
                                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{item.date}</span>
                              </div>
                              {item.time && (
                                <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5 pl-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{item.time}</span>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Phase Column */}
                          <td className="py-5 px-6 align-top">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg mt-0.5 ${
                                isCurrent 
                                  ? 'bg-yellow-400 text-slate-950 ring-2 ring-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                                  : isCompleted
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-slate-800 text-pink-400 border border-slate-700'
                              }`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-white group-hover:text-pink-400 transition-colors text-base flex items-center gap-2">
                                  <span>{item.title}</span>
                                </h4>
                                <span className="font-pixel text-[10px] text-slate-400">
                                  {item.badge}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Status & Details Column */}
                          <td className="py-5 px-6 align-top space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                                isCurrent
                                  ? 'bg-yellow-400 text-slate-950 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                                  : isCompleted
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                              }`}>
                                {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                                {timeStatus.statusLabel}
                              </span>

                              {timeStatus.timeRemainingText && (
                                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {timeStatus.timeRemainingText}
                                </span>
                              )}
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* View 2: Visual Roadmap View (Proper Time Synchronization) */}
        {viewMode === 'roadmap' && (
          <div className="relative py-4">
            {/* Vertical Glowing Guide Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-pink-500 to-cyan-400 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.5)]" />

            <div className="space-y-12 relative z-10">
              {timelineEvents.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const IconComp = getPhaseIcon(item.icon);
                const timeStatus = getMilestoneTimeStatus(item.startTime, item.endTime, item.status);
                const isCurrent = timeStatus.status === 'current';
                const isCompleted = timeStatus.status === 'completed';
                const isSelected = selectedMilestone === item.id;

                return (
                  <ScrollReveal 
                    key={item.id} 
                    variant={isEven ? "fade-right" : "fade-left"}
                    delay={0.05}
                  >
                    <div
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedMilestone(item.id);
                      }}
                      onMouseEnter={() => soundManager.playHover()}
                      className={`flex flex-col md:flex-row items-center cursor-pointer group ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Content Card Side */}
                      <div className="w-full md:w-1/2 px-0 md:px-8">
                        <div
                          className={`p-6 rounded-2xl bg-slate-900/90 border transition-all duration-300 ${
                            isCurrent
                              ? 'border-yellow-400 ring-2 ring-yellow-400/40 shadow-[0_0_30px_rgba(250,204,21,0.3)] bg-slate-900'
                              : isSelected
                              ? 'border-pink-500 shadow-[0_0_30px_rgba(244,114,182,0.35)] scale-102 bg-slate-900'
                              : isCompleted
                              ? 'border-slate-800 bg-slate-950/80 hover:border-emerald-500/50'
                              : 'border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <span className="font-pixel text-[10px] text-yellow-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                              {item.badge}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold inline-flex items-center gap-1 ${
                                isCurrent 
                                  ? 'bg-yellow-400 text-slate-950 animate-pulse shadow-[0_0_10px_#facc15]'
                                  : isCompleted 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                  : 'bg-slate-800 text-cyan-400'
                              }`}>
                                {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                                {timeStatus.statusLabel}
                              </span>

                              {timeStatus.timeRemainingText && (
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {timeStatus.timeRemainingText}
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors mb-1">
                            {item.title}
                          </h3>

                          {/* Date and Time Details */}
                          <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{item.date}</span>
                            </span>
                            {item.time && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-slate-300">
                                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>{item.time}</span>
                                </span>
                              </>
                            )}
                          </div>

                          <p className="text-slate-300 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Node Circle Center */}
                      <div className="my-4 md:my-0 flex items-center justify-center relative z-20">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-950 transition-all ${
                            isCurrent
                              ? 'bg-yellow-400 ring-4 ring-yellow-400/50 shadow-[0_0_25px_#facc15] scale-110'
                              : isCompleted
                              ? 'bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-cyan-400'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Empty Spacer Side */}
                      <div className="w-full md:w-1/2 px-8 hidden md:block" />

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}

        {/* View 3: 30-Hour Event Itinerary (Hour-by-Hour Event Schedule) */}
        {viewMode === 'itinerary' && (
          <ScrollReveal variant="fade-up" className="space-y-6">
            {/* Day Switcher */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveItineraryDay('day1');
                }}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeItineraryDay === 'day1'
                    ? 'bg-yellow-400 text-slate-950 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>DAY 1 · SEP 08 (TUESDAY)</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveItineraryDay('day2');
                }}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeItineraryDay === 'day2'
                    ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>DAY 2 · SEP 09 (WEDNESDAY)</span>
              </button>
            </div>

            {/* Current Selected Day Title */}
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">
                {eventDaySchedule[activeItineraryDay].title}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Official 30-Hour In-Person Sprint at SSIT Bhat Campus • Synchronized to IST
              </p>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {eventDaySchedule[activeItineraryDay].slots.map((slot) => {
                const SlotIcon = getScheduleSlotIcon(slot.icon);
                const liveStatus = getSlotLiveStatus(slot.startTime, slot.endTime);
                const isLive = liveStatus === 'live';
                const isPast = liveStatus === 'past';

                return (
                  <div
                    key={slot.id}
                    className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${
                      isLive
                        ? 'bg-yellow-400/10 border-yellow-400 ring-2 ring-yellow-400/50 shadow-[0_0_25px_rgba(250,204,21,0.25)]'
                        : isPast
                        ? 'bg-slate-950/70 border-slate-800/80 opacity-75 hover:opacity-100'
                        : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Time & Tag */}
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-cyan-400">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{slot.time}</span>
                        </span>

                        <div className="flex items-center gap-1.5">
                          {isLive && (
                            <span className="font-pixel text-[9px] px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-bold animate-pulse">
                              ACTIVE NOW
                            </span>
                          )}
                          {isPast && (
                            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Done
                            </span>
                          )}
                          <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {slot.tag}
                          </span>
                        </div>
                      </div>

                      {/* Title & Icon */}
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                          isLive 
                            ? 'bg-yellow-400 text-slate-950 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                            : 'bg-slate-800 text-pink-400 border border-slate-700'
                        }`}>
                          <SlotIcon className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-white text-base leading-snug group-hover:text-pink-400 transition-colors">
                          {slot.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed pl-11">
                        {slot.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}

      </div>
    </SectionWrapper>
  );
};
