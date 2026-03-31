import { useEffect, useState } from 'react';
import GlitchText from './GlitchText';
import Tutorial from './Tutorial';
import { StoredData } from '../types';
import { getTodayString } from '../storage';

interface Props {
  onStart: (mode: 'classic' | 'daily' | 'practice') => void;
  onShop: () => void;
  onHowTo: () => void;
  onScores: () => void;
  stored: StoredData;
  primaryColor: string;
  secondaryColor: string;
}

export default function MainMenu({ onStart, onShop, onHowTo, onScores, stored, primaryColor, secondaryColor }: Props) {
  const [show, setShow] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const today = getTodayString();
  const dailyDone = stored.dailyDate === today && stored.dailyCompleted;

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const btnStyle = (color: string, disabled = false) => ({
    background: disabled ? 'transparent' : `linear-gradient(135deg, ${color}15, ${color}08)`,
    border: `1px solid ${disabled ? 'rgba(255,255,255,0.15)' : color}`,
    borderRadius: '4px',
    padding: '13px 32px',
    width: '100%',
    maxWidth: '320px',
    fontFamily: 'VT323, monospace',
    fontSize: '1.2rem',
    color: disabled ? 'rgba(255,255,255,0.25)' : color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    letterSpacing: '0.15em',
    boxShadow: disabled ? 'none' : `0 0 12px ${color}20`,
    transition: 'all 0.2s ease',
    textAlign: 'center' as const,
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'VT323, monospace',
        opacity: show ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Top decorative line */}
      <div style={{ width: '100%', maxWidth: '400px', height: '1px', background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`, marginBottom: '28px' }} />

      {/* Subtitle */}
      <div style={{ fontSize: '0.8rem', color: secondaryColor, letterSpacing: '0.4em', marginBottom: '8px', opacity: 0.8 }}>
        [ CLASSIFIED OPERATION ]
      </div>

      {/* Main title */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <GlitchText
          text="WORD"
          style={{ display: 'block', fontSize: 'clamp(3rem, 10vw, 5rem)', letterSpacing: '0.2em', lineHeight: 1 }}
          color={primaryColor}
          intensity={0.4}
        />
        <GlitchText
          text="HEIST"
          style={{ display: 'block', fontSize: 'clamp(3rem, 10vw, 5rem)', letterSpacing: '0.2em', lineHeight: 1 }}
          color={secondaryColor}
          intensity={0.3}
        />
      </div>

      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginBottom: '32px' }}>
        CRACK 6 LOCKS · BEAT THE CLOCK · ESCAPE
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '28px',
          padding: '10px 20px',
          border: `1px solid ${primaryColor}20`,
          borderRadius: '4px',
          background: 'rgba(0,0,0,0.5)',
          fontSize: '0.85rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>CREDITS: </span>
          <span style={{ color: secondaryColor }}>{stored.totalCredits} CR</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>STREAK: </span>
          <span style={{ color: primaryColor }}>{stored.winStreak}×</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>BEST: </span>
          <span style={{ color: primaryColor }}>{stored.classicHighScore}</span>
        </div>
      </div>

      {/* Menu buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
        <button onClick={() => onStart('classic')} style={btnStyle(primaryColor)}>
          ▶ CLASSIC MODE
        </button>
        <button
          onClick={() => !dailyDone && onStart('daily')}
          style={btnStyle(secondaryColor, dailyDone)}
        >
          {dailyDone ? '✓ DAILY COMPLETE' : '◈ DAILY CHALLENGE'}
        </button>
        <button
          onClick={() => onStart('practice')}
          style={{
            ...btnStyle(secondaryColor),
            border: `1px solid ${secondaryColor}70`,
            background: `linear-gradient(135deg, ${secondaryColor}10, ${secondaryColor}05)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          🎓 PRACTICE MODE
          <span style={{
            position: 'absolute', top: '3px', right: '8px',
            fontSize: '0.5rem', color: secondaryColor,
            letterSpacing: '0.1em', opacity: 0.6,
          }}>
            NO TIMER
          </span>
        </button>
        <button onClick={onShop} style={btnStyle(primaryColor)}>
          ◆ VAULT SHOP
        </button>

        {/* Two-column row for secondary buttons */}
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '320px' }}>
          <button
            onClick={() => setShowTutorial(true)}
            style={{ ...btnStyle(secondaryColor), flex: 1, padding: '13px 10px', fontSize: '1rem' }}
          >
            📖 TUTORIAL
          </button>
          <button
            onClick={onHowTo}
            style={{ ...btnStyle(primaryColor), flex: 1, padding: '13px 10px', fontSize: '1rem' }}
          >
            ? HOW TO PLAY
          </button>
        </div>

        <button onClick={onScores} style={btnStyle(primaryColor)}>
          ◉ HIGH SCORES
        </button>
      </div>

      {/* Bottom decoration */}
      <div style={{ width: '100%', maxWidth: '400px', height: '1px', background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`, marginTop: '28px' }} />
      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginTop: '12px', letterSpacing: '0.15em' }}>
        v2.1 // CLASSIFIED // EYES ONLY
      </div>

      {/* Tutorial overlay */}
      {showTutorial && (
        <Tutorial
          onClose={() => setShowTutorial(false)}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
    </div>
  );
}
