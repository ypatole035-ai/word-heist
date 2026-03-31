interface Props {
  level: number; // 0-3
}

export default function SecurityVignette({ level }: Props) {
  if (level === 0) return null;

  const intensity = level === 1 ? 0.12 : level === 2 ? 0.25 : 0.45;
  const color = level === 1 ? '255,170,0' : level === 2 ? '255,100,0' : '255,0,0';
  const animSpeed = level === 3 ? '0.4s' : level === 2 ? '0.7s' : '1.2s';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 80,
        boxShadow: `inset 0 0 80px rgba(${color},${intensity}), inset 0 0 180px rgba(${color},${intensity * 0.5})`,
        animation: `vignetteFlash ${animSpeed} infinite alternate`,
        borderRadius: 0,
      }}
    />
  );
}
