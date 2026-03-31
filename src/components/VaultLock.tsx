import { useEffect, useRef, useState } from 'react';

interface Props {
  index: number;
  solved: boolean;
  active: boolean;
  primaryColor: string;
  lockColor: string;
}

export default function VaultLock({ index, solved, active, primaryColor, lockColor }: Props) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number; life: number }[]>([]);
  const [justSolved, setJustSolved] = useState(false);
  const prevSolved = useRef(false);

  useEffect(() => {
    if (solved && !prevSolved.current) {
      setJustSolved(true);
      // Spawn particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1,
      }));
      setParticles(newParticles);
      setTimeout(() => setJustSolved(false), 800);
      setTimeout(() => setParticles([]), 1200);
    }
    prevSolved.current = solved;
  }, [solved]);

  const lockNum = index + 1;

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: '100%',
        aspectRatio: '1',
        maxWidth: '130px',
        border: `2px solid ${solved ? lockColor : active ? primaryColor : 'rgba(255,255,255,0.12)'}`,
        borderRadius: '8px',
        background: solved
          ? `linear-gradient(135deg, rgba(0,0,0,0.8), ${lockColor}18)`
          : active
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(0,0,0,0.6)',
        boxShadow: solved
          ? `0 0 20px ${lockColor}80, 0 0 40px ${lockColor}30, inset 0 0 20px ${lockColor}10`
          : active
          ? `0 0 12px ${primaryColor}40`
          : 'none',
        transition: 'all 0.5s ease',
        cursor: 'default',
        overflow: 'hidden',
        animation: justSolved ? 'lockUnlock 0.6s ease' : active && !solved ? 'activePulse 2s infinite' : 'none',
      }}
    >
      {/* Scanline overlay on solved */}
      {solved && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Lock number */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '8px',
          fontFamily: 'VT323, monospace',
          fontSize: '0.7rem',
          color: solved ? lockColor : 'rgba(255,255,255,0.3)',
          letterSpacing: '0.05em',
        }}
      >
        #{lockNum}
      </div>

      {/* Lock icon */}
      <div
        style={{
          fontSize: '2rem',
          filter: solved
            ? `drop-shadow(0 0 8px ${lockColor}) drop-shadow(0 0 16px ${lockColor}80)`
            : active
            ? `drop-shadow(0 0 6px ${primaryColor})`
            : 'none',
          animation: active && !solved ? 'lockFlicker 3s infinite' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {solved ? '🔓' : active ? '🔐' : '🔒'}
      </div>

      {/* Status text */}
      <div
        style={{
          fontFamily: 'VT323, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: solved ? lockColor : active ? primaryColor : 'rgba(255,255,255,0.2)',
          marginTop: '4px',
          textShadow: solved ? `0 0 6px ${lockColor}` : 'none',
        }}
      >
        {solved ? 'CRACKED' : active ? 'TARGET' : 'LOCKED'}
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: lockColor,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 4px ${lockColor}`,
            animation: `particle-${p.id} 1s forwards`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* CSS particle animations */}
      {particles.length > 0 && (
        <style>{particles.map(p => `
          @keyframes particle-${p.id} {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(${p.vx * 20}px, ${p.vy * 20}px) scale(0); opacity: 0; }
          }
        `).join('')}</style>
      )}
    </div>
  );
}
