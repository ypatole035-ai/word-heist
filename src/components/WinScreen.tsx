import { useEffect, useState } from 'react';
import Blueprint from './Blueprint';
import { StoredData, GameMode } from '../types';
import { playWin } from '../audio';

interface Props {
  creditsEarned: number;
  timeLeft: number;
  hintsUsed: number;
  mode: GameMode;
  stored: StoredData;
  primaryColor: string;
  secondaryColor: string;
  onMenu: () => void;
  onPlayAgain: () => void;
  onShop: () => void;
}

export default function WinScreen({
  creditsEarned, timeLeft, hintsUsed, mode, stored,
  primaryColor, secondaryColor, onMenu, onPlayAgain, onShop
}: Props) {
  const [reveal, setReveal] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    playWin();
    // Spawn confetti
    const items = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: [primaryColor, secondaryColor, '#ffffff', '#ffaa00'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2,
      size: 4 + Math.random() * 6,
    }));
    setConfetti(items);

    const t1 = setTimeout(() => setReveal(true), 200);
    const t2 = setTimeout(() => setShowBlueprint(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const btnStyle = (color: string) => ({
    background: `${color}15`,
    border: `1px solid ${color}`,
    borderRadius: '4px',
    padding: '10px 24px',
    color,
    fontSize: '1rem',
    cursor: 'pointer',
    fontFamily: 'VT323, monospace',
    letterSpacing: '0.1em',
    boxShadow: `0 0 10px ${color}30`,
    transition: 'all 0.2s ease',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'VT323, monospace',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          style={{
            position: 'fixed',
            top: '-10px',
            left: `${c.x}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            background: c.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            boxShadow: `0 0 4px ${c.color}`,
            animation: `confettiFall ${2 + c.delay}s ${c.delay}s linear forwards`,
            zIndex: 200,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div
        style={{
          opacity: reveal ? 1 : 0,
          transform: reveal ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          width: '100%',
          maxWidth: '700px',
          textAlign: 'center',
        }}
      >
        {/* Win header */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '0.8rem', color: secondaryColor, letterSpacing: '0.4em', opacity: 0.8 }}>
            [ OPERATION COMPLETE ]
          </div>
          <div
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              color: primaryColor,
              textShadow: `0 0 30px ${primaryColor}, 0 0 60px ${primaryColor}60`,
              letterSpacing: '0.1em',
              animation: 'winGlow 2s infinite alternate',
            }}
          >
            VAULT CRACKED!
          </div>
          <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>
            ALL 6 LOCKS BREACHED
          </div>
        </div>

        {/* Credits earned */}
        <div
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            border: `2px solid ${secondaryColor}`,
            borderRadius: '8px',
            background: `${secondaryColor}10`,
            boxShadow: `0 0 30px ${secondaryColor}30`,
            margin: '16px 0',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em' }}>CREDITS EARNED</div>
          <div style={{ fontSize: '3rem', color: secondaryColor, textShadow: `0 0 20px ${secondaryColor}`, lineHeight: 1.1 }}>
            +{creditsEarned} CR
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            TOTAL: {stored.totalCredits} CR
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          {[
            { label: 'TIME LEFT', value: `${timeLeft}s` },
            { label: 'HINTS USED', value: `${hintsUsed}` },
            { label: 'STREAK', value: `${stored.winStreak}x` },
            { label: 'MODE', value: mode.toUpperCase() },
          ].map(s => (
            <div key={s.label} style={{
              textAlign: 'center',
              padding: '8px 16px',
              border: `1px solid ${primaryColor}30`,
              borderRadius: '4px',
              background: 'rgba(0,0,0,0.5)',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{s.label}</div>
              <div style={{ fontSize: '1.3rem', color: primaryColor }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Blueprint */}
        <div
          style={{
            opacity: showBlueprint ? 1 : 0,
            transform: showBlueprint ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.8s ease',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: primaryColor, letterSpacing: '0.2em', opacity: 0.6, marginBottom: '8px' }}>
            [ RETRIEVED VAULT BLUEPRINT ]
          </div>
          <Blueprint
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            creditsEarned={creditsEarned}
            timeLeft={timeLeft}
            hintsUsed={hintsUsed}
            mode={mode}
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onPlayAgain} style={btnStyle(primaryColor)}>▶ PLAY AGAIN</button>
          <button onClick={onShop} style={btnStyle(secondaryColor)}>◆ SPEND CREDITS</button>
          <button onClick={onMenu} style={btnStyle('rgba(255,255,255,0.4)')}>⌂ MAIN MENU</button>
        </div>
      </div>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes winGlow {
          0% { text-shadow: 0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}60; }
          100% { text-shadow: 0 0 40px ${primaryColor}, 0 0 80px ${primaryColor}80; }
        }
      `}</style>
    </div>
  );
}
