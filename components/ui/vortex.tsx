"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  rangeHue?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const particleCount = props.particleCount || 500;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || 220;
  const rangeHue = props.rangeHue || 100;
  const backgroundColor = props.backgroundColor || "transparent";

  // All animation state in a single stable ref
  const s = useRef({
    tick: 0,
    noise3D: createNoise3D(),
    particleProps: new Float32Array(particlePropsLength),
    center: [0, 0] as [number, number],
    rafId: 0,
  });

  const TAU = 2 * Math.PI;
  const rand = (n: number) => n * Math.random();
  const fadeInOut = (t: number, m: number) => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;

  const initParticle = (i: number, W: number) => {
    const p = s.current.particleProps;
    p[i]     = rand(W);
    p[i + 1] = s.current.center[1] + rand(rangeY) - rangeY * 0.5;
    p[i + 2] = 0;                              // vx
    p[i + 3] = 0;                              // vy
    p[i + 4] = 0;                              // life
    p[i + 5] = baseSpeed + rand(rangeSpeed) * 300; // ttl
    p[i + 6] = baseSpeed + rand(rangeSpeed);   // speed
    p[i + 7] = baseRadius + rand(rangeRadius); // radius
    p[i + 8] = baseHue + rand(rangeHue);       // hue
  };

  const initParticles = (W: number) => {
    s.current.tick = 0;
    s.current.particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i, W);
    }
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    s.current.tick++;
    const { tick, noise3D, particleProps } = s.current;

    // Background
    ctx.fillStyle = backgroundColor === "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
    if (backgroundColor === "transparent") {
      ctx.clearRect(0, 0, W, H);
    } else {
      ctx.fillRect(0, 0, W, H);
    }

    ctx.globalCompositeOperation = "lighter";

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      let x  = particleProps[i];
      let y  = particleProps[i + 1];
      let vx = particleProps[i + 2];
      let vy = particleProps[i + 3];
      let life = particleProps[i + 4];
      const ttl    = particleProps[i + 5];
      const speed  = particleProps[i + 6];
      const radius = particleProps[i + 7];
      const hue    = particleProps[i + 8];

      const n = noise3D(x * 0.00125, y * 0.00125, tick * 0.0005) * TAU * 2;
      vx = lerp(vx, Math.cos(n), 0.05);
      vy = lerp(vy, Math.sin(n), 0.05);
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      life++;

      if (x2 > W || x2 < 0 || y2 > H || y2 < 0 || life > ttl) {
        initParticle(i, W);
      } else {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = radius;
        ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();

        particleProps[i]     = x2;
        particleProps[i + 1] = y2;
        particleProps[i + 2] = vx;
        particleProps[i + 3] = vy;
        particleProps[i + 4] = life;
      }
    }

    ctx.globalCompositeOperation = "source-over";
    s.current.rafId = requestAnimationFrame(() => drawFrame(ctx, W, H));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const W = container.clientWidth || window.innerWidth;
      const H = container.clientHeight || window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      s.current.center = [W / 2, H / 2];
      return { W, H };
    };

    const { W, H } = resize();
    initParticles(W);

    // Dynamic resize observer for content growth (like accordions)
    const resizeObserver = new ResizeObserver(() => {
      resize();
      // Only re-init if size changes significantly to keep frame rate
      // but canvas size *must* be set
    });
    resizeObserver.observe(container);

    // Cancel any previous animation
    cancelAnimationFrame(s.current.rafId);
    drawFrame(ctx, W, H);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      cancelAnimationFrame(s.current.rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative w-full", props.containerClassName)} ref={containerRef}>
      {/* Canvas background */}
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      {/* Content */}
      <div className={cn("relative z-10", props.className)}>
        {props.children}
      </div>
    </div>
  );
};
