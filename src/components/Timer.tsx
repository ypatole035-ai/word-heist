import { useEffect, useState } from 'react';
import { playTick } from '../audio';

interface Props {
  timeLeft: number;
  primaryColor: string;
  running: boolean;
}

export default function Timer({ timeLeft, primaryColor, running }: Props) {
  const [flash, setFlash] = useState(false);
  const isLow = timeLeft <= 20;
  const isCritical = timeLeft <= 10;

  useEffect(() => {
    if (isLow && running && timeLeft > 0) {
      playTick();
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 200);
      return () => clearTimeout(t);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center">
      <div
        className="text-xs tracking-widest mb-1 opacity-60"
        style={{ color: primaryColor, fontFamily: 'VT323, monospace' }}
      >
        TIME REMAINING
      </div>
      <div
        style={{
          fontFamily: 'VT323, monospace',
          fontSize: isCritical ? '3rem' : '2.5rem',
          color: isCritical ? '#ff2244' : isLow ? '#ffaa00' : primaryColor,
          textShadow: isCritical
            ? `0 0 20px #ff2244, 0 0 40px #ff0000`
            : isLow
            ? `0 0 15px #ffaa00`
            : `0 0 10px ${primaryColor}`,
          animation: isLow && running ? 'timerPulse 1s infinite' : 'none',
          opacity: flash ? 0.4 : 1,
          transition: 'opacity 0.1s',
          lineHeight: 1,
        }}
      >
        {display}
      </div>
    </div>
  );
}
