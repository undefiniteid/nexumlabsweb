'use client'
import React, { useRef, useEffect } from 'react';

const NeonThreads: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W: number, H: number;
    let t = 0;
    const threads: any[] = [];
    let isVisible = true;

    // Inicializamos hilos una sola vez
    const initThreads = (height: number) => {
      threads.length = 0;
      for (let i = 0; i < 8; i++) {
        threads.push({
          yRel: 0.1 + (i / 7) * 0.8, // Posición relativa 0-1
          a1Rel: 0.15 + Math.random() * 0.05,
          a2Rel: 0.05 + Math.random() * 0.03,
          a3Rel: 0.02 + Math.random() * 0.02,
          f1: 0.3 + Math.random() * 0.2,
          f2: 0.6 + Math.random() * 0.3,
          f3: 1.0 + Math.random() * 0.4,
          ph1: Math.random() * Math.PI * 2,
          ph2: Math.random() * Math.PI * 2,
          ph3: Math.random() * Math.PI * 2,
          sp: 0.002 + Math.random() * 0.003,
          width: 0.5 + Math.random() * 0.5,
          glow: 8 + Math.random() * 12,
          alpha: 0.5 + Math.random() * 0.4,
          glowAlpha: 0.04 + Math.random() * 0.04,
          hue: 190 + Math.random() * 100,
        });
      }
    };

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.01 });

    observer.observe(canvas);

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      
      if (newW !== W || newH !== H) {
        W = canvas.width = newW;
        H = canvas.height = newH;
        if (threads.length === 0) initThreads(H);
      }
    }

    function draw() {
      if (isVisible && threads.length > 0) {
        ctx!.fillStyle = 'rgba(8, 0, 15, 0.12)';
        ctx!.fillRect(0, 0, W, H);

        for (const th of threads) {
          const N = 100; 
          const pts: [number, number][] = [];
          const yBase = th.yRel * H;
          const a1 = th.a1Rel * H;
          const a2 = th.a2Rel * H;
          const a3 = th.a3Rel * H;

          for (let s = 0; s <= N; s++) {
            const nx = s / N;
            const px = nx * W;
            const py = yBase
              + Math.sin(nx * Math.PI * 2 * th.f1 + t * th.sp + th.ph1) * a1
              + Math.sin(nx * Math.PI * 2 * th.f2 + t * th.sp * 0.7 + th.ph2) * a2
              + Math.sin(nx * Math.PI * 2 * th.f3 + t * th.sp * 0.4 + th.ph3) * a3;
            pts.push([px, py]);
          }

          const createPath = () => {
            ctx!.beginPath();
            ctx!.moveTo(pts[0][0], pts[0][1]);
            for (let s = 1; s < pts.length - 2; s++) {
              const mx = (pts[s][0] + pts[s+1][0]) / 2;
              const my = (pts[s][1] + pts[s+1][1]) / 2;
              ctx!.quadraticCurveTo(pts[s][0], pts[s][1], mx, my);
            }
          };

          ctx!.strokeStyle = `hsla(${th.hue}, 100%, 75%, ${th.glowAlpha * 0.3})`;
          ctx!.lineWidth = th.glow * 3;
          createPath(); ctx!.stroke();

          ctx!.strokeStyle = `hsla(${th.hue}, 100%, 80%, ${th.glowAlpha})`;
          ctx!.lineWidth = th.glow;
          createPath(); ctx!.stroke();

          ctx!.strokeStyle = `hsla(${th.hue}, 100%, 90%, ${th.alpha * 0.6})`;
          ctx!.lineWidth = th.width * 2;
          createPath(); ctx!.stroke();

          ctx!.strokeStyle = `hsla(${th.hue}, 100%, 100%, ${th.alpha})`;
          ctx!.lineWidth = th.width * 0.5;
          createPath(); ctx!.stroke();
        }
        t += 1;
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default NeonThreads;
