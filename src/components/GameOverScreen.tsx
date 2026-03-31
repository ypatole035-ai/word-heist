import { useEffect, useState } from 'react';
import GlitchText from './GlitchText';
import { playAlarm, playGlitch } from '../audio';

interface Props {
  reason: 'timeout' | 'lockdown';
  locksCleared: number;
  onMenu: () => void;
  onRetry: () => void;
  primaryColor: string;
}

export default function GameOverScreen({ reason, locksCleared, onMenu, onRetry, primaryColor }: Props) {
  const [show, setShow] = useState(false);
  const [alarmPhase, setAlarmPhase] = useState(false);

  useEffect(() => {
    playGlitch();
    setTimeout(() => playAlarm(), 200);
    const t1 = setTimeout(() => setShow(true), 100);
    const alarmLoop = setInterval(() => setAlarmPhase(p => !p), 500);
    return () => { clearTimeout(t1); clearInterval(alarmLoop); };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: alarmPhase ? 'rgba(20,0,0,1)' : '#000',
        padding: '20px',
        fontFamily: 'VT323, monospace',
        transition: 'background 0.2s ease',
        position: 'relative',
      }}
    >
      {/* Red border alarm */}
      <div style={{
        position: 'fixed',
        inset: 0,
        border: `6px solid ${alarmPhase ? '#ff2244' : 'transparent'}`,
        pointerEvents: 'none',
        transition: 'border-color 0.2s ease',
        zIndex: 100,
        boxShadow: alarmPhase ? 'inset 0 0 60px rgba(255,34,68,0.3)' : 'none',
      }} />

      <div
        style={{
          opacity: show ? 1 : 0,
          transition: 'opacity 0.5s ease',
          textAlign: 'center',
        }}
      >
        {/* Warning icons */}
        <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'alarmFlash 0.5s infinite' }}>⚠</div>

        {/* Title */}
        <GlitchText
          text="VAULT"
          style={{ display: 'block', fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '0.1em', lineHeight: 1 }}
          color="#ff2244"
          intensity={0.8}
        />
        <GlitchText
          text="LOCKDOWN"
          style={{ display: 'block', fontSize: 'clamp(2.5rem, 8vw, 4rem)', letterSpacing: '0.1em', lineHeight: 1 }}
          color="#ff2244"
          intensity={0.8}
        />

        <div style={{ fontSize: '1rem', color: 'rgba(255,100,100,0.7)', letterSpacing: '0.2em', marginTop: '12px', marginBottom: '24px' }}>
          {reason === 'lockdown' ? '[ SECURITY BREACH DETECTED ]' : '[ TIME EXPIRED — MISSION FAILED ]'}
        </div>

        {/* Stats */}
        <div style={{
          border: '1px solid rgba(255,34,68,0.4)',
          borderRadius: '8px',
          padding: '16px 24px',
          background: 'rgba(255,0,0,0.05)',
          marginBottom: '24px',
          display: 'inline-block',
        }}>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,100,100,0.6)', letterSpacing: '0.15em', marginBottom: '8px' }}>MISSION REPORT</div>
          <div style={{ color: '#ff6666', fontSize: '1rem' }}>
            LOCKS CLEARED: <span style={{ color: '#ff2244' }}>{locksCleared}/6</span>
          </div>
          <div style={{ color: '#ff6666', fontSize: '1rem', marginTop: '4px' }}>
            STATUS: <span style={{ color: '#ff2244' }}>OPERATIVE COMPROMISED</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,100,100,0.4)', marginTop: '8px' }}>
            Win streak has been reset.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onRetry}
            style={{
              background: 'rgba(255,34,68,0.15)',
              border: '1px solid #ff2244',
              borderRadius: '4px',
              padding: '10px 24px',
              color: '#ff2244',
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.1em',
              boxShadow: '0 0 15px rgba(255,34,68,0.3)',
            }}
          >
            ↻ TRY AGAIN
          </button>
          <button
            onClick={onMenu}
            style={{
              background: 'transparent',
              border: `1px solid ${primaryColor}60`,
              borderRadius: '4px',
              padding: '10px 24px',
              color: primaryColor,
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.1em',
            }}
          >
            ⌂ MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
}
