'use client'
import React from 'react';

export default function ShimmerButton({ children, className }: { children?: React.ReactNode, className?: string }) {
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    <div className={`flex items-center justify-center font-sans ${className || ''}`}>
      <style>{customCss}</style>
      <button className="relative inline-flex items-center justify-center p-[3px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 rounded-full transition-all duration-300 shadow-inner">
          {children || "Shimmer Button"}
        </span>
      </button>
    </div>
  );
}
