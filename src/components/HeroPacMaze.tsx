import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { HackHertzLogo } from './HackHertzLogo';

// 17 columns x 19 rows compact maze optimized for Hero card aspect ratio
const MAZE_GRID = [
  "#################",
  "#.......#.......#",
  "#O##.##.#.##.##O#",
  "#.##.##.#.##.##.#",
  "#...............#",
  "#.##.#.###.#.##.#",
  "#....#..#..#....#",
  "####.## # ##.####",
  "   #.# GGG #.#   ",
  "####.# ### #.####",
  "   #.#  F  #.#   ",
  "####.# ### #.####",
  "#.......#.......#",
  "#.##.##.#.##.##.#",
  "#O.#....P....#.O#",
  "##.#.##.#.##.#.##",
  "#....#..#..#....#",
  "#.#####.#.#####.#",
  "#################"
];

const COLS = 17;
const ROWS = 19;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;

interface Ghost {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  dir: Direction;
  state: 'NORMAL' | 'FRIGHTENED' | 'EATEN';
  speed: number;
}

interface ScorePopup {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
}

export const HeroPacMaze: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game States
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'PAUSED' | 'DYING' | 'GAMEOVER' | 'VICTORY'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(24500);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [ghostCombo, setGhostCombo] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Entities References
  const mapRef = useRef<string[]>(MAZE_GRID.map(r => r));
  const pacmanRef = useRef({
    x: 8,
    y: 14,
    dir: null as Direction,
    nextDir: null as Direction,
    mouthAngle: 0.22,
    mouthOpening: true,
    speed: 0.12,
    deathProgress: 0,
  });

  const ghostsRef = useRef<Ghost[]>([
    { id: 'blinky', name: 'Blinky', color: '#ff2255', x: 8, y: 8, dir: 'UP', state: 'NORMAL', speed: 0.085 },
    { id: 'pinky', name: 'Pinky', color: '#ff77cc', x: 7, y: 8, dir: 'UP', state: 'NORMAL', speed: 0.08 },
    { id: 'inky', name: 'Inky', color: '#00e5ff', x: 9, y: 8, dir: 'UP', state: 'NORMAL', speed: 0.075 },
  ]);

  const frightenedTimerRef = useRef<number>(0);
  const scorePopupsRef = useRef<ScorePopup[]>([]);
  const wakaToggleRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // Load High Score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hackhertz_hero_pacmaze_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // Storage unavailable
    }
  }, []);

  const addScore = useCallback((amount: number) => {
    setScore(prev => {
      const next = prev + amount;
      setHighScore(currHigh => {
        if (next > currHigh) {
          try {
            localStorage.setItem('hackhertz_hero_pacmaze_highscore', next.toString());
          } catch {
            // Ignore
          }
          return next;
        }
        return currHigh;
      });
      return next;
    });
  }, []);

  // Reset Board Map & Entities
  const resetBoard = useCallback((nextLevel = 1, keepScore = false) => {
    mapRef.current = MAZE_GRID.map(r => r);
    pacmanRef.current = {
      x: 8,
      y: 14,
      dir: null,
      nextDir: null,
      mouthAngle: 0.22,
      mouthOpening: true,
      speed: 0.12 + Math.min(0.04, (nextLevel - 1) * 0.01),
      deathProgress: 0,
    };

    const gSpeed = 0.08 + Math.min(0.03, (nextLevel - 1) * 0.006);
    ghostsRef.current = [
      { id: 'blinky', name: 'Blinky', color: '#ff2255', x: 8, y: 8, dir: 'UP', state: 'NORMAL', speed: gSpeed + 0.006 },
      { id: 'pinky', name: 'Pinky', color: '#ff77cc', x: 7, y: 8, dir: 'UP', state: 'NORMAL', speed: gSpeed },
      { id: 'inky', name: 'Inky', color: '#00e5ff', x: 9, y: 8, dir: 'UP', state: 'NORMAL', speed: gSpeed - 0.005 },
    ];

    frightenedTimerRef.current = 0;
    scorePopupsRef.current = [];
    setGhostCombo(1);

    if (!keepScore) {
      setScore(0);
      setLives(3);
    }
    setLevel(nextLevel);
  }, []);

  const resetPositionsAfterDeath = useCallback(() => {
    pacmanRef.current.x = 8;
    pacmanRef.current.y = 14;
    pacmanRef.current.dir = null;
    pacmanRef.current.nextDir = null;
    pacmanRef.current.deathProgress = 0;

    ghostsRef.current[0].x = 8; ghostsRef.current[0].y = 8; ghostsRef.current[0].state = 'NORMAL'; ghostsRef.current[0].dir = 'UP';
    ghostsRef.current[1].x = 7; ghostsRef.current[1].y = 8; ghostsRef.current[1].state = 'NORMAL'; ghostsRef.current[1].dir = 'UP';
    ghostsRef.current[2].x = 9; ghostsRef.current[2].y = 8; ghostsRef.current[2].state = 'NORMAL'; ghostsRef.current[2].dir = 'UP';
    frightenedTimerRef.current = 0;
  }, []);

  const isWall = (x: number, y: number, isGhost = false): boolean => {
    const rx = Math.round(x);
    const ry = Math.round(y);
    if (ry < 0 || ry >= ROWS) return false;
    if (rx < 0 || rx >= COLS) return false;
    const char = mapRef.current[ry]?.[rx];
    if (char === '#') return true;
    if (char === '-' && !isGhost) return true;
    return false;
  };

  const startGame = () => {
    soundManager.playCoin();
    resetBoard(1, false);
    setGameState('PLAYING');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space'].includes(e.code)) {
        if (gameState === 'PLAYING') {
          e.preventDefault();
        }
      }

      if (e.code === 'Space') {
        if (gameState === 'PLAYING') setGameState('PAUSED');
        else if (gameState === 'PAUSED') setGameState('PLAYING');
        else if (gameState === 'IDLE' || gameState === 'GAMEOVER' || gameState === 'VICTORY') startGame();
        return;
      }

      let newDir: Direction = null;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') newDir = 'UP';
      if (e.code === 'ArrowDown' || e.code === 'KeyS') newDir = 'DOWN';
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') newDir = 'LEFT';
      if (e.code === 'ArrowRight' || e.code === 'KeyD') newDir = 'RIGHT';

      if (newDir) {
        if (gameState === 'IDLE' || gameState === 'GAMEOVER' || gameState === 'VICTORY') {
          startGame();
        }
        pacmanRef.current.nextDir = newDir;
        if (pacmanRef.current.dir === null) {
          pacmanRef.current.dir = newDir;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const handleDirectionPress = (dir: Direction) => {
    soundManager.playClick();
    if (gameState === 'IDLE' || gameState === 'GAMEOVER' || gameState === 'VICTORY') {
      startGame();
    }
    pacmanRef.current.nextDir = dir;
    if (pacmanRef.current.dir === null) {
      pacmanRef.current.dir = dir;
    }
  };

  // Main Canvas Render & Engine Loop
  useEffect(() => {
    let lastTime = performance.now();

    const gameLoop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return;
      }

      const tileW = canvas.width / COLS;
      const tileH = canvas.height / ROWS;

      // Dark Neon Background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      renderMaze(ctx, tileW, tileH, mapRef.current);

      if (gameState === 'PLAYING') {
        updatePacman(delta);
        updateGhosts(delta);
        checkCollisions();
        updateTimersAndPopups(delta);
      } else if (gameState === 'DYING') {
        pacmanRef.current.deathProgress += delta * 1.6;
        if (pacmanRef.current.deathProgress >= 1) {
          if (lives > 1) {
            setLives(l => l - 1);
            resetPositionsAfterDeath();
            setGameState('PLAYING');
          } else {
            setLives(0);
            soundManager.playPacDeath();
            setGameState('GAMEOVER');
          }
        }
      }

      renderPacman(ctx, tileW, tileH);
      renderGhosts(ctx, tileW, tileH);
      renderScorePopups(ctx, tileW, tileH);

      if (gameState === 'IDLE') {
        renderOverlay(ctx, 'HACKHERTZ MAZE', 'PRESS START TO PLAY', '#facc15');
      } else if (gameState === 'PAUSED') {
        renderOverlay(ctx, 'PAUSED', 'PRESS RESUME', '#38bdf8');
      } else if (gameState === 'GAMEOVER') {
        renderOverlay(ctx, 'GAME OVER', 'INSERT COIN / RESTART', '#ef4444');
      } else if (gameState === 'VICTORY') {
        renderOverlay(ctx, 'STAGE CLEAR!', 'ADVANCING...', '#10b981');
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, lives, level, resetPositionsAfterDeath]);

  // Update Pacman
  const updatePacman = (delta: number) => {
    const pac = pacmanRef.current;
    const moveDist = pac.speed * (delta * 60);

    if (pac.mouthOpening) {
      pac.mouthAngle += 0.06;
      if (pac.mouthAngle >= 0.38) pac.mouthOpening = false;
    } else {
      pac.mouthAngle -= 0.06;
      if (pac.mouthAngle <= 0.04) pac.mouthOpening = true;
    }

    if (pac.nextDir && pac.nextDir !== pac.dir) {
      const curGridX = Math.round(pac.x);
      const curGridY = Math.round(pac.y);
      const distToCenter = Math.hypot(pac.x - curGridX, pac.y - curGridY);

      if (distToCenter < 0.28) {
        let checkX = curGridX;
        let checkY = curGridY;
        if (pac.nextDir === 'UP') checkY -= 1;
        if (pac.nextDir === 'DOWN') checkY += 1;
        if (pac.nextDir === 'LEFT') checkX -= 1;
        if (pac.nextDir === 'RIGHT') checkX += 1;

        if (!isWall(checkX, checkY)) {
          pac.x = curGridX;
          pac.y = curGridY;
          pac.dir = pac.nextDir;
        }
      }
    }

    if (pac.dir) {
      let targetX = pac.x;
      let targetY = pac.y;

      if (pac.dir === 'UP') targetY -= moveDist;
      if (pac.dir === 'DOWN') targetY += moveDist;
      if (pac.dir === 'LEFT') targetX -= moveDist;
      if (pac.dir === 'RIGHT') targetX += moveDist;

      if (targetX < -0.5) targetX = COLS - 0.5;
      if (targetX > COLS - 0.5) targetX = -0.5;

      let canMove = true;
      if (pac.dir === 'UP' && isWall(pac.x, targetY - 0.4)) canMove = false;
      if (pac.dir === 'DOWN' && isWall(pac.x, targetY + 0.4)) canMove = false;
      if (pac.dir === 'LEFT' && isWall(targetX - 0.4, pac.y)) canMove = false;
      if (pac.dir === 'RIGHT' && isWall(targetX + 0.4, pac.y)) canMove = false;

      if (canMove) {
        pac.x = targetX;
        pac.y = targetY;
      } else {
        pac.x = Math.round(pac.x);
        pac.y = Math.round(pac.y);
      }

      const currentCellX = Math.round(pac.x);
      const currentCellY = Math.round(pac.y);

      if (currentCellY >= 0 && currentCellY < ROWS && currentCellX >= 0 && currentCellX < COLS) {
        const rowArr = mapRef.current[currentCellY].split('');
        const cell = rowArr[currentCellX];

        if (cell === '.') {
          rowArr[currentCellX] = ' ';
          mapRef.current[currentCellY] = rowArr.join('');
          addScore(10);
          wakaToggleRef.current = !wakaToggleRef.current;
          soundManager.playWaka(wakaToggleRef.current);
          checkStageClear();
        } else if (cell === 'O') {
          rowArr[currentCellX] = ' ';
          mapRef.current[currentCellY] = rowArr.join('');
          addScore(50);
          soundManager.playEnergizer();
          frightenedTimerRef.current = 7.5;
          setGhostCombo(1);
          ghostsRef.current.forEach(g => {
            if (g.state !== 'EATEN') g.state = 'FRIGHTENED';
          });
          checkStageClear();
        }
      }
    }
  };

  const checkStageClear = () => {
    let remaining = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (mapRef.current[r][c] === '.' || mapRef.current[r][c] === 'O') {
          remaining++;
        }
      }
    }

    if (remaining === 0) {
      soundManager.playCoin();
      setGameState('VICTORY');
      setTimeout(() => {
        resetBoard(level + 1, true);
        setGameState('PLAYING');
      }, 2000);
    }
  };

  const updateGhosts = (delta: number) => {
    const pac = pacmanRef.current;

    ghostsRef.current.forEach((ghost) => {
      const gSpeed = (ghost.state === 'FRIGHTENED' ? ghost.speed * 0.6 : ghost.state === 'EATEN' ? ghost.speed * 1.6 : ghost.speed) * (delta * 60);

      if (ghost.state === 'EATEN') {
        const distToHouse = Math.hypot(ghost.x - 8, ghost.y - 8);
        if (distToHouse < 0.6) {
          ghost.state = 'NORMAL';
          ghost.dir = 'UP';
        }
      }

      const curX = Math.round(ghost.x);
      const curY = Math.round(ghost.y);
      const distToCenter = Math.hypot(ghost.x - curX, ghost.y - curY);

      if (distToCenter < 0.16) {
        const possibleDirs: Direction[] = [];
        const opposites: Record<string, Direction> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
        const opp = ghost.dir ? opposites[ghost.dir] : null;

        const dirs: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
        dirs.forEach(d => {
          if (d === opp && ghost.state !== 'FRIGHTENED') return;
          let nx = curX;
          let ny = curY;
          if (d === 'UP') ny -= 1;
          if (d === 'DOWN') ny += 1;
          if (d === 'LEFT') nx -= 1;
          if (d === 'RIGHT') nx += 1;

          if (!isWall(nx, ny, true)) {
            possibleDirs.push(d);
          }
        });

        if (possibleDirs.length > 0) {
          let targetX = pac.x;
          let targetY = pac.y;

          if (ghost.state === 'EATEN') {
            targetX = 8;
            targetY = 8;
          } else if (ghost.state === 'FRIGHTENED') {
            targetX = Math.random() * COLS;
            targetY = Math.random() * ROWS;
          } else {
            if (ghost.id === 'pinky') {
              targetX = pac.x + (pac.dir === 'RIGHT' ? 2 : pac.dir === 'LEFT' ? -2 : 0);
              targetY = pac.y + (pac.dir === 'DOWN' ? 2 : pac.dir === 'UP' ? -2 : 0);
            } else if (ghost.id === 'inky') {
              targetX = pac.x + (Math.random() * 3 - 1.5);
              targetY = pac.y + (Math.random() * 3 - 1.5);
            }
          }

          let bestDir = possibleDirs[0];
          let bestDist = Infinity;

          possibleDirs.forEach(d => {
            let nx = curX;
            let ny = curY;
            if (d === 'UP') ny -= 1;
            if (d === 'DOWN') ny += 1;
            if (d === 'LEFT') nx -= 1;
            if (d === 'RIGHT') nx += 1;
            const dist = Math.hypot(nx - targetX, ny - targetY);
            if (dist < bestDist) {
              bestDist = dist;
              bestDir = d;
            }
          });

          ghost.dir = bestDir;
        }
      }

      if (ghost.dir) {
        let gx = ghost.x;
        let gy = ghost.y;
        if (ghost.dir === 'UP') gy -= gSpeed;
        if (ghost.dir === 'DOWN') gy += gSpeed;
        if (ghost.dir === 'LEFT') gx -= gSpeed;
        if (ghost.dir === 'RIGHT') gx += gSpeed;

        if (gx < -0.5) gx = COLS - 0.5;
        if (gx > COLS - 0.5) gx = -0.5;

        ghost.x = gx;
        ghost.y = gy;
      }
    });
  };

  const checkCollisions = () => {
    const pac = pacmanRef.current;

    ghostsRef.current.forEach(ghost => {
      const dist = Math.hypot(pac.x - ghost.x, pac.y - ghost.y);

      if (dist < 0.65) {
        if (ghost.state === 'FRIGHTENED') {
          ghost.state = 'EATEN';
          const points = 200 * ghostCombo;
          addScore(points);
          soundManager.playEatGhost();
          setGhostCombo(c => c * 2);

          scorePopupsRef.current.push({
            id: Date.now() + Math.random(),
            x: ghost.x,
            y: ghost.y,
            text: `+${points}`,
            color: '#38bdf8',
            opacity: 1
          });
        } else if (ghost.state === 'NORMAL') {
          soundManager.playPacDeath();
          setGameState('DYING');
        }
      }
    });
  };

  const updateTimersAndPopups = (delta: number) => {
    if (frightenedTimerRef.current > 0) {
      frightenedTimerRef.current -= delta;
      if (frightenedTimerRef.current <= 0) {
        frightenedTimerRef.current = 0;
        setGhostCombo(1);
        ghostsRef.current.forEach(g => {
          if (g.state === 'FRIGHTENED') g.state = 'NORMAL';
        });
      }
    }

    scorePopupsRef.current.forEach(p => {
      p.y -= delta * 0.8;
      p.opacity -= delta * 0.9;
    });
    scorePopupsRef.current = scorePopupsRef.current.filter(p => p.opacity > 0);
  };

  // Render Maze
  const renderMaze = (ctx: CanvasRenderingContext2D, tw: number, th: number, map: string[]) => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const char = map[r]?.[c];
        const px = c * tw;
        const py = r * th;

        if (char === '#') {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(px, py, tw, th);
          ctx.strokeStyle = '#2563eb';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(px + 1, py + 1, tw - 2, th - 2);
        } else if (char === '.') {
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(px + tw / 2, py + th / 2, Math.max(1.5, tw * 0.12), 0, Math.PI * 2);
          ctx.fill();
        } else if (char === 'O') {
          const pulse = (Math.sin(Date.now() / 160) + 1) / 2;
          const radius = tw * (0.26 + pulse * 0.08);

          ctx.fillStyle = '#facc15';
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(px + tw / 2, py + th / 2, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
  };

  // Render Pacman
  const renderPacman = (ctx: CanvasRenderingContext2D, tw: number, th: number) => {
    const pac = pacmanRef.current;
    const px = pac.x * tw + tw / 2;
    const py = pac.y * th + th / 2;
    const radius = Math.min(tw, th) * 0.44;

    ctx.save();
    ctx.translate(px, py);

    if (gameState === 'DYING') {
      const prog = pac.deathProgress;
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0, radius * (1 - prog * 0.8)), -Math.PI / 2 + prog * Math.PI, -Math.PI / 2 - prog * Math.PI, false);
      ctx.lineTo(0, 0);
      ctx.fill();
    } else {
      let angle = 0;
      if (pac.dir === 'UP') angle = -Math.PI / 2;
      if (pac.dir === 'DOWN') angle = Math.PI / 2;
      if (pac.dir === 'LEFT') angle = Math.PI;
      if (pac.dir === 'RIGHT') angle = 0;

      ctx.rotate(angle);

      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 5;

      ctx.beginPath();
      const mouth = pac.mouthAngle * Math.PI;
      ctx.arc(0, 0, radius, mouth, Math.PI * 2 - mouth, false);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  };

  // Render Ghosts
  const renderGhosts = (ctx: CanvasRenderingContext2D, tw: number, th: number) => {
    const isFrightened = frightenedTimerRef.current > 0;
    const flashWhite = isFrightened && frightenedTimerRef.current < 2.2 && Math.floor(Date.now() / 180) % 2 === 0;

    ghostsRef.current.forEach(ghost => {
      const gx = ghost.x * tw + tw / 2;
      const gy = ghost.y * th + th / 2;
      const radius = Math.min(tw, th) * 0.42;

      ctx.save();
      ctx.translate(gx, gy);

      if (ghost.state !== 'EATEN') {
        let bodyColor = ghost.color;
        if (ghost.state === 'FRIGHTENED') {
          bodyColor = flashWhite ? '#ffffff' : '#2563eb';
        }

        ctx.fillStyle = bodyColor;
        ctx.shadowColor = bodyColor;
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.arc(0, -radius * 0.2, radius, Math.PI, 0, false);
        ctx.lineTo(radius, radius * 0.75);

        const waveStep = (radius * 2) / 3;
        ctx.lineTo(radius - waveStep * 0.5, radius * 0.55);
        ctx.lineTo(radius - waveStep, radius * 0.75);
        ctx.lineTo(radius - waveStep * 1.5, radius * 0.55);
        ctx.lineTo(radius - waveStep * 2, radius * 0.75);
        ctx.lineTo(-radius, radius * 0.75);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Eyes
      if (ghost.state !== 'FRIGHTENED') {
        let eyeOffsetX = 0;
        let eyeOffsetY = 0;
        if (ghost.dir === 'LEFT') eyeOffsetX = -2;
        if (ghost.dir === 'RIGHT') eyeOffsetX = 2;
        if (ghost.dir === 'UP') eyeOffsetY = -2;
        if (ghost.dir === 'DOWN') eyeOffsetY = 2;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-radius * 0.35 + eyeOffsetX, -radius * 0.2 + eyeOffsetY, radius * 0.26, 0, Math.PI * 2);
        ctx.arc(radius * 0.35 + eyeOffsetX, -radius * 0.2 + eyeOffsetY, radius * 0.26, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e3a8a';
        ctx.beginPath();
        ctx.arc(-radius * 0.35 + eyeOffsetX * 1.3, -radius * 0.2 + eyeOffsetY * 1.3, radius * 0.13, 0, Math.PI * 2);
        ctx.arc(radius * 0.35 + eyeOffsetX * 1.3, -radius * 0.2 + eyeOffsetY * 1.3, radius * 0.13, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = flashWhite ? '#ef4444' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(-radius * 0.3, -radius * 0.2, radius * 0.11, 0, Math.PI * 2);
        ctx.arc(radius * 0.3, -radius * 0.2, radius * 0.11, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  };

  const renderScorePopups = (ctx: CanvasRenderingContext2D, tw: number, th: number) => {
    scorePopupsRef.current.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.text, p.x * tw + tw / 2, p.y * th + th / 2);
      ctx.restore();
    });
  };

  const renderOverlay = (ctx: CanvasRenderingContext2D, title: string, subtitle: string, color: string) => {
    ctx.save();
    ctx.fillStyle = 'rgba(3, 7, 18, 0.82)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.font = 'bold 15px "Press Start 2P", monospace, system-ui';
    ctx.fillText(title, ctx.canvas.width / 2, ctx.canvas.height / 2 - 12);

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px "Press Start 2P", monospace, system-ui';
    ctx.fillText(subtitle, ctx.canvas.width / 2, ctx.canvas.height / 2 + 14);

    ctx.restore();
  };

  return (
    <div className={`relative w-full max-w-md mx-auto rounded-2xl bg-slate-950/95 border-2 border-yellow-400/60 p-4 sm:p-5 shadow-[0_0_35px_rgba(250,204,21,0.3)] flex flex-col justify-between overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50 max-w-none rounded-none p-6 bg-black flex flex-col justify-center items-center' : ''
    }`}>
      
      {/* CRT Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-35 z-20 pointer-events-none" />

      {/* Header Box */}
      <div className="flex items-center justify-between border-b border-yellow-400/30 pb-2.5 z-10">
        <div className="flex items-center gap-2">
          <HackHertzLogo size="xs" variant="badge" className="w-5 h-5" />
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[9px] text-cyan-400 uppercase tracking-widest">
            STAGE 01: PAC-MAZE
          </span>
          <button
            onClick={() => {
              const muted = soundManager.toggleMute();
              setIsMuted(muted);
              if (!muted) soundManager.playClick();
            }}
            className="p-1 rounded bg-slate-900 border border-slate-700 hover:border-yellow-400 text-slate-300 hover:text-yellow-400 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-yellow-400" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Arcade Scoreboard Ticker */}
      <div className="grid grid-cols-3 gap-2 my-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 font-pixel text-center text-[10px] z-10">
        <div>
          <span className="text-red-400 block text-[8px]">1UP</span>
          <span className="text-white font-mono font-bold">{score.toString().padStart(5, '0')}</span>
        </div>
        <div>
          <span className="text-yellow-400 block text-[8px]">HIGH SCORE</span>
          <span className="text-yellow-400 font-mono font-bold">{highScore.toString().padStart(5, '0')}</span>
        </div>
        <div>
          <span className="text-cyan-400 block text-[8px]">LIVES</span>
          <span className="text-pink-400 font-mono">{Array(lives).fill('🟡').join('')}</span>
        </div>
      </div>

      {/* Interactive Arcade Maze Canvas */}
      <div className="relative z-10 flex flex-col items-center justify-center my-1">
        <canvas
          ref={canvasRef}
          width={374}
          height={418}
          className="w-full max-w-[340px] aspect-[17/19] rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] bg-[#030712] border border-blue-500/40 touch-none"
        />
      </div>

      {/* Control Actions & Mobile D-Pad Bar */}
      <div className="pt-2 z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          {gameState === 'IDLE' || gameState === 'GAMEOVER' || gameState === 'VICTORY' ? (
            <button
              onClick={startGame}
              className="w-full py-2.5 rounded-xl font-pixel text-[11px] bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>INSERT COIN / PLAY</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setGameState(gameState === 'PLAYING' ? 'PAUSED' : 'PLAYING');
                }}
                className={`flex-1 py-2 rounded-lg font-pixel text-[10px] flex items-center justify-center gap-1.5 transition-colors ${
                  gameState === 'PLAYING'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700'
                    : 'bg-emerald-500 text-slate-950 font-bold'
                }`}
              >
                {gameState === 'PLAYING' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{gameState === 'PLAYING' ? 'PAUSE' : 'RESUME'}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  resetBoard(1, false);
                  setGameState('IDLE');
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
                title="Reset Game"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Compact D-Pad Controls for Touch / Quick Navigation */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
          <span className="hidden sm:inline">Use <kbd className="text-yellow-400">WASD</kbd> or <kbd className="text-yellow-400">Arrows</kbd></span>
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <button
              onClick={() => handleDirectionPress('LEFT')}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-yellow-400 active:bg-yellow-400/20"
              title="Left"
            >
              <ArrowLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleDirectionPress('UP')}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-yellow-400 active:bg-yellow-400/20"
              title="Up"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleDirectionPress('DOWN')}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-yellow-400 active:bg-yellow-400/20"
              title="Down"
            >
              <ArrowDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleDirectionPress('RIGHT')}
              className="p-1.5 rounded bg-slate-900 border border-slate-700 text-yellow-400 active:bg-yellow-400/20"
              title="Right"
            >
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <span className="text-cyan-400">STAGE {level}</span>
        </div>
      </div>

    </div>
  );
};
