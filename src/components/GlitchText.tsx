import React, { useEffect, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  intensity?: number; // 0-1
  color?: string;
  style?: React.CSSProperties;
}

const GLITCH_CHARS = '!@#$%^&*<>?/\\|[]{}=+~`01010011';

export default function GlitchText({ text, className = '', intensity = 0.3, color, style }: Props) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    let glitchInterval: ReturnType<typeof setInterval>;
    let restoreTimeout: ReturnType<typeof setTimeout>;

    function triggerGlitch() {
      if (Math.random() < intensity) {
        setGlitching(true);
        const glitched = text.split('').map(c => {
          if (c === ' ') return c;
          return Math.random() < 0.4
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : c;
        }).join('');
        setDisplay(glitched);
        restoreTimeout = setTimeout(() => {
          setDisplay(text);
          setGlitching(false);
        }, 80 + Math.random() * 120);
      }
    }

    glitchInterval = setInterval(triggerGlitch, 1200 + Math.random() * 800);
    return () => {
      clearInterval(glitchInterval);
      clearTimeout(restoreTimeout);
    };
  }, [text, intensity]);

  return (
    <span
      className={className}
      style={{
        color: color,
        textShadow: glitching ? `0 0 8px ${color || '#00ffcc'}, 2px 0 ${color || '#ff00ff'}` : undefined,
        display: 'inline-block',
        ...style,
      }}
      data-glitch={glitching ? 'true' : 'false'}
    >
      {display}
    </span>
  );
}
