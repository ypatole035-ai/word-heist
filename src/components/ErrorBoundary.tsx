import { Component, ReactNode } from 'react';

interface State { hasError: boolean; error: string }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, error: '' };

  static getDerivedStateFromError(e: Error): State {
    return { hasError: true, error: e.message };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{
        minHeight: '100vh', background: '#0d0000', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'VT323, monospace', padding: '24px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', color: '#ff2244', marginBottom: '12px', animation: 'alarmFlash 0.6s infinite' }}>⚠</div>
        <div style={{ fontSize: '2rem', color: '#ff2244', letterSpacing: '0.2em', marginBottom: '8px' }}>SYSTEM BREACH</div>
        <div style={{ fontSize: '1rem', color: 'rgba(255,100,100,0.7)', letterSpacing: '0.1em', marginBottom: '8px' }}>
          CRITICAL ERROR — OPERATIVE COMPROMISED
        </div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,100,100,0.4)', marginBottom: '24px', maxWidth: '400px', wordBreak: 'break-word' }}>
          {this.state.error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'rgba(255,34,68,0.15)', border: '1px solid #ff2244',
            borderRadius: '4px', padding: '10px 28px', color: '#ff2244',
            fontSize: '1rem', cursor: 'pointer', fontFamily: 'VT323, monospace',
            letterSpacing: '0.15em',
          }}
        >
          ↺ REBOOT SYSTEM
        </button>
      </div>
    );
  }
}
