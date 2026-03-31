/**
 * PRACTICE MODE
 * ─────────────
 * No timer. No penalties. No security level. Unlimited hints.
 * Player picks a puzzle TYPE (or "All Types") then works through
 * puzzles one by one at their own pace.
 *
 * Features:
 *  • Type selector (All / Anagram / Caesar / Hidden Word / Riddle / Missing Vowels)
 *  • Live intel feed for each puzzle (same as game)
 *  • Unlimited hints — each press reveals one more letter position
 *  • "Show Answer" button if they're completely stuck (marks as peeked)
 *  • Per-session stats: solved, peeked, hints used, streak
 *  • No credits awarded — this is a sandbox
 *  • Skip button to jump to next puzzle
 *  • Works through the full shuffled pool; wraps around when exhausted
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Puzzle, PuzzleType } from '../types';
import { getPracticeSet, getAllShuffled } from '../puzzles';
import { playUnlock, playWrong } from '../audio';

interface Props {
  onBack: () => void;
  primaryColor: string;
  secondaryColor: string;
}

type FilterType = 'all' | PuzzleType;

const TYPE_OPTIONS: { label: string; value: FilterType; icon: string; desc: string }[] = [
  { value: 'all',           icon: '🎲', label: 'ALL TYPES',      desc: 'Random mix of every puzzle type' },
  { value: 'anagram',       icon: '🔤', label: 'ANAGRAM',        desc: 'Unscramble jumbled letters' },
  { value: 'caesar',        icon: '🔐', label: 'CAESAR CIPHER',  desc: 'Decode shifted alphabet' },
  { value: 'hidden_word',   icon: '🔍', label: 'HIDDEN WORD',    desc: 'Spot the word in a sentence' },
  { value: 'definition',    icon: '🧩', label: 'RIDDLE',         desc: 'Solve from definition/clue' },
  { value: 'missing_vowels',icon: '📝', label: 'MISSING VOWELS', desc: 'Fill the vowels from consonants' },
];

const TYPE_LABELS: Record<string, string> = {
  anagram:        '[ ANAGRAM ]',
  caesar:         '[ CAESAR CIPHER ]',
  hidden_word:    '[ HIDDEN WORD ]',
  definition:     '[ RIDDLE ]',
  missing_vowels: '[ MISSING VOWELS ]',
};

// ── Typewriter for intel feed ──────────────────────────────────────────────────
function IntelFeed({ intel, primaryColor, secondaryColor, puzzleId }: {
  intel: string; primaryColor: string; secondaryColor: string; puzzleId: string;
}) {
  const [displayed, setDisplayed] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    clearInterval(timerRef.current);
    const delay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        if (i < intel.length) {
          setDisplayed(intel.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timerRef.current);
        }
      }, 18);
    }, 300);
    return () => { clearTimeout(delay); clearInterval(timerRef.current); };
  }, [puzzleId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      background: 'rgba(0,0,0,0.55)',
      border: `1px solid ${primaryColor}22`,
      borderRadius: '6px',
      padding: '12px 14px',
      minHeight: '80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '6px', borderBottom: `1px solid ${primaryColor}12` }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: secondaryColor, boxShadow: `0 0 6px ${secondaryColor}`, animation: 'blink 1.2s infinite', flexShrink: 0 }} />
        <div style={{ fontFamily: 'VT323, monospace', fontSize: '0.62rem', color: secondaryColor, letterSpacing: '0.3em', opacity: 0.8 }}>
          ◈ OPERATIVE INTEL — PRACTICE MODE
        </div>
      </div>
      <div style={{ fontFamily: 'VT323, monospace', fontSize: '0.95rem', color: 'rgba(220,220,220,0.85)', lineHeight: 1.55, whiteSpace: 'pre-wrap', letterSpacing: '0.02em' }}>
        {displayed}
        {displayed.length < intel.length && (
          <span style={{ color: primaryColor, animation: 'blink 0.5s infinite' }}>█</span>
        )}
      </div>
    </div>
  );
}

// ── Type Selector Screen ───────────────────────────────────────────────────────
function TypeSelector({ onSelect, primaryColor, secondaryColor, onBack }: {
  onSelect: (type: FilterType) => void;
  primaryColor: string; secondaryColor: string; onBack: () => void;
}) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'VT323, monospace' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '0.7rem', color: secondaryColor, letterSpacing: '0.4em', marginBottom: '8px', opacity: 0.8 }}>
          [ TRAINING FACILITY ]
        </div>
        <div style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: primaryColor, letterSpacing: '0.2em', textShadow: `0 0 20px ${primaryColor}60` }}>
          PRACTICE MODE
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', marginTop: '6px' }}>
          NO TIMER · NO PENALTIES · UNLIMITED HINTS
        </div>
      </div>

      {/* Type grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', width: '100%', maxWidth: '560px', marginBottom: '28px' }}>
        {TYPE_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            style={{
              background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}06)`,
              border: `1px solid ${primaryColor}45`,
              borderRadius: '6px',
              padding: '16px 14px',
              fontFamily: 'VT323, monospace',
              color: '#e0e0e0',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = primaryColor;
              (e.currentTarget as HTMLButtonElement).style.background = `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 16px ${primaryColor}25`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${primaryColor}45`;
              (e.currentTarget as HTMLButtonElement).style.background = `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}06)`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '1.4rem' }}>{opt.icon}</div>
            <div style={{ fontSize: '1rem', color: primaryColor, letterSpacing: '0.12em' }}>{opt.label}</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>{opt.desc}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: `1px solid rgba(255,255,255,0.2)`,
          borderRadius: '4px',
          padding: '10px 28px',
          fontFamily: 'VT323, monospace',
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.4)',
          cursor: 'pointer',
          letterSpacing: '0.15em',
        }}
      >
        ← BACK TO MENU
      </button>
    </div>
  );
}

// ── Main Practice Session ──────────────────────────────────────────────────────
export default function PracticeScreen({ onBack, primaryColor, secondaryColor }: Props) {
  const [phase, setPhase] = useState<'select' | 'play'>('select');
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(false);

  // Practice-specific state
  const [hintLetters, setHintLetters] = useState<(string | null)[]>([]); // null = hidden
  const [wrongFlash, setWrongFlash] = useState(false);
  const [justSolved, setJustSolved] = useState(false);
  const [peeked, setPeeked] = useState(false);           // used "Show Answer"
  const [hintsUsedThisPuzzle, setHintsUsedThisPuzzle] = useState(0);

  // Session stats
  const [sessionSolved, setSessionSolved] = useState(0);
  const [sessionPeeked, setSessionPeeked] = useState(0);
  const [sessionHints, setSessionHints] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const puzzle = puzzles[index] || null;

  // ── Load puzzles on type selection ──────────────────────────────────────────
  const handleSelect = useCallback((type: FilterType) => {
    const pool = type === 'all' ? getAllShuffled() : getPracticeSet(type as PuzzleType);
    setPuzzles(pool);
    setIndex(0);
    setPhase('play');
  }, []);

  // ── Reset per-puzzle state when puzzle changes ───────────────────────────────
  useEffect(() => {
    if (!puzzle) return;
    setInput('');
    setJustSolved(false);
    setPeeked(false);
    setHintsUsedThisPuzzle(0);
    // Build blank hint array matching answer length
    setHintLetters(Array(puzzle.answer.length).fill(null));
  }, [puzzle?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Typing effect for puzzle prompt ─────────────────────────────────────────
  useEffect(() => {
    if (!puzzle) return;
    setDisplayText('');
    setTyping(true);
    let i = 0;
    const fullText = puzzle.prompt;
    clearTimeout(typingTimer.current);
    const type = () => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
        typingTimer.current = setTimeout(type, 14);
      } else {
        setTyping(false);
      }
    };
    type();
    return () => clearTimeout(typingTimer.current);
  }, [puzzle?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-focus input ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!justSolved && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [puzzle?.id, justSolved]);

  // ── Hint: reveal one more letter ─────────────────────────────────────────────
  const handleHint = useCallback(() => {
    if (!puzzle || justSolved) return;
    const answer = puzzle.answer;
    // Find all still-hidden positions
    const hidden = hintLetters
      .map((v, i) => (v === null ? i : -1))
      .filter(i => i >= 0);
    if (hidden.length === 0) return;
    // Reveal one random hidden position
    const pick = hidden[Math.floor(Math.random() * hidden.length)];
    setHintLetters(prev => prev.map((v, i) => (i === pick ? answer[i] : v)));
    setHintsUsedThisPuzzle(h => h + 1);
    setSessionHints(h => h + 1);
  }, [puzzle, hintLetters, justSolved]);

  // ── Show Answer ──────────────────────────────────────────────────────────────
  const handleShowAnswer = useCallback(() => {
    if (!puzzle || justSolved || peeked) return;
    setPeeked(true);
    setSessionPeeked(p => p + 1);
    setSessionStreak(0); // streak broken by peeking
    // Reveal all letters
    setHintLetters(puzzle.answer.split(''));
  }, [puzzle, justSolved, peeked]);

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!puzzle || justSolved || !input.trim()) return;
    const correct = input.trim().toUpperCase() === puzzle.answer.toUpperCase();
    if (correct) {
      playUnlock();
      setJustSolved(true);
      setSessionSolved(s => s + 1);
      if (!peeked) setSessionStreak(s => s + 1);
      else setSessionStreak(0);
      setTotalAttempted(t => t + 1);
    } else {
      playWrong();
      setWrongFlash(true);
      setSessionWrong(w => w + 1);
      setTimeout(() => setWrongFlash(false), 400);
    }
  }, [puzzle, justSolved, input, peeked]);

  // ── Next puzzle ──────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (!justSolved && !peeked) {
      // Skipping without solving
      setTotalAttempted(t => t + 1);
      setSessionStreak(0);
    }
    setIndex(prev => {
      // Wrap around when pool exhausted
      if (prev + 1 >= puzzles.length) {
        // Re-shuffle by restarting at 0 with same pool
        return 0;
      }
      return prev + 1;
    });
  }, [justSolved, peeked, puzzles.length]);

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (justSolved || peeked) handleNext();
      else handleSubmit();
    }
  };

  // ── Hint display row ─────────────────────────────────────────────────────────
  function HintRow() {
    if (!puzzle) return null;
    const anyRevealed = hintLetters.some(l => l !== null);
    if (!anyRevealed) return null;
    return (
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', padding: '8px 0' }}>
        <span style={{ fontFamily: 'VT323, monospace', fontSize: '0.65rem', color: secondaryColor, letterSpacing: '0.2em', opacity: 0.7, marginRight: '4px' }}>HINT:</span>
        {hintLetters.map((l, i) => (
          <div key={i} style={{
            width: '28px', height: '32px',
            border: `1px solid ${l !== null ? secondaryColor : primaryColor + '40'}`,
            borderRadius: '3px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'VT323, monospace',
            fontSize: '1.1rem',
            color: l !== null ? secondaryColor : 'transparent',
            background: l !== null ? `${secondaryColor}12` : 'rgba(0,0,0,0.4)',
            boxShadow: l !== null ? `0 0 8px ${secondaryColor}30` : 'none',
            transition: 'all 0.3s ease',
          }}>
            {l || '_'}
          </div>
        ))}
      </div>
    );
  }

  // ── Phase: select type ───────────────────────────────────────────────────────
  if (phase === 'select') {
    return <TypeSelector onSelect={handleSelect} primaryColor={primaryColor} secondaryColor={secondaryColor} onBack={onBack} />;
  }

  if (!puzzle) return null;

  const diffColors: Record<number, string> = { 1: '#00ff88', 2: '#ffaa00', 3: '#ff4444' };
  const diffLabels: Record<number, string> = { 1: 'EASY', 2: 'MEDIUM', 3: 'HARD' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'VT323, monospace', position: 'relative' }}>

      {/* Wrong flash */}
      {wrongFlash && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,30,60,0.08)', pointerEvents: 'none', zIndex: 50, animation: 'wrongFlash 0.4s ease' }} />
      )}

      {/* ── TOP BAR ───────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 18px',
        borderBottom: `1px solid ${primaryColor}18`,
        background: 'rgba(0,0,0,0.88)',
        flexWrap: 'wrap', gap: '8px',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        {/* Left: mode label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '0.65rem', color: secondaryColor, letterSpacing: '0.3em', border: `1px solid ${secondaryColor}30`, borderRadius: '3px', padding: '3px 10px' }}>
            🎓 PRACTICE
          </div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
            NO TIMER · NO PENALTIES
          </div>
        </div>

        {/* Center: session stats */}
        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Stat label="SOLVED" value={`${sessionSolved}`} color={primaryColor} />
          <Stat label="STREAK" value={`${sessionStreak}🔥`} color={secondaryColor} />
          <Stat label="HINTS" value={`${sessionHints}`} color={secondaryColor} />
          <Stat label="WRONG" value={`${sessionWrong}`} color="#ff4444" />
        </div>

        {/* Right: change type + back */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setPhase('select')}
            style={{ background: 'transparent', border: `1px solid ${primaryColor}35`, borderRadius: '4px', padding: '5px 12px', fontFamily: 'VT323, monospace', fontSize: '0.8rem', color: primaryColor, cursor: 'pointer', letterSpacing: '0.1em' }}
          >
            ⇄ SWITCH TYPE
          </button>
          <button
            onClick={onBack}
            style={{ background: 'transparent', border: `1px solid rgba(255,255,255,0.2)`, borderRadius: '4px', padding: '5px 12px', fontFamily: 'VT323, monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', letterSpacing: '0.1em' }}
          >
            ← MENU
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', padding: '18px', maxWidth: '720px', width: '100%', margin: '0 auto' }}>

        {/* Puzzle number + type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${primaryColor}40, transparent)` }} />
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
              PUZZLE {(index % puzzles.length) + 1} OF {puzzles.length}
            </span>
            <span style={{ fontSize: '0.62rem', color: diffColors[puzzle.difficulty] || '#00ff88', letterSpacing: '0.15em' }}>
              [{diffLabels[puzzle.difficulty] || 'EASY'}]
            </span>
            <span style={{ fontSize: '0.62rem', color: secondaryColor, letterSpacing: '0.12em', opacity: 0.7 }}>
              {TYPE_LABELS[puzzle.type] || ''}
            </span>
          </div>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${primaryColor}40)` }} />
        </div>

        {/* Intel feed */}
        <IntelFeed intel={puzzle.intel} primaryColor={primaryColor} secondaryColor={secondaryColor} puzzleId={puzzle.id} />

        {/* Puzzle panel */}
        <div style={{
          background: 'rgba(0,0,0,0.75)',
          border: `1px solid ${justSolved ? '#00ff88' : peeked ? '#ff8844' : wrongFlash ? '#ff2244' : primaryColor}${justSolved ? '90' : peeked ? '80' : '45'}`,
          borderRadius: '8px',
          padding: '18px 20px',
          boxShadow: justSolved
            ? '0 0 30px rgba(0,255,136,0.2)'
            : peeked
            ? '0 0 20px rgba(255,136,68,0.2)'
            : `0 0 20px ${primaryColor}10`,
          transition: 'all 0.25s ease',
          animation: wrongFlash ? 'wrongShake 0.4s ease' : 'none',
          display: 'flex', flexDirection: 'column', gap: '12px',
          position: 'relative',
        }}>

          {/* Solved / peeked state */}
          {(justSolved || peeked) ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                fontFamily: 'VT323, monospace',
                fontSize: '2rem',
                color: justSolved ? '#00ff88' : '#ff8844',
                letterSpacing: '0.4em',
                textShadow: justSolved ? '0 0 20px #00ff88' : '0 0 16px #ff8844',
                animation: justSolved ? 'solvedGlow 1s ease infinite' : 'none',
              }}>
                {justSolved ? '✓' : '👁'} {puzzle.answer}
              </div>
              <div style={{ fontFamily: 'VT323, monospace', fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
                {justSolved
                  ? peeked ? '✓ SOLVED (after peek)' : `✓ SOLVED${hintsUsedThisPuzzle > 0 ? ` · ${hintsUsedThisPuzzle} hint${hintsUsedThisPuzzle > 1 ? 's' : ''} used` : ' — CLEAN!'}`
                  : '👁 ANSWER REVEALED'}
              </div>
              <button
                onClick={handleNext}
                style={{
                  alignSelf: 'flex-start',
                  background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}10)`,
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '4px',
                  padding: '8px 22px',
                  fontFamily: 'VT323, monospace',
                  fontSize: '1rem',
                  color: primaryColor,
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                  animation: 'blink 1.2s infinite',
                }}
              >
                ▶ NEXT PUZZLE [ENTER]
              </button>
            </div>
          ) : (
            <>
              {/* Prompt */}
              <div style={{
                fontFamily: 'VT323, monospace', fontSize: '1.08rem', color: '#e0e0e0',
                lineHeight: 1.6, whiteSpace: 'pre-wrap', minHeight: '56px',
                letterSpacing: '0.02em',
              }}>
                {displayText}
                {typing && <span style={{ animation: 'blink 0.7s infinite', color: primaryColor }}>█</span>}
              </div>

              {/* Hint letter row */}
              <HintRow />

              {/* Input + buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value.toUpperCase())}
                  onKeyDown={handleKey}
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
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}10)`,
                    border: `1px solid ${primaryColor}`,
                    borderRadius: '4px',
                    padding: '9px 16px',
                    fontFamily: 'VT323, monospace',
                    fontSize: '1rem',
                    color: primaryColor,
                    cursor: !input.trim() ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.1em',
                    opacity: !input.trim() ? 0.4 : 1,
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ▶ SUBMIT
                </button>
              </div>

              {/* Hint + Show Answer + Skip row */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={handleHint}
                  style={{
                    background: `${secondaryColor}10`,
                    border: `1px solid ${secondaryColor}50`,
                    borderRadius: '4px',
                    padding: '7px 12px',
                    fontFamily: 'VT323, monospace',
                    fontSize: '0.85rem',
                    color: secondaryColor,
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  💡 HINT ({hintLetters.filter(l => l !== null).length}/{puzzle.answer.length})
                </button>
                <button
                  onClick={handleShowAnswer}
                  disabled={peeked}
                  style={{
                    background: 'transparent',
                    border: `1px solid rgba(255,136,68,${peeked ? '0.15' : '0.45'})`,
                    borderRadius: '4px',
                    padding: '7px 12px',
                    fontFamily: 'VT323, monospace',
                    fontSize: '0.85rem',
                    color: peeked ? 'rgba(255,136,68,0.25)' : '#ff8844',
                    cursor: peeked ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  👁 SHOW ANSWER
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    background: 'transparent',
                    border: `1px solid rgba(255,255,255,0.18)`,
                    borderRadius: '4px',
                    padding: '7px 12px',
                    fontFamily: 'VT323, monospace',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.35)',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ⏭ SKIP
                </button>

                <div style={{ marginLeft: 'auto', fontSize: '0.58rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em' }}>
                  ENTER TO SUBMIT
                </div>
              </div>
            </>
          )}
        </div>

        {/* Session summary card */}
        {(sessionSolved + sessionPeeked + totalAttempted) > 0 && (
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: `1px solid ${primaryColor}18`,
            borderRadius: '6px',
            padding: '12px 16px',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <Stat label="SESSION SOLVED" value={String(sessionSolved)} color={primaryColor} />
            <Stat label="PEEKED" value={String(sessionPeeked)} color="#ff8844" />
            <Stat label="HINTS USED" value={String(sessionHints)} color={secondaryColor} />
            <Stat label="BEST STREAK" value={`${sessionStreak}🔥`} color={secondaryColor} />
          </div>
        )}

        {/* Note: no credits in practice */}
        <div style={{ textAlign: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.15em' }}>
          PRACTICE MODE — NO CREDITS EARNED · USE THIS TO MASTER PUZZLE TYPES
        </div>
      </div>
    </div>
  );
}

// ── Tiny stat display ──────────────────────────────────────────────────────────
function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', marginBottom: '1px' }}>{label}</div>
      <div style={{ fontSize: '1.2rem', color, textShadow: `0 0 8px ${color}60`, lineHeight: 1 }}>{value}</div>
    </div>
  );
}
