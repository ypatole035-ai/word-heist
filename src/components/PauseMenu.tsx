interface Props {
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
  onTutorial: () => void;
  primaryColor: string;
  secondaryColor: string;
  timeLeft: number;
  solvedCount: number;
  hintsLeft: number;
  securityLevel: number;
}

export default function PauseMenu({
  onResume,
  onRestart,
  onMenu,
  onTutorial,
  primaryColor,
  secondaryColor,
  timeLeft,
  solvedCount,
  hintsLeft,
  securityLevel,
}: Props) {
  const secColors = ['rgba(255,255,255,0.25)', '#ffaa00', '#ff4400', '#ff0000'];
  const secLabels = ['CLEAR', 'ELEVATED', 'CRITICAL', 'LOCKDOWN'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          width: '100%',
          background: '#000',
          border: `2px solid ${primaryColor}50`,
          borderRadius: '10px',
          boxShadow: `0 0 60px ${primaryColor}20, 0 0 120px ${primaryColor}08`,
          fontFamily: 'VT323, monospace',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: `${primaryColor}12`,
            borderBottom: `1px solid ${primaryColor}30`,
            padding: '16px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.7rem', color: secondaryColor, letterSpacing: '0.4em', opacity: 0.7, marginBottom: '4px' }}>
            ⏸ HEIST PAUSED
          </div>
          <div
            style={{
              fontSize: '2.2rem',
              color: primaryColor,
              letterSpacing: '0.15em',
              textShadow: `0 0 20px ${primaryColor}`,
            }}
          >
            STANDBY
          </div>
        </div>

        {/* Stats snapshot */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: `${primaryColor}15`,
            borderBottom: `1px solid ${primaryColor}20`,
          }}
        >
          {[
            { label: 'TIME LEFT', value: `${timeLeft}s`, color: timeLeft <= 20 ? '#ff4444' : primaryColor },
            { label: 'LOCKS CRACKED', value: `${solvedCount}/6`, color: primaryColor },
            { label: 'HINTS LEFT', value: `${hintsLeft}/2`, color: hintsLeft > 0 ? secondaryColor : 'rgba(255,255,255,0.25)' },
            { label: 'SECURITY', value: secLabels[securityLevel] || 'CLEAR', color: secColors[securityLevel] || primaryColor },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#000',
                padding: '14px 18px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '1.4rem',
                  color: stat.color,
                  textShadow: `0 0 10px ${stat.color}80`,
                  letterSpacing: '0.05em',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <PauseBtn
            onClick={onResume}
            primary
            primaryColor={primaryColor}
            label="▶  RESUME HEIST"
          />
          <PauseBtn
            onClick={onTutorial}
            primaryColor={primaryColor}
            label="📖  HOW TO PLAY"
          />
          <PauseBtn
            onClick={onRestart}
            primaryColor={primaryColor}
            label="↺  RESTART RUN"
            warn
          />
          <div style={{ height: '1px', background: `${primaryColor}15`, margin: '2px 0' }} />
          <PauseBtn
            onClick={onMenu}
            primaryColor={primaryColor}
            label="⏏  ABORT — MAIN MENU"
            danger
          />
        </div>

        <div
          style={{
            textAlign: 'center',
            padding: '0 24px 16px',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
          }}
        >
          TIMER SUSPENDED DURING PAUSE
        </div>
      </div>
    </div>
  );
}

// ── Small internal button component ─────────────────────────────────────────
interface BtnProps {
  onClick: () => void;
  label: string;
  primaryColor: string;
  primary?: boolean;
  warn?: boolean;
  danger?: boolean;
}

function PauseBtn({ onClick, label, primaryColor, primary, warn, danger }: BtnProps) {
  const color = danger
    ? '#ff3344'
    : warn
    ? '#ffaa00'
    : primary
    ? primaryColor
    : 'rgba(255,255,255,0.6)';

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: primary
          ? `linear-gradient(135deg, ${primaryColor}25, ${primaryColor}10)`
          : danger
          ? 'rgba(255,30,50,0.08)'
          : warn
          ? 'rgba(255,160,0,0.08)'
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${color}50`,
        borderRadius: '6px',
        padding: '12px 18px',
        color,
        fontSize: '1.1rem',
        cursor: 'pointer',
        fontFamily: 'VT323, monospace',
        letterSpacing: '0.12em',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        boxShadow: primary ? `0 0 16px ${primaryColor}20` : 'none',
      }}
    >
      {label}
    </button>
  );
}
