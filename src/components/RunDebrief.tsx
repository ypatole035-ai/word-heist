import { RunHistoryEntry } from '../types';

interface Props {
  run: RunHistoryEntry;
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
}

const TYPE_ICONS: Record<string, string> = {
  anagram: '🔤',
  caesar: '🔢',
  hidden_word: '🔍',
  definition: '💭',
  missing_vowels: '📝',
  odd_one_out: '🎯',
  acronym: '🔠',
};

export default function RunDebrief({ run, onClose, primaryColor, secondaryColor }: Props) {
  const totalAttempts = run.stages.reduce((s, st) => s + st.attempts, 0);
  const hintsUsed = run.stages.filter(st => st.hintUsed).length;
  const avgTime = run.stages.length > 0
    ? Math.round(run.stages.reduce((s, st) => s + st.timeSpent, 0) / run.stages.length)
    : 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: 'VT323, monospace',
        overflowY: 'auto',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#050508',
        border: `1px solid ${primaryColor}50`,
        borderRadius: '10px',
        padding: '24px',
        maxWidth: '680px',
        width: '100%',
        boxShadow: `0 0 40px ${primaryColor}20`,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.65rem', color: secondaryColor, letterSpacing: '0.35em', opacity: 0.7 }}>
            MISSION DEBRIEF
          </div>
          <div style={{
            fontSize: '1.8rem',
            color: run.won ? primaryColor : '#ff2244',
            textShadow: `0 0 20px ${run.won ? primaryColor : '#ff2244'}`,
            letterSpacing: '0.1em',
          }}>
            {run.won ? '✓ VAULT CRACKED' : '✗ MISSION FAILED'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
            {run.date} · {run.mode.toUpperCase()} · {run.difficulty.toUpperCase()}
          </div>
        </div>

        {/* Summary stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          marginBottom: '20px',
        }}>
          {[
            { label: 'STAGES', value: `${run.stagesCleared}/6` },
            { label: 'TIME LEFT', value: `${run.timeLeft}s` },
            { label: 'WRONG GUESSES', value: totalAttempts },
            { label: 'HINTS USED', value: hintsUsed },
            { label: 'SECURITY LVL', value: run.securityLevel },
            { label: 'AVG TIME/STAGE', value: `${avgTime}s` },
            { label: 'CREDITS', value: `${run.creditsEarned} CR` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(255,255,255,0.07)`,
              borderRadius: '6px',
              padding: '10px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '1.2rem', color: primaryColor, textShadow: `0 0 8px ${primaryColor}` }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Stage-by-stage */}
        <div style={{
          fontSize: '0.65rem', color: primaryColor,
          letterSpacing: '0.25em', opacity: 0.6, marginBottom: '10px',
        }}>
          STAGE BREAKDOWN
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {run.stages.map((st, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '6px',
                border: `1px solid ${st.solved ? primaryColor + '30' : 'rgba(255,34,68,0.2)'}`,
                background: st.solved ? `${primaryColor}05` : 'rgba(255,34,68,0.03)',
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: '1.2rem', flexShrink: 0 }}>{TYPE_ICONS[st.puzzleType] || '❓'}</div>

              {/* Stage num */}
              <div style={{
                fontFamily: 'VT323, monospace',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em',
                flexShrink: 0,
                width: '55px',
              }}>
                STAGE {i + 1}
              </div>

              {/* Answer */}
              <div style={{
                flex: 1,
                fontFamily: 'VT323, monospace',
                fontSize: '1rem',
                color: st.solved ? primaryColor : '#ff4444',
                letterSpacing: '0.15em',
              }}>
                {st.solved ? st.answer : '—'}
              </div>

              {/* Metadata */}
              <div style={{
                display: 'flex', gap: '10px', flexShrink: 0, flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>TIME</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{st.timeSpent}s</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>TRIES</div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: st.attempts === 0 ? '#00ff88' : st.attempts >= 3 ? '#ff4444' : '#ffaa00',
                  }}>
                    {st.attempts === 0 ? '✓' : st.attempts}
                  </div>
                </div>
                {st.hintUsed && (
                  <div style={{ fontSize: '0.7rem', color: secondaryColor, opacity: 0.7 }}>💡</div>
                )}
              </div>

              {/* Solved badge */}
              <div style={{
                fontSize: '0.9rem',
                color: st.solved ? '#00ff88' : '#ff4444',
                flexShrink: 0,
              }}>
                {st.solved ? '✓' : '✗'}
              </div>
            </div>
          ))}
        </div>

        {/* Close */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: `${primaryColor}15`,
              border: `1px solid ${primaryColor}`,
              borderRadius: '4px',
              padding: '10px 28px',
              color: primaryColor,
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.15em',
            }}
          >
            CLOSE DEBRIEF
          </button>
        </div>
      </div>
    </div>
  );
}
