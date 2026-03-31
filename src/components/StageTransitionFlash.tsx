import { useEffect, useState } from 'react';

interface Props {
  trigger: number; // increment to trigger
  stageIndex: number;
  codename: string;
  primaryColor: string;
}

const STAGE_CODENAMES = ['APPROACH', 'INFILTRATE', 'BYPASS', 'PENETRATE', 'ACCESS', 'EXTRACT'];

export default function StageTransitionFlash({ trigger, stageIndex, primaryColor }: Props) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (trigger === 0) return;
    setCurrent(stageIndex);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, [trigger]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  const codename = STAGE_CODENAMES[current] || `STAGE ${current + 1}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        animation: 'stageFlashIn 1.2s ease forwards',
      }}
    >
      <div style={{
        textAlign: 'center',
        fontFamily: 'VT323, monospace',
        animation: 'stageFlashText 1.2s ease forwards',
      }}>
        <div style={{
          fontSize: '0.7rem',
          color: primaryColor,
          letterSpacing: '0.5em',
          opacity: 0.7,
          marginBottom: '8px',
        }}>
          ◈ INITIATING
        </div>
        <div style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          color: primaryColor,
          textShadow: `0 0 40px ${primaryColor}, 0 0 80px ${primaryColor}60`,
          letterSpacing: '0.3em',
        }}>
          {codename}
        </div>
        <div style={{
          fontSize: '0.7rem',
          color: primaryColor,
          letterSpacing: '0.4em',
          opacity: 0.5,
          marginTop: '8px',
        }}>
          STAGE {current + 1} OF 6
        </div>
        {/* Horizontal line */}
        <div style={{
          width: '200px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
          margin: '12px auto 0',
          animation: 'stageLineExpand 0.8s 0.2s ease forwards',
          transform: 'scaleX(0)',
        }} />
      </div>
    </div>
  );
}
