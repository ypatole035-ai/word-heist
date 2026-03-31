import { useEffect, useState } from 'react';

interface Props {
  level: number; // 0-3
  primaryColor: string;
}

export default function SecurityLevel({ level, primaryColor }: Props) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (level > 0) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 600);
      return () => clearTimeout(t);
    }
  }, [level]);

  const labels = ['CLEAR', 'ALERT', 'DANGER', 'LOCKDOWN'];
  const colors = [primaryColor, '#ffaa00', '#ff6600', '#ff0000'];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="text-xs tracking-widest opacity-60"
        style={{ color: primaryColor, fontFamily: 'VT323, monospace' }}
      >
        SECURITY
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '28px',
              height: '12px',
              border: `1px solid ${level > i ? colors[Math.min(level, 3)] : 'rgba(255,255,255,0.2)'}`,
              background: level > i
                ? colors[Math.min(level, 3)]
                : 'transparent',
              boxShadow: level > i
                ? `0 0 8px ${colors[Math.min(level, 3)]}, inset 0 0 4px ${colors[Math.min(level, 3)]}`
                : 'none',
              transition: 'all 0.3s ease',
              animation: animating && level > i ? 'securityPulse 0.3s ease' : 'none',
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: 'VT323, monospace',
          fontSize: '0.85rem',
          color: colors[Math.min(level, 3)],
          textShadow: level > 0 ? `0 0 8px ${colors[Math.min(level, 3)]}` : 'none',
          animation: level === 3 ? 'alarmFlash 0.5s infinite' : 'none',
        }}
      >
        {labels[Math.min(level, 3)]}
      </div>
      {level === 3 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            border: '4px solid rgba(255,0,0,0.6)',
            animation: 'alarmBorder 0.5s infinite',
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
}
