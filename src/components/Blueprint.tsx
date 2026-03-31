interface Props {
  primaryColor: string;
  secondaryColor: string;
  creditsEarned: number;
  timeLeft: number;
  hintsUsed: number;
  mode: string;
}

export default function Blueprint({ primaryColor, secondaryColor, creditsEarned, timeLeft, hintsUsed, mode }: Props) {
  const cx = secondaryColor;
  const wh = '#ffffff';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        border: `2px solid ${cx}60`,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: `0 0 30px ${cx}30`,
      }}
    >
      <svg
        viewBox="0 0 600 400"
        style={{ width: '100%', display: 'block', background: '#020a18' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={`${cx}18`} strokeWidth="0.5" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="400" fill="url(#grid)" />
        
        {/* Scanlines */}
        <rect width="600" height="400" fill="none" opacity="0.06"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 4px)' }}
        />

        {/* Outer building perimeter */}
        <rect x="40" y="40" width="520" height="320" fill="none" stroke={cx} strokeWidth="1.5" opacity="0.7" />

        {/* Guard room - top left */}
        <rect x="40" y="40" width="100" height="80" fill={`${cx}08`} stroke={cx} strokeWidth="1" opacity="0.7" />
        <text x="90" y="86" textAnchor="middle" fill={cx} fontSize="8" opacity="0.8" fontFamily="monospace">GUARD</text>
        <text x="90" y="96" textAnchor="middle" fill={cx} fontSize="8" opacity="0.8" fontFamily="monospace">ROOM</text>

        {/* Server room - top right */}
        <rect x="460" y="40" width="100" height="80" fill={`${cx}08`} stroke={cx} strokeWidth="1" opacity="0.7" />
        <text x="510" y="86" textAnchor="middle" fill={cx} fontSize="8" opacity="0.8" fontFamily="monospace">SERVER</text>
        <text x="510" y="96" textAnchor="middle" fill={cx} fontSize="8" opacity="0.8" fontFamily="monospace">ROOM</text>

        {/* Main corridor - horizontal */}
        <rect x="140" y="140" width="320" height="40" fill={`${primaryColor}08`} stroke={primaryColor} strokeWidth="0.8" strokeDasharray="4,2" opacity="0.6" />
        <text x="300" y="165" textAnchor="middle" fill={primaryColor} fontSize="7" opacity="0.7" fontFamily="monospace">MAIN CORRIDOR</text>

        {/* Vault room - center */}
        <rect x="220" y="210" width="160" height="120" fill={`${cx}12`} stroke={cx} strokeWidth="2" opacity="0.9" filter="url(#glow)" />
        <text x="300" y="258" textAnchor="middle" fill={wh} fontSize="10" fontWeight="bold" fontFamily="monospace" opacity="0.9">VAULT</text>
        <text x="300" y="270" textAnchor="middle" fill={cx} fontSize="7" fontFamily="monospace" opacity="0.8">PRIMARY TARGET</text>
        {/* Vault door */}
        <circle cx="300" cy="295" r="20" fill="none" stroke={cx} strokeWidth="1.5" opacity="0.8" />
        <circle cx="300" cy="295" r="12" fill="none" stroke={cx} strokeWidth="1" opacity="0.6" />
        <line x1="300" y1="275" x2="300" y2="295" stroke={cx} strokeWidth="1.5" opacity="0.8" />

        {/* Left wing */}
        <rect x="40" y="200" width="120" height="100" fill={`${cx}05`} stroke={cx} strokeWidth="0.8" opacity="0.5" />
        <text x="100" y="248" textAnchor="middle" fill={cx} fontSize="7" opacity="0.6" fontFamily="monospace">CONTROL</text>
        <text x="100" y="258" textAnchor="middle" fill={cx} fontSize="7" opacity="0.6" fontFamily="monospace">CENTER</text>

        {/* Right wing */}
        <rect x="440" y="200" width="120" height="100" fill={`${cx}05`} stroke={cx} strokeWidth="0.8" opacity="0.5" />
        <text x="500" y="248" textAnchor="middle" fill={cx} fontSize="7" opacity="0.6" fontFamily="monospace">SECURITY</text>
        <text x="500" y="258" textAnchor="middle" fill={cx} fontSize="7" opacity="0.6" fontFamily="monospace">HUB</text>

        {/* Escape route - bottom */}
        <rect x="240" y="330" width="120" height="30" fill={`${primaryColor}10`} stroke={primaryColor} strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
        <text x="300" y="350" textAnchor="middle" fill={primaryColor} fontSize="8" fontFamily="monospace" opacity="0.8">ESCAPE ROUTE</text>
        <line x1="300" y1="330" x2="300" y2="360" stroke={primaryColor} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
        <polygon points="290,355 300,370 310,355" fill={primaryColor} opacity="0.6" />

        {/* Entry point */}
        <rect x="40" y="165" width="30" height="10" fill={secondaryColor} opacity="0.6" />
        <text x="23" y="174" textAnchor="middle" fill={secondaryColor} fontSize="7" fontFamily="monospace" opacity="0.8">IN</text>

        {/* Camera icons */}
        {[[120, 80], [480, 80], [160, 200], [440, 200]].map(([cx2, cy], i) => (
          <g key={i} opacity="0.5">
            <circle cx={cx2} cy={cy} r="5" fill="none" stroke="#ff4444" strokeWidth="1" />
            <circle cx={cx2} cy={cy} r="2" fill="#ff4444" />
            <line x1={cx2} y1={cy} x2={cx2 + 10} y2={cy - 8} stroke="#ff4444" strokeWidth="0.5" strokeDasharray="2,1" />
          </g>
        ))}

        {/* TOP SECRET stamp */}
        <g transform="rotate(-20, 480, 300)">
          <rect x="400" y="275" width="160" height="50" fill="none" stroke="#ff2244" strokeWidth="2" opacity="0.5" />
          <text x="480" y="300" textAnchor="middle" fill="#ff2244" fontSize="14" fontWeight="bold" fontFamily="monospace" opacity="0.5" letterSpacing="2">TOP SECRET</text>
          <text x="480" y="314" textAnchor="middle" fill="#ff2244" fontSize="7" fontFamily="monospace" opacity="0.4">CLASSIFIED LEVEL 5</text>
        </g>

        {/* CRACKED stamp */}
        <g transform="rotate(15, 120, 310)">
          <rect x="50" y="288" width="130" height="40" fill="none" stroke={cx} strokeWidth="2" opacity="0.6" />
          <text x="115" y="313" textAnchor="middle" fill={cx} fontSize="16" fontWeight="bold" fontFamily="monospace" opacity="0.6" letterSpacing="2">CRACKED</text>
        </g>

        {/* Stats overlay */}
        <rect x="40" y="330" width="100" height="50" fill="rgba(0,0,0,0.6)" stroke={`${cx}40`} strokeWidth="0.5" rx="2" />
        <text x="90" y="345" textAnchor="middle" fill={cx} fontSize="7" fontFamily="monospace" opacity="0.8">OPERATION STATS</text>
        <text x="90" y="358" textAnchor="middle" fill={wh} fontSize="8" fontFamily="monospace" opacity="0.7">TIME: {String(Math.floor(timeLeft/60)).padStart(2,'0')}:{String(timeLeft%60).padStart(2,'0')}</text>
        <text x="90" y="368" textAnchor="middle" fill={wh} fontSize="8" fontFamily="monospace" opacity="0.7">HINTS: {hintsUsed}</text>
        <text x="90" y="378" textAnchor="middle" fill={secondaryColor} fontSize="8" fontFamily="monospace" opacity="0.8">CR: {creditsEarned}</text>

        {/* Mode tag */}
        <rect x="450" y="338" width="110" height="18" fill={`${primaryColor}20`} stroke={`${primaryColor}60`} strokeWidth="0.5" rx="2" />
        <text x="505" y="350" textAnchor="middle" fill={primaryColor} fontSize="8" fontFamily="monospace" opacity="0.9">
          {mode === 'daily' ? 'DAILY CHALLENGE' : 'CLASSIC MODE'}
        </text>
      </svg>
    </div>
  );
}
