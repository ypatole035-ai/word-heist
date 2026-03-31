import { useState } from 'react';

interface Props {
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
}

interface TutorialStep {
  icon: string;
  title: string;
  body: string;
  example?: string;
  exampleLabel?: string;
}

const STEPS: TutorialStep[] = [
  {
    icon: '🏴‍☠️',
    title: 'MISSION BRIEFING',
    body:
      'Welcome, operative. Your mission: crack 6 encrypted vault locks before the timer hits zero. ' +
      'Each lock is guarded by a word puzzle. Solve them all and the vault is yours.',
    example: '6 LOCKS  ·  90 SECONDS  ·  3 WRONG ANSWERS = LOCKDOWN',
    exampleLabel: 'THE STAKES',
  },
  {
    icon: '🔤',
    title: 'ANAGRAM',
    body:
      'Letters from the answer are scrambled and presented one by one. ' +
      'Rearrange them in your head — or on paper — then type the correct word.',
    example: 'UNSCRAMBLE: T A R G E T  →  TARGET',
    exampleLabel: 'EXAMPLE',
  },
  {
    icon: '🔐',
    title: 'CAESAR CIPHER',
    body:
      'Each letter has been shifted forward through the alphabet by a fixed number. ' +
      'The shift amount is shown in the puzzle. Reverse the shift to decode the word.',
    example: 'DECODE (shift -3): VKDGRZ  →  SHADOW\n(V-3=S, K-3=H, D-3=A…)',
    exampleLabel: 'EXAMPLE',
  },
  {
    icon: '🔍',
    title: 'HIDDEN WORD',
    body:
      'A capitalised word is embedded inside a sentence. It may be split across two words ' +
      'or concealed by extra letters. Spot the capital-letter block and that\'s your answer.',
    example: '"The agent carefully CRACKed the safe."  →  CRACK',
    exampleLabel: 'EXAMPLE',
  },
  {
    icon: '❓',
    title: 'RIDDLE / DEFINITION',
    body:
      'A cryptic riddle or spy-themed definition describes a single word. ' +
      'Think laterally — the answer is usually a simple, powerful noun or verb.',
    example: '"I have hands but cannot clap. I tell you something vital every second."  →  CLOCK',
    exampleLabel: 'EXAMPLE',
  },
  {
    icon: '_ _',
    title: 'MISSING VOWELS',
    body:
      'All vowels (A E I O U) have been removed and replaced with underscores. ' +
      'The consonants remain in order. Fill in the blanks to complete the word. ' +
      'Type the full word — no spaces, no underscores.',
    example: 'F _ R _ W _ L L  →  FIREWALL',
    exampleLabel: 'EXAMPLE',
  },
  {
    icon: '⚠️',
    title: 'PENALTIES & HINTS',
    body:
      'Every wrong answer costs 8 seconds and raises the Security Level. ' +
      '3 wrong answers triggers VAULT LOCKDOWN — instant game over. ' +
      'You have 2 Hints per run. Each reveals one random letter of the answer.',
    example: 'WRONG → -8s · SEC LVL +1\nSEC LVL 3 → LOCKDOWN\nHINT → reveals 1 letter',
    exampleLabel: 'CONSEQUENCES',
  },
  {
    icon: '💰',
    title: 'HEIST CREDITS',
    body:
      'Complete all 6 locks to earn Heist Credits. ' +
      'Faster clears, unused hints, low security levels, and win streaks all increase your payout. ' +
      'Spend credits in the Vault Shop to unlock new terminal themes.',
    example: 'Base 50 + time left + 25 per unused hint\n× (1 + streak × 0.25)',
    exampleLabel: 'CREDIT FORMULA',
  },
];

export default function Tutorial({ onClose, primaryColor, secondaryColor }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(4px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          maxWidth: '540px',
          width: '100%',
          background: '#000',
          border: `2px solid ${primaryColor}60`,
          borderRadius: '10px',
          boxShadow: `0 0 60px ${primaryColor}25, 0 0 120px ${primaryColor}10`,
          fontFamily: 'VT323, monospace',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            background: `${primaryColor}12`,
            borderBottom: `1px solid ${primaryColor}30`,
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ color: primaryColor, fontSize: '0.75rem', letterSpacing: '0.3em', opacity: 0.7 }}>
            OPERATIVE TRAINING · {step + 1}/{STEPS.length}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '1.4rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0 4px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Step indicator dots */}
        <div style={{ display: 'flex', gap: '6px', padding: '14px 20px 0', justifyContent: 'center' }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              style={{
                width: i === step ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === step ? primaryColor : `${primaryColor}30`,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: i === step ? `0 0 8px ${primaryColor}` : 'none',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px' }}>
          {/* Icon + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div
              style={{
                fontSize: '2.2rem',
                lineHeight: 1,
                filter: `drop-shadow(0 0 8px ${primaryColor}80)`,
              }}
            >
              {current.icon}
            </div>
            <div
              style={{
                fontSize: '1.8rem',
                color: primaryColor,
                letterSpacing: '0.1em',
                textShadow: `0 0 16px ${primaryColor}`,
              }}
            >
              {current.title}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              marginBottom: current.example ? '20px' : '0',
              letterSpacing: '0.02em',
            }}
          >
            {current.body}
          </div>

          {/* Example box */}
          {current.example && (
            <div
              style={{
                border: `1px solid ${secondaryColor}40`,
                borderRadius: '6px',
                background: `${secondaryColor}08`,
                padding: '12px 16px',
                marginBottom: '0',
              }}
            >
              {current.exampleLabel && (
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: secondaryColor,
                    letterSpacing: '0.3em',
                    opacity: 0.8,
                    marginBottom: '6px',
                  }}
                >
                  {current.exampleLabel}
                </div>
              )}
              <div
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.92rem',
                  color: secondaryColor,
                  whiteSpace: 'pre-line',
                  textShadow: `0 0 8px ${secondaryColor}60`,
                  letterSpacing: '0.05em',
                }}
              >
                {current.example}
              </div>
            </div>
          )}
        </div>

        {/* Navigation footer */}
        <div
          style={{
            borderTop: `1px solid ${primaryColor}20`,
            padding: '14px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: 'transparent',
              border: `1px solid ${primaryColor}40`,
              borderRadius: '4px',
              padding: '8px 18px',
              color: step === 0 ? 'rgba(255,255,255,0.2)' : primaryColor,
              fontSize: '1rem',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.1em',
              transition: 'all 0.2s',
            }}
          >
            ← PREV
          </button>

          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            {step + 1} / {STEPS.length}
          </div>

          {isLast ? (
            <button
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${primaryColor}30, ${primaryColor}15)`,
                border: `1px solid ${primaryColor}`,
                borderRadius: '4px',
                padding: '8px 22px',
                color: primaryColor,
                fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace',
                letterSpacing: '0.1em',
                boxShadow: `0 0 14px ${primaryColor}40`,
              }}
            >
              LET'S HEIST ▶
            </button>
          ) : (
            <button
              onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
              style={{
                background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)`,
                border: `1px solid ${primaryColor}80`,
                borderRadius: '4px',
                padding: '8px 22px',
                color: primaryColor,
                fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace',
                letterSpacing: '0.1em',
              }}
            >
              NEXT →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
