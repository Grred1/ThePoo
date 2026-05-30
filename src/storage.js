export const STORAGE_KEYS = {
  records: 'shiji_records',
  collection: 'shiji_collection',
  streakDays: 'shiji_streak',
  lastDate: 'shiji_last_date',
  luckyPoints: 'shiji_points',
  weather: 'shiji_weather',
};

export function createStorage(storage = window.localStorage) {
  const getRaw = (key) => {
    try {
      return storage.getItem(key);
    } catch {
      return null;
    }
  };

  const setRaw = (key, value) => {
    try {
      storage.setItem(key, value);
    } catch {}
  };

  const get = (key, fallback) => {
    const raw = getRaw(key);
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const set = (key, value) => {
    setRaw(key, JSON.stringify(value));
  };

  const getNumber = (key, fallback = 0) => {
    const v = Number(get(key, fallback));
    return Number.isFinite(v) ? v : fallback;
  };

  return { get, set, getNumber };
}
