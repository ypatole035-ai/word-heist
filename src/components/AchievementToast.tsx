import { useEffect, useState } from 'react';
import { Achievement } from '../types';

interface Props {
  achievement: Achievement | null;
  primaryColor: string;
  onDone: () => void;
}

export default function AchievementToast({ achievement, primaryColor, onDone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!achievement) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 3200);
    return () => clearTimeout(t);
  }, [achievement]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!achievement) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '16px',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        border: `1px solid ${primaryColor}`,
        borderRadius: '8px',
        padding: '14px 18px',
        maxWidth: '300px',
        boxShadow: `0 0 30px ${primaryColor}40`,
        transform: visible ? 'translateX(0)' : 'translateX(340px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
        fontFamily: 'VT323, monospace',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', flexShrink: 0 }}>{achievement.icon}</div>
      <div>
        <div style={{ fontSize: '0.6rem', color: primaryColor, letterSpacing: '0.3em', opacity: 0.7, marginBottom: '2px' }}>
          ACHIEVEMENT UNLOCKED
        </div>
        <div style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', lineHeight: 1.2, marginBottom: '2px' }}>
          {achievement.name}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', lineHeight: 1.3 }}>
          {achievement.desc}
        </div>
      </div>
    </div>
  );
}
