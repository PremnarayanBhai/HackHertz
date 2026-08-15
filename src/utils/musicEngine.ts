// Web Audio API Polyphonic Retro Chiptune & Synthwave Music Engine

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  description: string;
  color: string;
}

export const TRACKS: MusicTrack[] = [
  {
    id: 'cyber-odyssey',
    title: '8-Bit Cyber Odyssey',
    artist: 'HackHertz Sound Core',
    genre: 'Chiptune / Arcade',
    bpm: 128,
    description: 'Upbeat retro arcade melody with driving pulse bass and heroic lead synth.',
    color: '#facc15' // yellow
  },
  {
    id: 'neon-circuit',
    title: 'Neon Circuit Dreams',
    artist: 'HackHertz Sound Core',
    genre: 'Synthwave / Retro Lounge',
    bpm: 112,
    description: 'Atmospheric, dreamy cyber arpeggios with deep resonant bass.',
    color: '#ec4899' // pink
  },
  {
    id: 'hackathon-rush',
    title: 'Boss Stage Sprint (140 BPM)',
    artist: 'HackHertz Sound Core',
    genre: 'High-Energy Fast Chiptune',
    bpm: 140,
    description: 'High-octane coding frenzy with rapid 16th-note arpeggios and punchy beats.',
    color: '#06b6d4' // cyan
  },
  {
    id: 'midnight-terminal',
    title: 'Midnight Terminal Lo-Fi',
    artist: 'HackHertz Sound Core',
    genre: 'Lo-Fi 8-Bit Cyberpunk',
    bpm: 96,
    description: 'Relaxed night-time hacking groove with smooth retro square chords.',
    color: '#10b981' // emerald
  }
];

// Note frequencies in Hz
const NOTE_FREQ: Record<string, number> = {
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98,
  'REST': 0
};

type StepCallback = (step: number, trackId: string) => void;

class RetroMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private volume: number = 0.45;
  private timerId: number | null = null;
  private currentStep: number = 0;
  
  private listeners: Set<() => void> = new Set();
  private stepListeners: Set<StepCallback> = new Set();
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {
    // Lazy init
  }

  private initAudio() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);

        this.createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.1; // 100ms noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public subscribeStep(cb: StepCallback) {
    this.stepListeners.add(cb);
    return () => {
      this.stepListeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): MusicTrack {
    return TRACKS[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getVisualizerData(dataArray: Uint8Array): void {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(dataArray);
    } else {
      dataArray.fill(0);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public async play() {
    this.initAudio();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startSequencer();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % TRACKS.length;
    this.currentStep = 0;
    this.notify();
    if (this.isPlaying) {
      this.restartSequencer();
    }
  }

  public prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    this.currentStep = 0;
    this.notify();
    if (this.isPlaying) {
      this.restartSequencer();
    }
  }

  public selectTrack(index: number) {
    if (index >= 0 && index < TRACKS.length) {
      this.currentTrackIndex = index;
      this.currentStep = 0;
      this.notify();
      if (this.isPlaying) {
        this.restartSequencer();
      }
    }
  }

  private restartSequencer() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.startSequencer();
  }

  private startSequencer() {
    const track = TRACKS[this.currentTrackIndex];
    // 16th note interval = (60 / bpm) / 4 in seconds
    const intervalMs = (60000 / track.bpm) / 4;

    this.timerId = window.setInterval(() => {
      this.tick();
    }, intervalMs);
  }

  private tick() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const track = TRACKS[this.currentTrackIndex];
    const now = this.ctx.currentTime;
    const step = this.currentStep % 32;

    this.stepListeners.forEach(cb => cb(step, track.id));

    // Play notes according to current track score
    switch (track.id) {
      case 'cyber-odyssey':
        this.playCyberOdysseyStep(step, now);
        break;
      case 'neon-circuit':
        this.playNeonCircuitStep(step, now);
        break;
      case 'hackathon-rush':
        this.playHackathonRushStep(step, now);
        break;
      case 'midnight-terminal':
        this.playMidnightTerminalStep(step, now);
        break;
    }

    this.currentStep++;
  }

  // --- SOUND SYNTHESIS HELPERS ---

  private playTone(freq: number, type: OscillatorType, duration: number, gainVal: number, now: number, pitchDecay: number = 0) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (pitchDecay > 0) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.4), now + pitchDecay);
      }

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Audio safety
    }
  }

  private playDrumKick(now: number) {
    this.playTone(130, 'triangle', 0.18, 0.5, now, 0.12);
  }

  private playDrumSnare(now: number) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;
    try {
      // Noise component
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.12);

      // Body tone
      this.playTone(180, 'triangle', 0.08, 0.25, now, 0.06);
    } catch {
      // Safety
    }
  }

  private playDrumHiHat(now: number, open: boolean = false) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;
    try {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, now);

      const gain = this.ctx.createGain();
      const dur = open ? 0.1 : 0.04;
      gain.gain.setValueAtTime(open ? 0.15 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + dur);
    } catch {
      // Safety
    }
  }

  // --- TRACK 1: 8-BIT CYBER ODYSSEY ---
  private playCyberOdysseyStep(step: number, now: number) {
    // 32-step loop (2 bars of 16 steps)
    // 1. Drums
    if (step % 8 === 0) this.playDrumKick(now);
    if (step % 8 === 4) this.playDrumSnare(now);
    if (step % 2 === 0) this.playDrumHiHat(now, step % 4 === 2);

    // 2. Bass (Driving 8th notes)
    const bassline = [
      'A2', 'A2', 'A2', 'A2', 'C3', 'C3', 'E2', 'G2',
      'F2', 'F2', 'F2', 'F2', 'G2', 'G2', 'E2', 'G2',
      'A2', 'A2', 'A2', 'A2', 'C3', 'C3', 'E2', 'G2',
      'D2', 'D2', 'F2', 'F2', 'E2', 'E2', 'G2', 'B2'
    ];
    const bassNote = bassline[step];
    if (bassNote && NOTE_FREQ[bassNote]) {
      this.playTone(NOTE_FREQ[bassNote], 'sawtooth', 0.14, 0.22, now);
    }

    // 3. Arpeggio / Chiptune lead
    const arps = [
      'A4', 'C5', 'E5', 'A5', 'G5', 'E5', 'C5', 'E5',
      'F4', 'A4', 'C5', 'F5', 'E5', 'C5', 'G4', 'C5',
      'A4', 'C5', 'E5', 'A5', 'B5', 'G5', 'E5', 'G5',
      'D4', 'F4', 'A4', 'D5', 'E4', 'G4', 'B4', 'E5'
    ];
    const arpNote = arps[step];
    if (arpNote && NOTE_FREQ[arpNote]) {
      this.playTone(NOTE_FREQ[arpNote], 'square', 0.08, 0.12, now);
    }

    // 4. Hero Lead Melodic Accents (on specific beats)
    const leadRhythm: Record<number, string> = {
      0: 'A5', 3: 'C6', 6: 'B5', 8: 'G5', 12: 'E5', 14: 'G5',
      16: 'A5', 19: 'C6', 22: 'D6', 24: 'E6', 28: 'D6', 30: 'B5'
    };
    if (leadRhythm[step]) {
      this.playTone(NOTE_FREQ[leadRhythm[step]], 'square', 0.22, 0.18, now);
    }
  }

  // --- TRACK 2: NEON CIRCUIT DREAMS (Synthwave) ---
  private playNeonCircuitStep(step: number, now: number) {
    // 1. Drums (Smooth chill beats)
    if (step === 0 || step === 10 || step === 16 || step === 26) this.playDrumKick(now);
    if (step === 8 || step === 24) this.playDrumSnare(now);
    if (step % 2 === 0) this.playDrumHiHat(now);

    // 2. Resonant Bass
    const bassSeq = [
      'D2', 'REST', 'D2', 'REST', 'D2', 'REST', 'F2', 'REST',
      'G2', 'REST', 'G2', 'REST', 'A2', 'REST', 'C3', 'REST',
      'Bb2', 'REST', 'Bb2', 'REST', 'Bb2', 'REST', 'D3', 'REST',
      'A2', 'REST', 'A2', 'REST', 'G2', 'REST', 'E2', 'REST'
    ];
    const bNote = bassSeq[step];
    if (bNote && bNote !== 'REST' && NOTE_FREQ[bNote]) {
      this.playTone(NOTE_FREQ[bNote], 'triangle', 0.25, 0.3, now);
    }

    // 3. Dreamy Arpeggios
    const neonArp = [
      'D4', 'F4', 'A4', 'D5', 'F5', 'D5', 'A4', 'F4',
      'G4', 'Bb4', 'D5', 'G5', 'A5', 'G5', 'D5', 'Bb4',
      'F4', 'Bb4', 'D5', 'F5', 'G5', 'F5', 'D5', 'Bb4',
      'E4', 'A4', 'E5', 'E5', 'A5', 'E5', 'C5', 'A4'
    ];
    const nNote = neonArp[step];
    if (nNote && NOTE_FREQ[nNote]) {
      this.playTone(NOTE_FREQ[nNote], 'sine', 0.16, 0.14, now);
    }
  }

  // --- TRACK 3: BOSS STAGE SPRINT (140 BPM) ---
  private playHackathonRushStep(step: number, now: number) {
    // Fast paced 4-on-the-floor
    if (step % 4 === 0) this.playDrumKick(now);
    if (step % 8 === 4) this.playDrumSnare(now);
    this.playDrumHiHat(now, step % 2 === 1);

    // Rapid Bass
    const bassNotes = ['F2', 'F2', 'Ab3', 'F2', 'Bb3', 'F2', 'C3', 'F2'];
    const bNote = bassNotes[step % 8];
    if (NOTE_FREQ[bNote]) {
      this.playTone(NOTE_FREQ[bNote], 'sawtooth', 0.1, 0.24, now);
    }

    // Rapid Arpeggio 16ths
    const arpNotes = [
      'F4', 'Ab4', 'C5', 'Eb5', 'F5', 'Eb5', 'C5', 'Ab4',
      'G4', 'Bb4', 'D5', 'F5', 'G5', 'F5', 'D5', 'Bb4',
      'Ab4', 'C5', 'Eb5', 'Ab5', 'G5', 'Eb5', 'C5', 'Eb5',
      'C4', 'E4', 'G4', 'Bb4', 'C5', 'E5', 'G5', 'C6'
    ];
    const aNote = arpNotes[step];
    if (aNote && NOTE_FREQ[aNote]) {
      this.playTone(NOTE_FREQ[aNote], 'square', 0.06, 0.15, now);
    }
  }

  // --- TRACK 4: MIDNIGHT TERMINAL ---
  private playMidnightTerminalStep(step: number, now: number) {
    // Soft lo-fi groove
    if (step === 0 || step === 6 || step === 16 || step === 22) this.playDrumKick(now);
    if (step === 8 || step === 24) this.playDrumSnare(now);
    if (step % 4 === 2) this.playDrumHiHat(now, true);

    // Smooth bass
    const bass = [
      'E2', 'REST', 'REST', 'E2', 'REST', 'REST', 'G2', 'REST',
      'A2', 'REST', 'REST', 'A2', 'REST', 'REST', 'B2', 'REST',
      'C3', 'REST', 'REST', 'C3', 'REST', 'REST', 'D3', 'REST',
      'B2', 'REST', 'REST', 'B2', 'REST', 'G2', 'REST', 'REST'
    ];
    const b = bass[step];
    if (b && b !== 'REST' && NOTE_FREQ[b]) {
      this.playTone(NOTE_FREQ[b], 'triangle', 0.3, 0.28, now);
    }

    // Lo-fi square blips
    const blips = [
      'E4', 'G4', 'B4', 'E5', 'REST', 'B4', 'G4', 'REST',
      'A4', 'C5', 'E5', 'A5', 'REST', 'E5', 'C5', 'REST',
      'G4', 'B4', 'D5', 'G5', 'REST', 'D5', 'B4', 'REST',
      'F4', 'A4', 'B4', 'D5', 'REST', 'B4', 'A4', 'REST'
    ];
    const blip = blips[step];
    if (blip && blip !== 'REST' && NOTE_FREQ[blip]) {
      this.playTone(NOTE_FREQ[blip], 'square', 0.15, 0.1, now);
    }
  }
}

export const musicEngine = new RetroMusicEngine();
