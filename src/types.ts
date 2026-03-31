export type PuzzleType =
  | 'anagram'
  | 'caesar'
  | 'hidden_word'
  | 'definition'
  | 'missing_vowels'
  | 'odd_one_out'
  | 'acronym';

export type Difficulty = 1 | 2 | 3;

export interface Puzzle {
  id: string;
  type: PuzzleType;
  prompt: string;
  answer: string;
  difficulty: Difficulty;
  hint?: string;
  intel: string;
  choices?: string[]; // for odd_one_out
}

export type ThemeId =
  | 'neon_shadow'
  | 'retro_terminal'
  | 'ghost_protocol'
  | 'blood_vault'
  | 'void_runner'
  | 'quantum_breach';

export interface Theme {
  id: ThemeId;
  name: string;
  cost: number;
  primary: string;
  secondary: string;
  bg: string;
  lockColor: string;
  scanlineOpacity: number;
  glitchColor: string;
  description: string;
}

export type GameMode = 'classic' | 'daily' | 'practice';
export type Screen =
  | 'menu'
  | 'game'
  | 'win'
  | 'gameover'
  | 'shop'
  | 'howtoplay'
  | 'highscores'
  | 'achievements'
  | 'debrief'
  | 'difficulty'
  | 'practice';

export type DifficultyMode = 'easy' | 'normal' | 'hard';

export interface DifficultyConfig {
  totalTime: number;
  wrongPenalty: number;
  maxHints: number;
  label: string;
  desc: string;
  creditMult: number;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyMode, DifficultyConfig> = {
  easy:   { totalTime: 120, wrongPenalty: 5,  maxHints: 3, label: 'EASY',   desc: '120s · -5s penalty · 3 hints · 0.7× credits', creditMult: 0.7 },
  normal: { totalTime: 90,  wrongPenalty: 8,  maxHints: 2, label: 'NORMAL', desc: '90s · -8s penalty · 2 hints · 1× credits',   creditMult: 1.0 },
  hard:   { totalTime: 60,  wrongPenalty: 12, maxHints: 1, label: 'HARD',   desc: '60s · -12s penalty · 1 hint · 1.5× credits', creditMult: 1.5 },
};

export type OperativeClassId = 'hacker' | 'muscle' | 'ghost';

export interface OperativeClass {
  id: OperativeClassId;
  name: string;
  icon: string;
  desc: string;
  perk: string;
  bonusHints: number;       // extra hints per run
  penaltyReduction: number; // seconds reduced from penalty
  securityBuffer: number;   // extra security tolerance (0 = none, 1 = one free strike)
}

export const OPERATIVE_CLASSES: Record<OperativeClassId, OperativeClass> = {
  hacker: {
    id: 'hacker',
    name: 'HACKER',
    icon: '💻',
    desc: 'Elite digital infiltrator. Brains over brawn.',
    perk: '+1 extra hint per run',
    bonusHints: 1,
    penaltyReduction: 0,
    securityBuffer: 0,
  },
  muscle: {
    id: 'muscle',
    name: 'MUSCLE',
    icon: '💪',
    desc: 'Takes hits and keeps moving. Built for pressure.',
    perk: 'Time penalty reduced by 3s',
    bonusHints: 0,
    penaltyReduction: 3,
    securityBuffer: 0,
  },
  ghost: {
    id: 'ghost',
    name: 'GHOST',
    icon: '👻',
    desc: 'Silent, invisible, patient. One free mistake.',
    perk: 'First wrong answer never raises security',
    bonusHints: 0,
    penaltyReduction: 0,
    securityBuffer: 1,
  },
};

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win',    name: 'FIRST BREACH',    icon: '🏆', desc: 'Complete your first vault heist.' },
  { id: 'no_hints',     name: 'SELF SUFFICIENT',  icon: '🧠', desc: 'Win a run without using any hints.' },
  { id: 'flawless',     name: 'GHOST RUN',        icon: '👻', desc: 'Win with security level 0 — never triggered an alarm.' },
  { id: 'speed_demon',  name: 'SPEED DEMON',      icon: '⚡', desc: 'Win with 60+ seconds remaining.' },
  { id: 'streak_3',     name: 'HAT TRICK',        icon: '🔥', desc: 'Win 3 consecutive runs.' },
  { id: 'streak_5',     name: 'UNSTOPPABLE',      icon: '💥', desc: 'Win 5 consecutive runs.' },
  { id: 'hard_win',     name: 'IRON OPERATIVE',   icon: '🦾', desc: 'Win a run on HARD difficulty.' },
  { id: 'daily_win',    name: 'CLOCK WATCHER',    icon: '📅', desc: 'Complete a Daily Challenge.' },
  { id: 'bypass_used',  name: 'CALCULATED',       icon: '🔧', desc: 'Use a security bypass token.' },
  { id: 'all_types',    name: 'POLYGLOT',         icon: '🔤', desc: 'Solve one of every puzzle type in a single run.' },
  { id: 'collector',    name: 'COLLECTOR',        icon: '💰', desc: 'Accumulate 2000 total credits.' },
  { id: 'veteran',      name: 'VETERAN',          icon: '🎖', desc: 'Complete 10 total runs (win or lose).' },
];

export interface StageSummary {
  puzzleId: string;
  puzzleType: PuzzleType;
  answer: string;
  solved: boolean;
  timeSpent: number;   // seconds on this stage
  attempts: number;    // wrong guesses before solve
  hintUsed: boolean;
}

export interface RunHistoryEntry {
  date: string;
  mode: GameMode;
  difficulty: DifficultyMode;
  won: boolean;
  timeLeft: number;
  hintsUsed: number;
  securityLevel: number;
  creditsEarned: number;
  stagesCleared: number;
  stages: StageSummary[];
}

export interface StoredData {
  schemaVersion: number;
  totalCredits: number;
  unlockedThemes: ThemeId[];
  activeTheme: ThemeId;
  classicHighScore: number;
  dailyHighScore: number;
  dailyDate: string;
  dailyCompleted: boolean;
  winStreak: number;
  bestStreak: number;
  totalRuns: number;
  totalWins: number;
  achievements: string[];
  runHistory: RunHistoryEntry[];       // last 20 runs
  operativeClass: OperativeClassId;
  difficultyMode: DifficultyMode;
  bypassTokens: number;                // purchasable in shop
  muted: boolean;
  totalWordssolved: number;
  firstLaunch: boolean;                // auto-tutorial on first visit
}
