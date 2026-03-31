import { useState, useCallback } from 'react';
import { Screen, GameMode, StoredData } from './types';
import { THEMES } from './themes';
import { loadData, updateData, getTodayString } from './storage';
import { getClassicPuzzles, getDailyPuzzles } from './puzzles';
import { Puzzle } from './types';

import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import GameOverScreen from './components/GameOverScreen';
import VaultShop from './components/VaultShop';
import HowToPlay from './components/HowToPlay';
import HighScores from './components/HighScores';
import PracticeScreen from './components/PracticeScreen';

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [stored, setStored] = useState<StoredData>(() => loadData());
  const [mode, setMode] = useState<GameMode>('classic');
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [winData, setWinData] = useState({ timeLeft: 0, hintsUsed: 0, secLevel: 0, credits: 0 });
  const [lossData, setLossData] = useState({ reason: 'timeout' as 'timeout' | 'lockdown', locksCleared: 0 });

  const theme = THEMES[stored.activeTheme] || THEMES.neon_shadow;

  const startGame = useCallback((gameMode: GameMode) => {
    setMode(gameMode);
    if (gameMode === 'classic') {
      setPuzzles(getClassicPuzzles());
    } else if (gameMode === 'daily') {
      const today = getTodayString();
      setPuzzles(getDailyPuzzles(today));
    }
    // practice mode is handled by PracticeScreen itself — no puzzles needed here
    if (gameMode === 'practice') {
      setScreen('practice');
      return;
    }
    setScreen('game');
  }, []);

  const handleWin = useCallback((timeLeft: number, hintsUsed: number, secLevel: number) => {
    const data = loadData();
    const hintsUnused = 2 - hintsUsed;
    const timeBonusCredits = timeLeft;
    const hintBonusCredits = hintsUnused * 25;
    const baseCredits = 50;
    // Cap streak multiplier at 3x to prevent economy break
    const streakMult = 1 + Math.min(data.winStreak, 8) * 0.25;
    const rawCredits = Math.round((baseCredits + timeBonusCredits + hintBonusCredits) * streakMult);

    const newStreak = data.winStreak + 1;
    const newBestStreak = Math.max(data.bestStreak || 0, newStreak);
    const newTotal = data.totalCredits + rawCredits;
    const today = getTodayString();

    // Achievement checks
    const newAchievements = [...(data.achievements || [])];
    if (!newAchievements.includes('first_win')) newAchievements.push('first_win');
    if (hintsUsed === 0 && !newAchievements.includes('no_hints')) newAchievements.push('no_hints');
    if (secLevel === 0 && !newAchievements.includes('flawless')) newAchievements.push('flawless');
    if (timeLeft >= 60 && !newAchievements.includes('speed_demon')) newAchievements.push('speed_demon');
    if (newStreak >= 3 && !newAchievements.includes('streak_3')) newAchievements.push('streak_3');

    const updates: Partial<StoredData> = {
      totalCredits: newTotal,
      winStreak: newStreak,
      bestStreak: newBestStreak,
      totalRuns: (data.totalRuns || 0) + 1,
      totalWins: (data.totalWins || 0) + 1,
      achievements: newAchievements,
    };

    if (mode === 'classic') {
      if (rawCredits > data.classicHighScore) updates.classicHighScore = rawCredits;
    } else {
      updates.dailyDate = today;
      updates.dailyCompleted = true;
      if (rawCredits > data.dailyHighScore) updates.dailyHighScore = rawCredits;
    }

    const updated = updateData(updates);
    setStored(updated);
    setWinData({ timeLeft, hintsUsed, secLevel, credits: rawCredits });
    setScreen('win');
  }, [mode]);

  const handleGameOver = useCallback((reason: 'timeout' | 'lockdown', locksCleared: number) => {
    const data = loadData();
    const updated = updateData({
      winStreak: 0,
      totalRuns: (data.totalRuns || 0) + 1,
    });
    setStored(updated);
    setLossData({ reason, locksCleared });
    setScreen('gameover');
  }, []);

  const handleStoredChange = useCallback((d: StoredData) => {
    setStored(d);
  }, []);

  // CRT flicker effect on entire app
  const bg = theme.bg;
  const primary = theme.primary;
  const secondary = theme.secondary;
  const scanlineOpacity = theme.scanlineOpacity;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: '#e0e0e0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* CRT Scanlines */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1000,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)',
          opacity: scanlineOpacity,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 999,
          backgroundImage: `
            linear-gradient(${primary}08 1px, transparent 1px),
            linear-gradient(90deg, ${primary}08 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* CRT vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 998,
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: 'fixed',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primary}06, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {screen === 'menu' && (
          <MainMenu
            onStart={startGame}
            onShop={() => setScreen('shop')}
            onHowTo={() => setScreen('howtoplay')}
            onScores={() => setScreen('highscores')}
            stored={stored}
            primaryColor={primary}
            secondaryColor={secondary}
          />
        )}
        {screen === 'game' && (
          <GameScreen
            puzzles={puzzles}
            mode={mode}
            primaryColor={primary}
            secondaryColor={secondary}
            onWin={handleWin}
            onGameOver={handleGameOver}
            onMenu={() => setScreen('menu')}
            onRestart={() => startGame(mode)}
          />
        )}
        {screen === 'win' && (
          <WinScreen
            creditsEarned={winData.credits}
            timeLeft={winData.timeLeft}
            hintsUsed={winData.hintsUsed}
            mode={mode}
            stored={stored}
            primaryColor={primary}
            secondaryColor={secondary}
            onMenu={() => setScreen('menu')}
            onPlayAgain={() => startGame(mode)}
            onShop={() => setScreen('shop')}
          />
        )}
        {screen === 'gameover' && (
          <GameOverScreen
            reason={lossData.reason}
            locksCleared={lossData.locksCleared}
            primaryColor={primary}
            onMenu={() => setScreen('menu')}
            onRetry={() => startGame(mode)}
          />
        )}
        {screen === 'shop' && (
          <VaultShop
            stored={stored}
            onStoredChange={handleStoredChange}
            onBack={() => setScreen('menu')}
            primaryColor={primary}
            secondaryColor={secondary}
          />
        )}
        {screen === 'howtoplay' && (
          <HowToPlay
            onBack={() => setScreen('menu')}
            primaryColor={primary}
            secondaryColor={secondary}
          />
        )}
        {screen === 'highscores' && (
          <HighScores
            stored={stored}
            onBack={() => setScreen('menu')}
            primaryColor={primary}
            secondaryColor={secondary}
          />
        )}
        {screen === 'practice' && (
          <PracticeScreen
            onBack={() => setScreen('menu')}
            primaryColor={primary}
            secondaryColor={secondary}
          />
        )}
      </div>
    </div>
  );
}
