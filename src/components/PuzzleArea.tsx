import { useEffect, useRef, useState } from 'react';
import { Puzzle } from '../types';

interface Props {
  puzzle: Puzzle | null;
  onSubmit: (answer: string) => void;
  onHint: () => void;
  hintsLeft: number;
  hintReveal: string | null;
  primaryColor: string;
  secondaryColor: string;
  wrongFlash: boolean;
  inputDisabled: boolean;
  justSolved: boolean;          // true for ~1.8s after correct answer
  solvedAnswer: string | null;  // the answer that was just solved
  stageIndex: number;           // 0-5, used to show stage info
}

const TYPE_LABELS: Record<string, string> = {
  anagram: '[ ANAGRAM ]',
  caesar: '[ CAESAR CIPHER ]',
  hidden_word: '[ HIDDEN WORD ]',
  definition: '[ RIDDLE ]',
  missing_vowels: '[ MISSING VOWELS ]',
};

const DIFFICULTY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'STAGE 1-2 · EASY',   color: '#00ff88' },
  2: { label: 'STAGE 3-4 · MEDIUM', color: '#ffaa00' },
  3: { label: 'STAGE 5-6 · HARD',   color: '#ff4444' },
};

// IntelFeed: the atmospheric quote typed out as a live terminal feed while solving
function IntelFeed({ intel, primaryColor, secondaryColor, puzzleId }: {
  intel: string;
  primaryColor: string;
  secondaryColor: string;
  puzzleId: string;
}) {
  const [displayed, setDisplayed] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    clearInterval(timerRef.current);
    // Small initial delay so it appears right after puzzle prompt starts typing
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        if (i < intel.length) {
          setDisplayed(intel.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timerRef.current);
        }
      }, 22);
    }, 600);
    return () => {
      clearTimeout(startDelay);
      clearInterval(timerRef.current);
    };
  }, [puzzleId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${primaryColor}25`,
        borderRadius: '6px',
        padding: '14px 16px',
        minHeight: '110px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px',
        borderBottom: `1px solid ${primaryColor}15`,
        paddingBottom: '8px',
      }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: secondaryColor,
          boxShadow: `0 0 6px ${secondaryColor}`,
          animation: 'blink 1.2s infinite',
          flexShrink: 0,
        }} />
        <div style={{
          fontFamily: 'VT323, monospace',
          fontSize: '0.65rem',
          color: secondaryColor,
          letterSpacing: '0.35em',
          opacity: 0.85,
        }}>
          ◈ OPERATIVE INTEL — LIVE FEED
        </div>
      </div>

      {/* Intel text */}
      <div style={{
        fontFamily: 'VT323, monospace',
        fontSize: '1rem',
        color: 'rgba(220,220,220,0.9)',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        textShadow: `0 0 8px ${primaryColor}20`,
        letterSpacing: '0.02em',
      }}>
        {displayed}
        {displayed.length < intel.length && (
          <span style={{ color: primaryColor, animation: 'blink 0.5s infinite' }}>█</span>
        )}
      </div>

      {/* Subtle scanline texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
        borderRadius: '6px',
      }} />
    </div>
  );
}

export default function PuzzleArea({
  puzzle,
  onSubmit,
  onHint,
  hintsLeft,
  hintReveal,
  primaryColor,
  secondaryColor,
  wrongFlash,
  inputDisabled,
  justSolved,
  solvedAnswer,
  stageIndex,
}: Props) {
  const [input, setInput] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Typing effect for puzzle prompt
  useEffect(() => {
    if (!puzzle) return;
    setDisplayText('');
    setInput('');
    setTyping(true);
    let i = 0;
    const fullText = puzzle.prompt;
    clearTimeout(typingTimer.current);
    const type = () => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
        typingTimer.current = setTimeout(type, 16);
      } else {
        setTyping(false);
      }
    };
    type();
    return () => clearTimeout(typingTimer.current);
  }, [puzzle?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-focus input when ready
  useEffect(() => {
    if (!inputDisabled && inputRef.current && !justSolved) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [inputDisabled, puzzle?.id, justSolved]);

  const handleSubmit = () => {
    if (!input.trim() || inputDisabled) return;
    onSubmit(input.trim().toUpperCase());
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  if (!puzzle) {
    return (
      <div style={{
        background: 'rgba(0,0,0,0.5)',
        border: `1px solid ${primaryColor}20`,
        borderRadius: '8px',
        padding: '20px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'VT323, monospace',
        color: primaryColor,
        opacity: 0.4,
        fontSize: '1.2rem',
        letterSpacing: '0.2em',
      }}>
        AWAITING NEXT LOCK...
      </div>
    );
  }

  const diffInfo = DIFFICULTY_LABELS[puzzle.difficulty] || DIFFICULTY_LABELS[1];
  const stageNum = stageIndex + 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* ── Intel Feed (shown during solving, fades on solve) ── */}
      <div style={{
        opacity: justSolved ? 0.3 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: justSolved ? 'none' : 'auto',
      }}>
        <IntelFeed
          intel={puzzle.intel}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          puzzleId={puzzle.id}
        />
      </div>

      {/* ── Puzzle Panel ── */}
      <div
        style={{
          background: 'rgba(0,0,0,0.75)',
          border: `1px solid ${
            justSolved ? '#00ff88'
            : wrongFlash ? '#ff2244'
            : primaryColor
          }${justSolved ? '90' : wrongFlash ? 'bb' : '45'}`,
          borderRadius: '8px',
          padding: '18px 20px',
          boxShadow: justSolved
            ? '0 0 30px rgba(0,255,136,0.25), inset 0 0 20px rgba(0,255,136,0.05)'
            : wrongFlash
            ? '0 0 30px rgba(255,34,68,0.4)'
            : `0 0 20px ${primaryColor}12`,
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          animation: wrongFlash && !justSolved ? 'wrongShake 0.4s ease' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Solved shimmer */}
        {justSolved && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(0,255,136,0.04) 0%, transparent 60%)',
          }} />
        )}

        {/* Stage + type badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{
            fontFamily: 'VT323, monospace', fontSize: '0.72rem',
            color: justSolved ? '#00ff88' : primaryColor,
            letterSpacing: '0.2em',
            textShadow: justSolved ? '0 0 10px #00ff88' : `0 0 6px ${primaryColor}`,
          }}>
            {justSolved ? `✓ STAGE ${stageNum} CLEARED` : `STAGE ${stageNum} / 6`}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              fontFamily: 'VT323, monospace', fontSize: '0.65rem',
              color: diffInfo.color,
              letterSpacing: '0.12em',
              opacity: 0.8,
            }}>
              {diffInfo.label}
            </div>
            <div style={{
              fontFamily: 'VT323, monospace', fontSize: '0.65rem',
              color: secondaryColor, letterSpacing: '0.12em', opacity: 0.7,
            }}>
              {TYPE_LABELS[puzzle.type] || '[ PUZZLE ]'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${primaryColor}30, transparent)` }} />

        {/* Solved state */}
        {justSolved ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'VT323, monospace',
              fontSize: '2rem',
              color: '#00ff88',
              letterSpacing: '0.4em',
              textShadow: '0 0 20px #00ff88, 0 0 40px rgba(0,255,136,0.4)',
              animation: 'solvedGlow 1s ease infinite',
            }}>
              ✓ {solvedAnswer}
            </div>
            <div style={{
              fontFamily: 'VT323, monospace',
              fontSize: '0.8rem',
              color: 'rgba(0,255,136,0.6)',
              letterSpacing: '0.2em',
              animation: 'blink 0.8s infinite',
            }}>
              LOCK CRACKED — ADVANCING...
            </div>
          </div>
        ) : (
          <>
            {/* Puzzle prompt with typing effect */}
            <div style={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.08rem',
              color: '#e0e0e0',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              minHeight: '64px',
              textShadow: '0 0 4px rgba(255,255,255,0.1)',
              position: 'relative', zIndex: 1,
              letterSpacing: '0.02em',
            }}>
              {displayText}
              {typing && (
                <span style={{ animation: 'blink 0.7s infinite', color: primaryColor }}>█</span>
              )}
            </div>

            {/* Hint reveal */}
            {hintReveal && (
              <div style={{
                fontFamily: 'VT323, monospace', fontSize: '0.95rem',
                color: secondaryColor, letterSpacing: '0.3em',
                textShadow: `0 0 10px ${secondaryColor}`,
                padding: '8px 12px',
                border: `1px solid ${secondaryColor}35`,
                borderRadius: '4px',
                background: `${secondaryColor}0c`,
                position: 'relative', zIndex: 1,
              }}>
                ◈ HINT: {hintReveal}
              </div>
            )}

            {/* Input + buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value.toUpperCase())}
                onKeyDown={handleKey}
                disabled={inputDisabled}
                placeholder="ENTER ANSWER..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                style={{
                  flex: 1, minWidth: '120px',
                  background: 'rgba(0,0,0,0.85)',
                  border: `1px solid ${primaryColor}55`,
                  borderRadius: '4px',
                  padding: '9px 13px',
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.15rem',
                  color: primaryColor,
                  outline: 'none',
                  letterSpacing: '0.2em',
                  caretColor: primaryColor,
                  boxShadow: `inset 0 0 12px rgba(0,0,0,0.6), 0 0 8px ${primaryColor}15`,
                  transition: 'border-color 0.2s ease',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={inputDisabled || !input.trim()}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}10)`,
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '4px',
                  padding: '9px 18px',
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.05rem',
                  color: primaryColor,
                  cursor: inputDisabled || !input.trim() ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.1em',
                  boxShadow: `0 0 12px ${primaryColor}25`,
                  opacity: inputDisabled || !input.trim() ? 0.4 : 1,
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                ▶ SUBMIT
              </button>
              <button
                onClick={onHint}
                disabled={hintsLeft <= 0 || inputDisabled}
                title={hintsLeft > 0 ? 'Reveal one letter of the answer' : 'No hints remaining'}
                style={{
                  background: hintsLeft > 0 ? `${secondaryColor}12` : 'transparent',
                  border: `1px solid ${hintsLeft > 0 ? secondaryColor : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: '4px',
                  padding: '9px 13px',
                  fontFamily: 'VT323, monospace',
                  fontSize: '0.95rem',
                  color: hintsLeft > 0 ? secondaryColor : 'rgba(255,255,255,0.18)',
                  cursor: hintsLeft <= 0 || inputDisabled ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                💡 ({hintsLeft})
              </button>
            </div>

            {/* Enter key hint */}
            <div style={{
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.15em',
              fontFamily: 'VT323, monospace',
            }}>
              PRESS ENTER TO SUBMIT · ESC TO PAUSE
            </div>
          </>
        )}
      </div>
    </div>
  );
}
