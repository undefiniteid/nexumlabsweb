import { useMemo } from 'react';

export default function Starfield() {
  const stars = useMemo(() => {
    // Generate 75 stars across the document height (moderate/low density)
    return Array.from({ length: 80 }).map((_, i) => {
      const isYellowish = Math.random() > 0.85;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.8, // 0.8px to 2.3px
        opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
        color: isYellowish ? 'bg-yellow-200' : 'bg-white',
        twinkleDelay: Math.random() * 5,
        twinkleDuration: Math.random() * 4 + 2, // 2 to 6 seconds
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.color}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${star.twinkleDuration}s infinite ease-in-out ${star.twinkleDelay}s`,
            boxShadow: `0 0 ${star.size * 2}px ${star.color === 'bg-white' ? 'rgba(255,255,255,0.8)' : 'rgba(254,240,138,0.8)'}`
          }}
        />
      ))}
    </div>
  );
}
