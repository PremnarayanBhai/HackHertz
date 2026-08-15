import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Music, Radio, Disc3, Sparkles, X, ChevronUp, ChevronDown, ListMusic, Zap
} from 'lucide-react';
import { musicEngine, TRACKS, MusicTrack } from '../utils/musicEngine';
import { soundManager } from '../utils/sound';

interface ArcadeMusicPlayerProps {
  className?: string;
  variant?: 'floating' | 'navbar' | 'docked';
}

export const ArcadeMusicPlayer: React.FC<ArcadeMusicPlayerProps> = ({ variant = 'floating' }) => {
  const [isPlaying, setIsPlaying] = useState(musicEngine.getIsPlaying());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(musicEngine.getCurrentTrack());
  const [volume, setVolume] = useState(musicEngine.getVolume());
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Sync state with music engine
  useEffect(() => {
    const unsub = musicEngine.subscribe(() => {
      setIsPlaying(musicEngine.getIsPlaying());
      setCurrentTrack(musicEngine.getCurrentTrack());
      setVolume(musicEngine.getVolume());
    });

    const unsubStep = musicEngine.subscribeStep((step) => {
      setCurrentStep(step);
    });

    return () => {
      unsub();
      unsubStep();
    };
  }, []);

  // Equalizer visualizer rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(32);

    const render = () => {
      musicEngine.getVisualizerData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barCount = 16;
      const barWidth = (canvas.width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        const val = isPlaying ? (dataArray[i * 2] || (Math.sin(Date.now() / 150 + i) * 15 + 20)) : 4;
        const barHeight = Math.max(3, (val / 255) * canvas.height);
        const x = i * (barWidth + 2);
        const y = canvas.height - barHeight;

        // Gradient color based on height & track color
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, currentTrack.color || '#facc15');
        grad.addColorStop(1, '#ec4899');

        ctx.fillStyle = isPlaying ? grad : '#475569';
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, currentTrack]);

  const handleTogglePlay = () => {
    soundManager.playClick();
    musicEngine.togglePlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    musicEngine.nextTrack();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    musicEngine.prevTrack();
  };

  const handleSelectTrack = (index: number) => {
    soundManager.playClick();
    musicEngine.selectTrack(index);
    if (!isPlaying) {
      musicEngine.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    musicEngine.setVolume(val);
  };

  return (
    <>
      {/* Floating Retro Boombox Player Widget */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative group"
        >
          {/* Main Mini Controller Pill */}
          <div
            className={`flex items-center gap-3 p-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
              isPlaying
                ? 'bg-slate-950/95 border-yellow-400/60 shadow-[0_0_25px_rgba(250,204,21,0.25)]'
                : 'bg-slate-950/90 border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Play/Pause Button with Disc Spin */}
            <button
              onClick={handleTogglePlay}
              onMouseEnter={() => soundManager.playHover()}
              title={isPlaying ? "Pause 8-Bit BGM" : "Play 8-Bit Chiptune BGM"}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-yellow-400 text-slate-950 shadow-[0_0_15px_rgba(250,204,21,0.6)] scale-105'
                  : 'bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700'
              }`}
            >
              {isPlaying ? (
                <Disc3 className="w-6 h-6 animate-spin text-slate-950" style={{ animationDuration: '3s' }} />
              ) : (
                <Play className="w-5 h-5 ml-0.5 fill-current text-yellow-400" />
              )}
            </button>

            {/* Track Info & Visualizer */}
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer select-none pr-1"
            >
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] uppercase tracking-wider text-yellow-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
                  CHIPTUNE FM
                </span>
                {isPlaying && (
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/30">
                    {currentTrack.bpm} BPM
                  </span>
                )}
              </div>

              <div className="font-bold text-xs text-white truncate max-w-[140px] sm:max-w-[180px] hover:text-yellow-300 transition-colors">
                {currentTrack.title}
              </div>

              {/* Mini Equalizer Canvas */}
              <div className="w-28 sm:w-36 h-3 mt-1 bg-slate-900/90 rounded overflow-hidden border border-slate-800 flex items-center px-1">
                <canvas 
                  ref={canvasRef} 
                  width={140} 
                  height={12} 
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Skip Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                title="Previous Track"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleNext}
                title="Next Track"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expand Jukebox Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title="Expand Arcade Jukebox"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-yellow-400 hover:border-yellow-400/40 transition-all"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ListMusic className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Arcade Jukebox Deck */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-0 w-80 sm:w-96 rounded-2xl bg-slate-950/95 border-2 border-yellow-400/50 shadow-[0_0_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-4 space-y-4 z-50 text-white"
              >
                {/* Jukebox Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-pixel text-xs text-yellow-400 tracking-wider">ARCADE JUKEBOX</h4>
                      <p className="text-[10px] font-mono text-slate-400">8-BIT SYNTHWAVE SOUNDTRACK</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Cassette Tape Visualizer Display */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-pink-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      TRACK {musicEngine.getCurrentTrackIndex() + 1} / {TRACKS.length}
                    </span>
                    <span className="font-pixel text-[9px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                      {currentTrack.genre}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {currentTrack.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentTrack.description}
                  </p>

                  {/* 16-Step LED Beat Sequencer Indicator */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-slate-400 mb-1 flex justify-between">
                      <span>SYNTH SEQUENCER</span>
                      <span>STEP: {(currentStep % 16) + 1}/16</span>
                    </div>
                    <div className="grid grid-cols-16 gap-1">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const isCurrent = isPlaying && (currentStep % 16) === i;
                        const isBeat = i % 4 === 0;
                        return (
                          <div
                            key={i}
                            className={`h-2 rounded-xs transition-all duration-75 ${
                              isCurrent
                                ? 'bg-yellow-400 shadow-[0_0_8px_#facc15] scale-125'
                                : isBeat
                                ? 'bg-slate-700'
                                : 'bg-slate-800'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Track Selection List */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
                    Select Soundtrack Cartridge:
                  </div>
                  {TRACKS.map((t, idx) => {
                    const isSelected = idx === musicEngine.getCurrentTrackIndex();
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleSelectTrack(idx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-yellow-400/10 border-yellow-400/60 text-white shadow-[0_0_15px_rgba(250,204,21,0.15)]'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                            isSelected ? 'bg-yellow-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}>
                            0{idx + 1}
                          </span>
                          <div className="truncate">
                            <div className={`font-bold truncate ${isSelected ? 'text-yellow-300' : 'text-white'}`}>
                              {t.title}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {t.genre} • {t.bpm} BPM
                            </div>
                          </div>
                        </div>

                        {isSelected && isPlaying && (
                          <div className="flex items-center gap-0.5">
                            <span className="w-1 h-3 bg-yellow-400 animate-pulse rounded-full" />
                            <span className="w-1 h-4 bg-pink-500 animate-pulse rounded-full delay-75" />
                            <span className="w-1 h-2 bg-cyan-400 animate-pulse rounded-full delay-150" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Master Volume Slider & Retro Sound Test */}
                <div className="pt-2 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const newVol = volume > 0 ? 0 : 0.45;
                        setVolume(newVol);
                        musicEngine.setVolume(newVol);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                    >
                      {volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-yellow-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono text-xs text-slate-400 w-10 text-right">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>

                  {/* Sound FX Testing Pads */}
                  <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-[10px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      SFX PADS:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => soundManager.playCoin()}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-yellow-400 hover:text-slate-950 text-yellow-400 transition-colors"
                      >
                        COIN
                      </button>
                      <button
                        onClick={() => soundManager.playSuccess()}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-400 hover:text-slate-950 text-emerald-400 transition-colors"
                      >
                        WIN
                      </button>
                      <button
                        onClick={() => soundManager.playGameOver()}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-pink-500 hover:text-white text-pink-400 transition-colors"
                      >
                        OVER
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
