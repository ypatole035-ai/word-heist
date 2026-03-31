import { useCallback, useEffect, useRef, useState } from 'react';
import Timer from './Timer';
import SecurityLevel from './SecurityLevel';
import StagePanel from './StagePanel';
import PuzzleArea from './PuzzleArea';
import PauseMenu from './PauseMenu';
import Tutorial from './Tutorial';
import { Puzzle, GameMode } from '../types';
import { playUnlock, playWrong, playGlitch, playAlarm } from '../audio';

interface Props {
  puzzles: Puzzle[];
  mode: GameMode;
  primaryColor: string;
  secondaryColor: string;
  onWin: (timeLeft: number, hintsUsed: number, secLevel: number) => void;
  onGameOver: (reason: 'timeout' | 'lockdown', locksCleared: number) => void;
  onMenu: () => void;
  onRestart: () => void;
}

const TOTAL_TIME = 90;
const WRONG_PENALTY = 8;
const MAX_HINTS = 2;
const SOLVE_DISPLAY_MS = 1800; // how long the solved state shows before advancing

export default function GameScreen({
  puzzles,
  mode,
  primaryColor,
  secondaryColor,
  onWin,
  onGameOver,
  onMenu,
  onRestart,
}: Props) {
  const [solvedStages, setSolvedStages] = useState<boolean[]>(Array(6).fill(false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintReveal, setHintReveal] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  // Solved display state
  const [justSolved, setJustSolved] = useState(false);
  const [solvedAnswer, setSolvedAnswer] = useState<string | null>(null);

  // Use refs to avoid stale closures in timer/gameOver logic
  const gameEndedRef = useRef(false);
  const solvedStagesRef = useRef<boolean[]>(Array(6).fill(false));
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const securityRef = useRef(0);
  const timeLeftRef = useRef(TOTAL_TIME);

  // Keep timeLeftRef in sync
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { securityRef.current = securityLevel; }, [securityLevel]);
  useEffect(() => { solvedStagesRef.current = solvedStages; }, [solvedStages]);

  // ── Timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused || gameEndedRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        if (next <= 0 && !gameEndedRef.current) {
          clearInterval(timerRef.current);
          gameEndedRef.current = true;
          setTimeout(() => {
            onGameOver('timeout', solvedStagesRef.current.filter(Boolean).length);
          }, 200);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [paused]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keyboard: Escape = pause/resume ─────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !gameEndedRef.current) {
        setPaused(p => !p);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Trigger game over (extracted to avoid duplication) ───────────────────────
  const triggerGameOver = useCallback((reason: 'timeout' | 'lockdown') => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    clearInterval(timerRef.current);
    setTimeout(() => {
      onGameOver(reason, solvedStagesRef.current.filter(Boolean).length);
    }, reason === 'lockdown' ? 900 : 200);
  }, [onGameOver]);

  // ── Submit answer ────────────────────────────────────────────────────────────
  const handleSubmit = useCallback((answer: string) => {
    if (gameEndedRef.current || inputDisabled || paused) return;
    const puzzle = puzzles[currentIndex];
    if (!puzzle) return;

    const correct = answer.trim().toUpperCase() === puzzle.answer.toUpperCase();

    if (correct) {
      playUnlock();
      setInputDisabled(true);
      setHintReveal(null);
      setJustSolved(true);
      setSolvedAnswer(puzzle.answer);

      const newSolved = [...solvedStagesRef.current];
      newSolved[currentIndex] = true;
      setSolvedStages(newSolved);
      solvedStagesRef.current = newSolved;

      // Check for full completion
      if (newSolved.every(Boolean)) {
        clearInterval(timerRef.current);
        gameEndedRef.current = true;
        setTimeout(() => {
          onWin(timeLeftRef.current, hintsUsed, securityRef.current);
        }, SOLVE_DISPLAY_MS + 100);
        return;
      }

      // Advance to next stage
      setTimeout(() => {
        setJustSolved(false);
        setSolvedAnswer(null);
        setCurrentIndex(prev => prev + 1);
        setInputDisabled(false);
      }, SOLVE_DISPLAY_MS);

    } else {
      // Wrong answer
      playWrong();
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 420);

      // Time penalty
      setTimeLeft(prev => {
        const next = Math.max(0, prev - WRONG_PENALTY);
        if (next <= 0) triggerGameOver('timeout');
        return next;
      });

      // Security level
      setSecurityLevel(prev => {
        const next = Math.min(3, prev + 1);
        if (next >= 3) {
          playGlitch();
          setTimeout(() => playAlarm(), 120);
          triggerGameOver('lockdown');
        }
        return next;
      });
    }
  }, [currentIndex, puzzles, inputDisabled, paused, hintsUsed, triggerGameOver, onWin]);

  // ── Hint ─────────────────────────────────────────────────────────────────────
  const handleHint = useCallback(() => {
    if (hintsLeft <= 0 || inputDisabled || paused || gameEndedRef.current) return;
    const puzzle = puzzles[currentIndex];
    if (!puzzle) return;

    const answer = puzzle.answer;
    // Reveal a random un-revealed letter (weighted toward middle positions for challenge)
    const positions = answer.split('').map((_, i) => i);
    const randomPos = positions[Math.floor(Math.random() * positions.length)];
    const hintStr = answer.split('').map((c, i) =>
      i === randomPos ? `[${c}]` : '_'
    ).join(' ');

    setHintReveal(hintStr);
    setHintsLeft(prev => prev - 1);
    setHintsUsed(prev => prev + 1);
  }, [hintsLeft, currentIndex, puzzles, inputDisabled, paused]);

  const currentPuzzle = puzzles[currentIndex] || null;
  const solvedCount = solvedStages.filter(Boolean).length;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'VT323, monospace',
      position: 'relative',
    }}>

      {/* Wrong-answer screen flash */}
      {wrongFlash && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(255, 30, 60, 0.1)',
          pointerEvents: 'none', zIndex: 50,
          animation: 'wrongFlash 0.42s ease',
        }} />
      )}

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 18px',
        borderBottom: `1px solid ${primaryColor}18`,
        background: 'rgba(0,0,0,0.88)',
        flexWrap: 'wrap',
        gap: '8px',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        {/* Left: Timer */}
        <Timer timeLeft={timeLeft} primaryColor={primaryColor} running={!paused && !gameEndedRef.current} />

        {/* Center: Security */}
        <SecurityLevel level={securityLevel} primaryColor={primaryColor} />

        {/* Right group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Hints */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: primaryColor, letterSpacing: '0.2em', opacity: 0.55, marginBottom: '1px' }}>
              HINTS
            </div>
            <div style={{
              fontSize: '1.5rem',
              color: hintsLeft > 0 ? secondaryColor : 'rgba(255,255,255,0.18)',
              textShadow: hintsLeft > 0 ? `0 0 10px ${secondaryColor}` : 'none',
              lineHeight: 1,
            }}>
              {hintsLeft}/2
            </div>
          </div>

          {/* Mode badge */}
          <div style={{
            fontFamily: 'VT323, monospace', fontSize: '0.7rem',
            color: primaryColor, letterSpacing: '0.15em', opacity: 0.6,
            border: `1px solid ${primaryColor}25`,
            borderRadius: '3px', padding: '3px 8px',
          }}>
            {mode === 'daily' ? '◈ DAILY' : '▶ CLASSIC'}
          </div>

          {/* Pause button */}
          <button
            onClick={() => setPaused(p => !p)}
            disabled={gameEndedRef.current}
            title="Pause (Esc)"
            style={{
              background: paused ? `${primaryColor}18` : 'transparent',
              border: `1px solid ${primaryColor}35`,
              borderRadius: '4px',
              padding: '6px 14px',
              color: primaryColor,
              fontSize: '0.95rem',
              cursor: 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.1em',
              opacity: gameEndedRef.current ? 0.25 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {paused ? '▶ RESUME' : '⏸ PAUSE'}
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ─────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        gap: '16px',
        padding: '14px 18px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>

        {/* LEFT: Stage Panel */}
        <div style={{ flexShrink: 0 }}>
          <StagePanel
            puzzles={puzzles}
            currentIndex={currentIndex}
            solvedStages={solvedStages}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>

        {/* RIGHT: Puzzle Area (intel + puzzle) */}
        <div style={{ flex: 1, minWidth: '280px', maxWidth: '680px' }}>
          {/* Stage header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px',
          }}>
            <div style={{
              flex: 1, height: '1px',
              background: `linear-gradient(90deg, ${primaryColor}40, transparent)`,
            }} />
            <div style={{
              fontFamily: 'VT323, monospace', fontSize: '0.65rem',
              color: primaryColor, letterSpacing: '0.25em', opacity: 0.5,
              whiteSpace: 'nowrap',
            }}>
              STAGE {currentIndex + 1} OF 6 — {solvedCount} CLEARED
            </div>
            <div style={{
              flex: 1, height: '1px',
              background: `linear-gradient(90deg, transparent, ${primaryColor}40)`,
            }} />
          </div>

          <PuzzleArea
            puzzle={currentPuzzle}
            onSubmit={handleSubmit}
            onHint={handleHint}
            hintsLeft={hintsLeft}
            hintReveal={hintReveal}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            wrongFlash={wrongFlash}
            inputDisabled={inputDisabled || paused}
            justSolved={justSolved}
            solvedAnswer={solvedAnswer}
            stageIndex={currentIndex}
          />
        </div>
      </div>

      {/* ── PAUSE OVERLAY ───────────────────────────────────────────────────── */}
      {paused && !gameEndedRef.current && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onRestart={onRestart}
          onMenu={onMenu}
          onTutorial={() => setShowTutorial(true)}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          timeLeft={timeLeft}
          solvedCount={solvedCount}
          hintsLeft={hintsLeft}
          securityLevel={securityLevel}
        />
      )}

      {/* ── TUTORIAL OVERLAY ────────────────────────────────────────────────── */}
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
