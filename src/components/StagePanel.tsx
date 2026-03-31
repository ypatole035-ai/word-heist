import { useEffect, useRef, useState } from 'react';
import { Puzzle } from '../types';

interface Props {
  puzzles: Puzzle[];
  currentIndex: number;
  solvedStages: boolean[];
  primaryColor: string;
  secondaryColor: string;
}

const STAGE_CODENAMES = [
  'APPROACH',
  'INFILTRATE',
  'BYPASS',
  'PENETRATE',
  'ACCESS',
  'EXTRACT',
];

const DIFFICULTY_COLORS: Record<number, string> = {
  1: '#00ff88',
  2: '#ffaa00',
  3: '#ff4444',
};

function StageRow({
  index,
  puzzle,
  solved,
  active,
  primaryColor,
}: {
  index: number;
  puzzle: Puzzle;
  solved: boolean;
  active: boolean;
  primaryColor: string;
}) {
  const [flash, setFlash] = useState(false);
  const prevSolved = useRef(false);

  useEffect(() => {
    if (solved && !prevSolved.current) {
      setFlash(true);
      setTimeout(() => setFlash(false), 700);
    }
    prevSolved.current = solved;
  }, [solved]);

  const diffColor = DIFFICULTY_COLORS[puzzle.difficulty] || primaryColor;
  const stageNum = index + 1;
  const codename = STAGE_CODENAMES[index] || `STAGE ${stageNum}`;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 12px',
        borderRadius: '6px',
        border: `1px solid ${
          flash ? '#00ff88'
          : solved ? primaryColor + '50'
          : active ? primaryColor + '60'
          : 'rgba(255,255,255,0.07)'
        }`,
        background: flash
          ? 'rgba(0,255,136,0.08)'
          : solved
          ? `${primaryColor}08`
          : active
          ? 'rgba(255,255,255,0.03)'
          : 'transparent',
        boxShadow: flash
          ? '0 0 20px rgba(0,255,136,0.3)'
          : solved
          ? `0 0 10px ${primaryColor}20`
          : active
          ? `0 0 8px ${primaryColor}25`
          : 'none',
        transition: 'all 0.35s ease',
        animation: active && !solved ? 'activePulse 2.5s infinite' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flash shimmer overlay */}
      {flash && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.15), transparent)',
          animation: 'slideShimmer 0.7s ease',
        }} />
      )}

      {/* Stage number bubble */}
      <div style={{
        width: '26px', height: '26px', borderRadius: '50%',
        border: `1.5px solid ${solved ? '#00ff88' : active ? primaryColor : 'rgba(255,255,255,0.2)'}`,
        background: solved ? 'rgba(0,255,136,0.12)' : active ? `${primaryColor}15` : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: solved ? '0 0 8px rgba(0,255,136,0.4)' : active ? `0 0 8px ${primaryColor}40` : 'none',
        transition: 'all 0.3s ease',
        fontFamily: 'VT323, monospace', fontSize: '0.9rem',
        color: solved ? '#00ff88' : active ? primaryColor : 'rgba(255,255,255,0.3)',
      }}>
        {solved ? '✓' : stageNum}
      </div>

      {/* Stage info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: '0.82rem',
          color: solved ? '#00ff88' : active ? primaryColor : 'rgba(255,255,255,0.4)',
          letterSpacing: '0.18em',
          textShadow: solved ? '0 0 8px rgba(0,255,136,0.5)' : active ? `0 0 6px ${primaryColor}` : 'none',
          lineHeight: 1.1,
          transition: 'all 0.3s ease',
        }}>
          {codename}
        </div>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.1em',
          marginTop: '1px',
        }}>
          {puzzle.type.replace('_', ' ').toUpperCase()}
        </div>
      </div>

      {/* Difficulty pip */}
      <div style={{
        width: '7px', height: '7px', borderRadius: '50%',
        background: solved ? '#00ff88' : diffColor,
        opacity: solved ? 0.7 : active ? 1 : 0.35,
        boxShadow: (solved || active) ? `0 0 6px ${solved ? '#00ff88' : diffColor}` : 'none',
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }} />

      {/* Lock icon */}
      <div style={{
        fontSize: '1rem', flexShrink: 0,
        filter: solved
          ? 'drop-shadow(0 0 6px rgba(0,255,136,0.6))'
          : active
          ? `drop-shadow(0 0 5px ${primaryColor})`
          : 'none',
        transition: 'filter 0.3s ease',
        animation: active && !solved ? 'lockFlicker 3s infinite' : 'none',
      }}>
        {solved ? '🔓' : active ? '🔐' : '🔒'}
      </div>
    </div>
  );
}

export default function StagePanel({ puzzles, currentIndex, solvedStages, primaryColor, secondaryColor }: Props) {
  const solvedCount = solvedStages.filter(Boolean).length;
  const progressPct = (solvedCount / 6) * 100;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '8px',
      minWidth: '210px', maxWidth: '260px', width: '100%',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '4px',
      }}>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: '0.68rem',
          color: primaryColor, letterSpacing: '0.25em', opacity: 0.65,
        }}>
          VAULT BREACH STAGES
        </div>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: '0.75rem',
          color: solvedCount === 6 ? '#00ff88' : primaryColor,
          textShadow: solvedCount === 6 ? '0 0 10px #00ff88' : `0 0 6px ${primaryColor}`,
        }}>
          {solvedCount}/6
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '2px', background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px', overflow: 'hidden', marginBottom: '8px',
      }}>
        <div style={{
          height: '100%', width: `${progressPct}%`,
          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
          boxShadow: `0 0 8px ${primaryColor}`,
          transition: 'width 0.5s ease',
          borderRadius: '2px',
        }} />
      </div>

      {/* Stage rows */}
      {puzzles.map((puzzle, i) => (
        <StageRow
          key={puzzle.id}
          index={i}
          puzzle={puzzle}
          solved={solvedStages[i]}
          active={i === currentIndex && !solvedStages[i]}
          primaryColor={primaryColor}
        />
      ))}

      {/* Legend */}
      <div style={{
        display: 'flex', gap: '10px', justifyContent: 'center',
        marginTop: '6px', flexWrap: 'wrap',
      }}>
        {[
          { color: '#00ff88', label: 'EASY' },
          { color: '#ffaa00', label: 'MED' },
          { color: '#ff4444', label: 'HARD' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: color, opacity: 0.6,
            }} />
            <div style={{
              fontFamily: 'VT323, monospace', fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
