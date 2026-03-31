// Web Audio API sound effects
// All sounds respect global mute state
let ctx: AudioContext | null = null;
let _muted = false;

export function setMuted(m: boolean) { _muted = m; }
export function isMuted() { return _muted; }

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return ctx;
}

function resume(): AudioContext | null {
  if (_muted) return null;
  try {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
    return c;
  } catch {
    return null;
  }
}

export function playUnlock() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const freqs = [523, 659, 784, 1047];
    freqs.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      gain.gain.setValueAtTime(0, t + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, t + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
      osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.35);
    });
  } catch {}
}

export function playWrong() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.linearRampToValueAtTime(80, t + 0.3);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.start(t); osc.stop(t + 0.4);
  } catch {}
}

export function playAlarm() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, t + i * 0.25);
      osc.frequency.setValueAtTime(440, t + i * 0.25 + 0.12);
      gain.gain.setValueAtTime(0.3, t + i * 0.25);
      gain.gain.setValueAtTime(0, t + i * 0.25 + 0.22);
      osc.start(t + i * 0.25); osc.stop(t + i * 0.25 + 0.25);
    }
  } catch {}
}

export function playWin() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const notes = [523, 659, 784, 880, 1047, 1175, 1319];
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.frequency.value = freq; osc.type = 'triangle';
      const start = t + i * 0.1;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
      osc.start(start); osc.stop(start + 0.55);
    });
  } catch {}
}

export function playGlitch() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const bufferSize = Math.floor(c.sampleRate * 0.3);
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (i < bufferSize * 0.1 ? i / (bufferSize * 0.1) : 1);
    }
    const source = c.createBufferSource();
    source.buffer = buffer;
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    source.connect(gain); gain.connect(c.destination);
    source.start(t);
  } catch {}
}

export function playTick() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.frequency.value = 1200; osc.type = 'square';
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.start(t); osc.stop(t + 0.05);
  } catch {}
}

export function playHint() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(660, t + 0.15);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.start(t); osc.stop(t + 0.3);
  } catch {}
}

// Short keyclick for typing
export function playKeyClick() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.frequency.value = 900 + Math.random() * 200;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.018, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    osc.start(t); osc.stop(t + 0.03);
  } catch {}
}

// Stage transition: access granted chime
export function playStageTransition() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const freqs = [660, 880, 1100];
    freqs.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.frequency.value = freq; osc.type = 'triangle';
      const s = t + i * 0.07;
      gain.gain.setValueAtTime(0, s);
      gain.gain.linearRampToValueAtTime(0.12, s + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 0.25);
      osc.start(s); osc.stop(s + 0.28);
    });
  } catch {}
}

// Bypass token used
export function playBypass() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const freqs = [330, 440, 550, 660, 440];
    freqs.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      const s = t + i * 0.09;
      gain.gain.setValueAtTime(0.12, s);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 0.18);
      osc.start(s); osc.stop(s + 0.2);
    });
  } catch {}
}

// Security level increase — heavy thud
export function playSecurityUp() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    // Low thud
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.start(t); osc.stop(t + 0.35);
    // High alert ping
    const osc2 = c.createOscillator();
    const gain2 = c.createGain();
    osc2.connect(gain2); gain2.connect(c.destination);
    osc2.frequency.value = 1760; osc2.type = 'square';
    gain2.gain.setValueAtTime(0.08, t + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc2.start(t + 0.05); osc2.stop(t + 0.2);
  } catch {}
}

// Achievement unlocked fanfare
export function playAchievement() {
  try {
    const c = resume(); if (!c) return;
    const t = c.currentTime;
    const notes = [784, 988, 1319, 1568];
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      const s = t + i * 0.12;
      gain.gain.setValueAtTime(0, s);
      gain.gain.linearRampToValueAtTime(0.18, s + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 0.4);
      osc.start(s); osc.stop(s + 0.45);
    });
  } catch {}
}
