interface Props {
  onBack: () => void;
  primaryColor: string;
  secondaryColor: string;
}

export default function HowToPlay({ onBack, primaryColor, secondaryColor }: Props) {
  const rules = [
    { icon: '🔒', title: 'CRACK 6 LOCKS', desc: 'Solve 6 word puzzles to unlock the vault. Each correct answer opens one lock.' },
    { icon: '⏱', title: 'BEAT THE CLOCK', desc: 'You have 90 seconds. Every wrong answer deducts 8 seconds and raises the security level.' },
    { icon: '🚨', title: 'SECURITY LEVELS', desc: 'Security rises with wrong answers. 3 bars = LOCKDOWN. Instant game over.' },
    { icon: '💡', title: 'HINTS', desc: 'You have 2 hints per run. Each reveals one random letter. Use them wisely.' },
    { icon: '💰', title: 'EARN CREDITS', desc: 'Win = earn credits based on time left, hints unused, and your win streak.' },
    { icon: '🎯', title: 'PUZZLE TYPES', desc: 'Anagrams, Caesar ciphers, hidden words, riddles, and missing vowels.' },
    { icon: '🗓', title: 'DAILY CHALLENGE', desc: 'One fixed puzzle set per day. Separate scoring. Complete daily for bonus credits.' },
    { icon: '🎨', title: 'VAULT SHOP', desc: 'Spend credits to unlock 5 additional color themes for the terminal.' },
  ];

  const types = [
    { type: 'ANAGRAM', ex: 'UNSCRAMBLE: T A R G E T → TARGET' },
    { type: 'CAESAR CIPHER', ex: 'DECODE (shift -3): VKDGRZ → SHADOW' },
    { type: 'HIDDEN WORD', ex: '"The CRACKed safe was open." → CRACK' },
    { type: 'RIDDLE', ex: '"I have hands but no arms..." → CLOCK' },
    { type: 'MISSING VOWELS', ex: 'F _ R _ W _ L L → FIREWALL' },
  ];

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
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.75rem', color: secondaryColor, letterSpacing: '0.3em', opacity: 0.7 }}>OPERATIVE BRIEFING</div>
          <div style={{ fontSize: '2.5rem', color: primaryColor, textShadow: `0 0 20px ${primaryColor}`, letterSpacing: '0.1em' }}>HOW TO PLAY</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {rules.map((r, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.6)',
              border: `1px solid ${primaryColor}30`,
              borderRadius: '6px',
              padding: '14px',
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem' }}>{r.icon}</div>
                <div>
                  <div style={{ color: primaryColor, fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '4px' }}>{r.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.4 }}>{r.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${secondaryColor}30`, borderRadius: '6px', padding: '16px', marginBottom: '24px', background: 'rgba(0,0,0,0.6)' }}>
          <div style={{ color: secondaryColor, fontSize: '1.1rem', letterSpacing: '0.15em', marginBottom: '12px' }}>PUZZLE TYPE EXAMPLES</div>
          {types.map((t, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ color: primaryColor, fontSize: '0.8rem', letterSpacing: '0.1em' }}>{t.type}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: 'Courier New, monospace' }}>{t.ex}</div>
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${secondaryColor}30`, borderRadius: '6px', padding: '14px', marginBottom: '24px', background: 'rgba(0,0,0,0.6)' }}>
          <div style={{ color: secondaryColor, fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '8px' }}>CREDITS FORMULA</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.8 }}>
            Base: 50 credits per win<br/>
            + 1 credit per second remaining<br/>
            + 25 credits per unused hint<br/>
            × Win Streak Multiplier (1 + streak × 0.25)
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
