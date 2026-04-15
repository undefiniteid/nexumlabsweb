'use client'
import React, { useRef, useEffect } from 'react';

const NeonParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W: number, H: number;
    const PARTICLE_COUNT = 80; // Cantidad optimizada
    const particles: Particle[] = [];
    let isVisible = false;

    const NEON_COLORS = [
      { r: 0, g: 180, b: 255 },
      { r: 80, g: 200, b: 255 },
      { r: 0, g: 230, b: 255 },
      { r: 139, g: 92, b: 246 }, // Un toque púrpura para variedad
    ];

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(canvas);

    function resize() {
      if (!canvas) return;
      W = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    }

    class Particle {
      r: number; g: number; b: number;
      radius: number; x: number; y: number;
      vx: number; vy: number;
      alpha: number; baseAlpha: number;
      time: number; speed: number;

      constructor() {
        this.r = 0; this.g = 0; this.b = 0;
        this.radius = 0; this.x = 0; this.y = 0;
        this.vx = 0; this.vy = 0;
        this.alpha = 0; this.baseAlpha = 0;
        this.time = Math.random() * 100;
        this.speed = 0.01 + Math.random() * 0.02;
        this.reset(true);
      }

      reset(startRandom = false) {
        const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
        this.r = color.r; this.g = color.g; this.b = color.b;
        this.radius = 1 + Math.random() * 2;
        this.x = startRandom ? Math.random() * W : -10;
        this.y = Math.random() * H;
        this.vx = 0.4 + Math.random() * 1;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = 0.2 + Math.random() * 0.6;
        this.baseAlpha = this.alpha;
      }

      update() {
        this.time += this.speed;
        this.x += this.vx;
        this.y += this.vy + Math.sin(this.time) * 0.5;
        this.alpha = this.baseAlpha * (0.7 + 0.3 * Math.sin(this.time));

        if (this.x > W + 20) this.reset(false);
      }

      draw() {
        // Truco de rendimiento: dibujar resplandor con un círculo grande translúcido 
        // en lugar de usar shadowBlur que es muy costoso.
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha * 0.3})`;
        ctx!.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2);
        ctx!.fill();

        // Núcleo brillante
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    let frameId: number;
    function animate() {
      if (isVisible) {
        ctx!.clearRect(0, 0, W, H);
        ctx!.globalCompositeOperation = 'screen';
        for (const p of particles) {
          p.update();
          p.draw();
        }
      }
      frameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default NeonParticles;
