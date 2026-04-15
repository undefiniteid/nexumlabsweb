"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }[] = [];
    
    let mouse = { x: -100, y: -100 };
    // Smooth the aura position using linear interpolation
    let aura = { x: -100, y: -100 };

    // Neon palette for the particles
    const colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#3b82f6"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Spawn tiny neon particles at the mouse position
      const count = Math.floor(Math.random() * 3) + 1; // 1-3 particles per mouse event
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2;
        const maxLife = Math.random() * 40 + 20; // Lasts 20-60 frames
        
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 15,
          y: mouse.y + (Math.random() - 0.5) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife: maxLife,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };
    
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp (smooth follow) aura position towards mouse
      aura.x += (mouse.x - aura.x) * 0.2;
      aura.y += (mouse.y - aura.y) * 0.2;

      // Draw the Glowing Aura (3x cursor size approx)
      if (mouse.x > 0 && mouse.y > 0) {
        const radius = 45; // Approximately 3 times the visual width of a standard arrow cursor
        const gradient = ctx.createRadialGradient(aura.x, aura.y, 0, aura.x, aura.y, radius);
        
        // Cyberpunk colors for the aura
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");    // Bright blue core
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.15)"); // Purple mid
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)");      // Fade out

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(aura.x, aura.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Small dense bright core to anchor the cursor
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#3b82f6";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(aura.x, aura.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Update and Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Slower drifting effect
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // Slight gravity/falloff
        p.life--;
        p.size *= 0.94; // Shrink over time

        if (p.life <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
          continue;
        }

        const opacity = p.life / p.maxLife;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        
        // Neon glow on the particles
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Reset canvas state
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] h-screen w-screen mix-blend-screen"
    />
  );
}
