import { ALL_ACHIEVEMENTS } from '../types';
import { StoredData } from '../types';

interface Props {
  stored: StoredData;
  onBack: () => void;
  primaryColor: string;
  secondaryColor: string;
}

export default function AchievementGallery({ stored, onBack, primaryColor, secondaryColor }: Props) {
  const earned = new Set(stored.achievements || []);
  const earnedCount = ALL_ACHIEVEMENTS.filter(a => earned.has(a.id)).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: '20px',
      fontFamily: 'VT323, monospace',
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '0.75rem', color: secondaryColor, letterSpacing: '0.3em', opacity: 0.7 }}>
            OPERATIVE RECORD
          </div>
          <div style={{
            fontSize: '2.5rem', color: primaryColor,
            textShadow: `0 0 20px ${primaryColor}`, letterSpacing: '0.1em',
          }}>
            ACHIEVEMENTS
          </div>
          <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
            {earnedCount} / {ALL_ACHIEVEMENTS.length} UNLOCKED
          </div>

          {/* Progress bar */}
          <div style={{
            height: '3px', background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px', margin: '12px auto', maxWidth: '300px',
          }}>
            <div style={{
              height: '100%',
              width: `${(earnedCount / ALL_ACHIEVEMENTS.length) * 100}%`,
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
              boxShadow: `0 0 8px ${primaryColor}`,
              borderRadius: '2px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>

        {/* Achievement grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
          marginBottom: '28px',
        }}>
          {ALL_ACHIEVEMENTS.map(ach => {
            const isEarned = earned.has(ach.id);
            return (
              <div
                key={ach.id}
                style={{
                  border: `1px solid ${isEarned ? primaryColor + '80' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px',
                  padding: '14px 16px',
                  background: isEarned
                    ? `linear-gradient(135deg, ${primaryColor}0c, transparent)`
                    : 'rgba(0,0,0,0.6)',
                  boxShadow: isEarned ? `0 0 16px ${primaryColor}20` : 'none',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  transition: 'all 0.3s ease',
                  opacity: isEarned ? 1 : 0.45,
                  filter: isEarned ? 'none' : 'grayscale(1)',
                }}
              >
                <div style={{
                  fontSize: '1.8rem', flexShrink: 0,
                  filter: isEarned ? 'none' : 'brightness(0.3)',
                }}>
                  {ach.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.95rem',
                    color: isEarned ? primaryColor : 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.12em',
                    textShadow: isEarned ? `0 0 8px ${primaryColor}` : 'none',
                    marginBottom: '4px',
                  }}>
                    {isEarned ? ach.name : '???'}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: isEarned ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.4,
                  }}>
                    {isEarned ? ach.desc : 'Complete a specific challenge to unlock.'}
                  </div>
                  {isEarned && (
                    <div style={{
                      marginTop: '6px',
                      fontSize: '0.6rem',
                      color: secondaryColor,
                      letterSpacing: '0.2em',
                      opacity: 0.7,
                    }}>
                      ✓ EARNED
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: `1px solid ${primaryColor}60`,
              borderRadius: '4px',
              padding: '10px 28px',
              color: primaryColor,
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'VT323, monospace',
              letterSpacing: '0.15em',
            }}
          >
            ← RETURN TO MENU
          </button>
        </div>
      </div>
    </div>
  );
}
