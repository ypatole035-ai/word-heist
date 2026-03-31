import { DifficultyMode, DIFFICULTY_CONFIGS } from '../types';

interface Props {
  current: DifficultyMode;
  onChange: (d: DifficultyMode) => void;
  primaryColor: string;
  secondaryColor: string;
  onBack: () => void;
}

const COLORS: Record<DifficultyMode, string> = {
  easy:   '#00ff88',
  normal: '#ffaa00',
  hard:   '#ff2244',
};

export default function DifficultySelect({ current, onChange, primaryColor, secondaryColor, onBack }: Props) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'VT323, monospace',
    }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.7rem', color: secondaryColor, letterSpacing: '0.35em', opacity: 0.7, marginBottom: '6px' }}>
            MISSION PARAMETERS
          </div>
          <div style={{
            fontSize: '2.5rem', color: primaryColor,
            textShadow: `0 0 20px ${primaryColor}`, letterSpacing: '0.1em',
          }}>
            DIFFICULTY
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginTop: '4px' }}>
            SELECT OPERATIVE RISK LEVEL
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          {(['easy', 'normal', 'hard'] as DifficultyMode[]).map(mode => {
            const cfg = DIFFICULTY_CONFIGS[mode];
            const color = COLORS[mode];
            const isActive = current === mode;

            return (
              <button
                key={mode}
                onClick={() => onChange(mode)}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${color}18, ${color}08)`
                    : 'rgba(0,0,0,0.6)',
                  border: `2px solid ${isActive ? color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px',
                  padding: '18px 22px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isActive ? `0 0 24px ${color}30` : 'none',
                  transition: 'all 0.25s ease',
                  width: '100%',
                  fontFamily: 'VT323, monospace',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{
                    fontSize: '1.4rem', color,
                    textShadow: isActive ? `0 0 12px ${color}` : 'none',
                    letterSpacing: '0.15em',
                  }}>
                    {isActive && '▶ '}{cfg.label}
                  </div>
                  {isActive && (
                    <div style={{
                      fontSize: '0.7rem', color,
                      border: `1px solid ${color}40`,
                      borderRadius: '3px',
                      padding: '2px 8px',
                      letterSpacing: '0.15em',
                    }}>
                      SELECTED
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.5,
                }}>
                  {cfg.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Operative class hint */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '6px',
          padding: '12px 16px',
          marginBottom: '24px',
          background: 'rgba(255,255,255,0.02)',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em',
          lineHeight: 1.5,
          textAlign: 'center',
        }}>
          ◈ Your operative class modifies these settings further.<br />
          Credit multipliers stack with win streak bonuses.
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: `1px solid ${primaryColor}50`,
              borderRadius: '4px',
              padding: '10px 28px',
              color: primaryColor,
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.15em',
            }}
          >
            ← BACK
          </button>
        </div>
      </div>
    </div>
  );
}
