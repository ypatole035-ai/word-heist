import VaultLock from './VaultLock';

interface Props {
  solvedLocks: boolean[];
  currentIndex: number;
  primaryColor: string;
  lockColor: string;
}

export default function VaultGrid({ solvedLocks, currentIndex, primaryColor, lockColor }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          fontFamily: 'VT323, monospace',
          fontSize: '0.75rem',
          color: primaryColor,
          letterSpacing: '0.2em',
          opacity: 0.6,
          marginBottom: '4px',
          textAlign: 'center',
        }}
      >
        VAULT LOCKS — {solvedLocks.filter(Boolean).length}/6 CRACKED
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          maxWidth: '280px',
        }}
      >
        {solvedLocks.map((solved, i) => (
          <VaultLock
            key={i}
            index={i}
            solved={solved}
            active={i === currentIndex && !solved}
            primaryColor={primaryColor}
            lockColor={lockColor}
          />
        ))}
      </div>
    </div>
  );
}
