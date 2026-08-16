import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
}

const PARTICLE_COLORS = [
  '#facc15', // Neon Yellow
  '#22d3ee', // Cyber Cyan
  '#f472b6', // Arcade Pink
  '#a855f7', // Electric Purple
];

const MAX_PARTICLES = 50;

export const ParticleTrailCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if the device is touch-based or lacks a fine pointer
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Do not initialize on touch devices or if reduced motion is enabled
    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number | null = null;
    let isRunning = false;
    let particles: Particle[] = [];
    let lastSpawnTime = 0;
    let lastX = 0;
    let lastY = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const spawnParticles = (x: number, y: number) => {
      // Limit number of particles per mouse step
      const count = Math.min(2, Math.floor(Math.random() * 2) + 1);

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift(); // Remove oldest particle if limit reached
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.8;
        const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        const maxAlpha = 0.25 + Math.random() * 0.2; // Faint and subtle

        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2, // Subtle upward float
          size: Math.random() * 2.2 + 1.2,
          alpha: maxAlpha,
          maxAlpha,
          decay: 0.015 + Math.random() * 0.02, // Smooth quick fade out
          color,
        });
      }
    };

    const loop = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        
        // Draw square retro pixel particle
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      }
    };

    const startLoopIfNeeded = () => {
      if (!isRunning) {
        isRunning = true;
        animFrameId = requestAnimationFrame(loop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      // Throttling: spawn only if moved at least 5px or 25ms passed
      if (dist > 5 || now - lastSpawnTime > 25) {
        spawnParticles(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
        lastSpawnTime = now;
        startLoopIfNeeded();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ opacity: 0.85 }}
    />
  );
};
