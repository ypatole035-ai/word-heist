import { StoredData } from '../types';

interface Props {
  stored: StoredData;
  onBack: () => void;
  primaryColor: string;
  secondaryColor: string;
}

export default function HighScores({ stored, onBack, primaryColor, secondaryColor }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'VT323, monospace',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.75rem', color: secondaryColor, letterSpacing: '0.3em', opacity: 0.7 }}>MISSION ARCHIVE</div>
          <div style={{ fontSize: '2.5rem', color: primaryColor, textShadow: `0 0 20px ${primaryColor}` }}>HIGH SCORES</div>
        </div>

        {/* Classic */}
        <div style={{
          border: `1px solid ${primaryColor}40`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
          background: 'rgba(0,0,0,0.7)',
        }}>
          <div style={{ color: primaryColor, fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '12px' }}>◈ CLASSIC MODE</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>BEST CREDITS EARNED</div>
            <div style={{ color: secondaryColor, fontSize: '1.8rem', textShadow: `0 0 10px ${secondaryColor}` }}>
              {stored.classicHighScore} CR
            </div>
          </div>
        </div>

        {/* Daily */}
        <div style={{
          border: `1px solid ${secondaryColor}40`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
          background: 'rgba(0,0,0,0.7)',
        }}>
          <div style={{ color: secondaryColor, fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '12px' }}>◆ DAILY CHALLENGE</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>BEST CREDITS EARNED</div>
            <div style={{ color: primaryColor, fontSize: '1.8rem', textShadow: `0 0 10px ${primaryColor}` }}>
              {stored.dailyHighScore} CR
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>LAST COMPLETED</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
              {stored.dailyDate || 'NEVER'}
            </div>
          </div>
        </div>

        {/* Win streak */}
        <div style={{
          border: `1px solid rgba(255,255,255,0.15)`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '32px',
          background: 'rgba(0,0,0,0.7)',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '12px' }}>◉ WIN STREAK</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>CURRENT STREAK</div>
            <div style={{ color: primaryColor, fontSize: '1.8rem', textShadow: `0 0 10px ${primaryColor}` }}>
              {stored.winStreak}x
            </div>
          </div>
          <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            Streak bonus: +{Math.round(stored.winStreak * 25)}% credits per win
          </div>
        </div>

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
            ← BACK TO MENU
          </button>
        </div>
      </div>
    </div>
  );
}
