import { StoredData, ThemeId } from '../types';
import { THEMES, THEME_LIST } from '../themes';
import { updateData, unlockTheme } from '../storage';

interface Props {
  stored: StoredData;
  onStoredChange: (d: StoredData) => void;
  onBack: () => void;
  primaryColor: string;
  secondaryColor: string;
}

export default function VaultShop({ stored, onStoredChange, onBack, primaryColor, secondaryColor }: Props) {
  const handleBuy = (themeId: ThemeId) => {
    const theme = THEMES[themeId];
    if (stored.totalCredits < theme.cost) return;
    const updated = unlockTheme(themeId);
    const final = updateData({ ...updated, totalCredits: updated.totalCredits - theme.cost });
    onStoredChange(final);
  };

  const handleActivate = (themeId: ThemeId) => {
    const updated = updateData({ activeTheme: themeId });
    onStoredChange(updated);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        padding: '20px',
        fontFamily: 'VT323, monospace',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.8rem', color: secondaryColor, letterSpacing: '0.3em', opacity: 0.7 }}>
          UNDERGROUND MARKET
        </div>
        <div style={{ fontSize: '2.5rem', color: primaryColor, textShadow: `0 0 20px ${primaryColor}`, letterSpacing: '0.1em' }}>
          VAULT SHOP
        </div>
        <div style={{ fontSize: '1rem', color: '#aaa', marginTop: '4px' }}>
          CREDITS AVAILABLE:{' '}
          <span style={{ color: secondaryColor, textShadow: `0 0 8px ${secondaryColor}` }}>
            {stored.totalCredits} CR
          </span>
        </div>
      </div>

      {/* Theme grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          maxWidth: '900px',
          margin: '0 auto 24px',
        }}
      >
        {THEME_LIST.map(theme => {
          const owned = stored.unlockedThemes.includes(theme.id);
          const active = stored.activeTheme === theme.id;
          const canBuy = !owned && stored.totalCredits >= theme.cost;

          return (
            <div
              key={theme.id}
              style={{
                border: `2px solid ${active ? theme.primary : owned ? `${theme.primary}60` : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                padding: '16px',
                background: active
                  ? `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}08)`
                  : 'rgba(0,0,0,0.7)',
                boxShadow: active ? `0 0 20px ${theme.primary}40` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Theme preview */}
              <div
                style={{
                  height: '60px',
                  borderRadius: '4px',
                  background: theme.bg,
                  border: `1px solid ${theme.primary}40`,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: '20px', height: '20px', border: `2px solid ${theme.lockColor}`, borderRadius: '3px', boxShadow: `0 0 8px ${theme.lockColor}` }} />
                <div style={{ width: '30px', height: '4px', background: theme.primary, boxShadow: `0 0 6px ${theme.primary}`, borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '20px', border: `2px solid ${theme.lockColor}40`, borderRadius: '3px' }} />
                {/* Scanline preview */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
                  opacity: theme.scanlineOpacity * 8,
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', color: theme.primary, textShadow: `0 0 8px ${theme.primary}` }}>
                    {theme.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.3, maxWidth: '160px' }}>
                    {theme.description}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {theme.cost === 0 ? (
                    <div style={{ color: theme.primary, fontSize: '0.85rem' }}>FREE</div>
                  ) : (
                    <div style={{ color: secondaryColor, fontSize: '0.85rem' }}>{theme.cost} CR</div>
                  )}
                </div>
              </div>

              {/* Action button */}
              {active ? (
                <div style={{ textAlign: 'center', color: theme.primary, fontSize: '0.9rem', padding: '6px', border: `1px solid ${theme.primary}40`, borderRadius: '4px' }}>
                  ✓ ACTIVE
                </div>
              ) : owned ? (
                <button
                  onClick={() => handleActivate(theme.id)}
                  style={{
                    width: '100%',
                    background: `${theme.primary}15`,
                    border: `1px solid ${theme.primary}60`,
                    borderRadius: '4px',
                    padding: '6px',
                    color: theme.primary,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontFamily: 'VT323, monospace',
                    letterSpacing: '0.1em',
                  }}
                >
                  ACTIVATE
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(theme.id)}
                  disabled={!canBuy}
                  style={{
                    width: '100%',
                    background: canBuy ? `${secondaryColor}15` : 'transparent',
                    border: `1px solid ${canBuy ? secondaryColor : 'rgba(255,255,255,0.15)'}`,
                    borderRadius: '4px',
                    padding: '6px',
                    color: canBuy ? secondaryColor : 'rgba(255,255,255,0.3)',
                    fontSize: '0.9rem',
                    cursor: canBuy ? 'pointer' : 'not-allowed',
                    fontFamily: 'VT323, monospace',
                    letterSpacing: '0.1em',
                  }}
                >
                  {canBuy ? `BUY — ${theme.cost} CR` : `LOCKED — ${theme.cost} CR`}
                </button>
              )}
            </div>
          );
        })}
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
  );
}
