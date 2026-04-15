'use client'
import React, { useRef, useEffect } from 'react';

const NeonStellarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    const STAR_COUNT = 150;
    const NEON_COUNT = 25;
    const stars: Star[] = [];
    const neonParticles: NeonParticle[] = [];

    const NEON_COLORS = [
      { r: 56, g: 189, b: 248 }, // Cyan
      { r: 139, g: 92, b: 246 }, // Purple
      { r: 236, g: 72, b: 153 }, // Pink
    ];

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    class Star {
      x: number; y: number; size: number; opacity: number;
      twinkle: number; speed: number;

      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random();
        this.twinkle = Math.random() * 0.05;
        this.speed = Math.random() * 0.05;
      }

      update() {
        this.opacity += this.twinkle;
        if (this.opacity > 0.8 || this.opacity < 0.2) this.twinkle *= -1;
      }

      draw() {
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class NeonParticle {
      x: number; y: number; vx: number; vy: number;
      radius: number; color: { r: number, g: number, b: number };
      alpha: number; phase: number;

      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.phase += 0.01;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }

      draw() {
        const currentAlpha = this.alpha * (0.8 + 0.2 * Math.sin(this.phase));
        
        // Glow effect (optimized: no shadowBlur)
        ctx!.beginPath();
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 6);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentAlpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx!.fillStyle = gradient;
        ctx!.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2);
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${this.color.r + 100}, ${this.color.g + 100}, ${this.color.b + 100}, ${currentAlpha})`;
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function init() {
      resize();
      stars.length = 0;
      neonParticles.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
      for (let i = 0; i < NEON_COUNT; i++) neonParticles.push(new NeonParticle());
    }

    let frameId: number;
    function animate() {
      // Background with slight trailing effect
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx!.fillRect(0, 0, W, H);

      for (const s of stars) {
        s.update();
        s.draw();
      }

      ctx!.globalCompositeOperation = 'screen';
      for (const p of neonParticles) {
        p.update();
        p.draw();
      }
      ctx!.globalCompositeOperation = 'source-over';

      frameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-black"
    />
  );
};

export default NeonStellarBackground;
