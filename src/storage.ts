import { StoredData, ThemeId, RunHistoryEntry, DifficultyMode, OperativeClassId } from './types';

const KEY = 'word_heist_v4';
const SCHEMA_VERSION = 4;
const MAX_HISTORY = 20;

const DEFAULT: StoredData = {
  schemaVersion: SCHEMA_VERSION,
  totalCredits: 0,
  unlockedThemes: ['neon_shadow'],
  activeTheme: 'neon_shadow',
  classicHighScore: 0,
  dailyHighScore: 0,
  dailyDate: '',
  dailyCompleted: false,
  winStreak: 0,
  bestStreak: 0,
  totalRuns: 0,
  totalWins: 0,
  achievements: [],
  runHistory: [],
  operativeClass: 'hacker',
  difficultyMode: 'normal',
  bypassTokens: 0,
  muted: false,
  totalWordssolved: 0,
  firstLaunch: true,
};

export function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      // Check for old v3 data to migrate
      const oldRaw = localStorage.getItem('word_heist_v3');
      if (oldRaw) {
        const old = JSON.parse(oldRaw);
        const migrated: StoredData = {
          ...DEFAULT,
          totalCredits: old.totalCredits || 0,
          unlockedThemes: old.unlockedThemes || ['neon_shadow'],
          activeTheme: old.activeTheme || 'neon_shadow',
          classicHighScore: old.classicHighScore || 0,
          dailyHighScore: old.dailyHighScore || 0,
          dailyDate: old.dailyDate || '',
          dailyCompleted: old.dailyCompleted || false,
          winStreak: old.winStreak || 0,
          bestStreak: old.bestStreak || 0,
          totalRuns: old.totalRuns || 0,
          totalWins: old.totalWins || 0,
          achievements: old.achievements || [],
          firstLaunch: false,
        };
        saveData(migrated);
        return migrated;
      }
      return { ...DEFAULT };
    }
    const parsed = JSON.parse(raw);
    // Merge with defaults to handle missing fields from older schemas
    return { ...DEFAULT, ...parsed };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveData(data: StoredData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function updateData(partial: Partial<StoredData>): StoredData {
  const current = loadData();
  const updated = { ...current, ...partial };
  saveData(updated);
  return updated;
}

export function unlockTheme(themeId: ThemeId): StoredData {
  const data = loadData();
  if (!data.unlockedThemes.includes(themeId)) {
    data.unlockedThemes = [...data.unlockedThemes, themeId];
  }
  saveData(data);
  return data;
}

export function addRunHistory(entry: RunHistoryEntry): StoredData {
  const data = loadData();
  const history = [entry, ...(data.runHistory || [])].slice(0, MAX_HISTORY);
  const updated = { ...data, runHistory: history };
  saveData(updated);
  return updated;
}

export function getTodayString(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export function setOperativeClass(cls: OperativeClassId): StoredData {
  return updateData({ operativeClass: cls });
}

export function setDifficulty(diff: DifficultyMode): StoredData {
  return updateData({ difficultyMode: diff });
}

export function addBypassToken(): StoredData {
  const data = loadData();
  return updateData({ bypassTokens: (data.bypassTokens || 0) + 1, totalCredits: data.totalCredits - 75 });
}
