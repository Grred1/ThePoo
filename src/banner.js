import { STORAGE_KEYS } from './storage.js';
import { WEATHER_LIST, getTier } from './config.js';

export function createBanner({ storage, showToast }) {
  const getStreakDays = () => Math.max(0, Math.floor(storage.getNumber(STORAGE_KEYS.streakDays, 0)));
  const setStreakDays = (v) => storage.set(STORAGE_KEYS.streakDays, Math.max(0, Math.floor(v)));
  const getLastDate = () => storage.get(STORAGE_KEYS.lastDate, null);
  const setLastDate = (v) => storage.set(STORAGE_KEYS.lastDate, v);
  const getLuckyPoints = () => Math.max(0, Math.floor(storage.getNumber(STORAGE_KEYS.luckyPoints, 0)));
  const setLuckyPoints = (v) => storage.set(STORAGE_KEYS.luckyPoints, Math.max(0, Math.floor(v)));

  const getWeatherCode = () => {
    const cur = storage.get(STORAGE_KEYS.weather, null);
    if (typeof cur === 'string' && WEATHER_LIST.some((w) => w.code === cur)) return cur;
    const init = WEATHER_LIST[Math.floor(Math.random() * WEATHER_LIST.length)].code;
    storage.set(STORAGE_KEYS.weather, init);
    return init;
  };

  const setWeatherCode = (code) => {
    if (!WEATHER_LIST.some((w) => w.code === code)) return;
    storage.set(STORAGE_KEYS.weather, code);
  };

  const renderBanner = () => {
    const weather = getWeatherCode();
    const w = WEATHER_LIST.find((x) => x.code === weather) ?? WEATHER_LIST[0];
    const weatherEmoji = document.getElementById('weather-emoji');
    const weatherText = document.getElementById('weather-text');
    if (weatherEmoji) weatherEmoji.textContent = w.emoji;
    if (weatherText) weatherText.textContent = w.label;

    const streak = getStreakDays();
    const streakDaysEl = document.getElementById('streak-days');
    if (streakDaysEl) streakDaysEl.textContent = String(streak);

    const tier = getTier(streak);
    const points = getLuckyPoints();
    const goalEl = document.getElementById('points-goal');
    const nowEl = document.getElementById('points-now');
    const fillEl = document.getElementById('points-fill');
    if (goalEl) goalEl.textContent = String(tier.cap);
    if (nowEl) nowEl.textContent = String(points);
    if (fillEl) fillEl.style.width = Math.min(100, Math.max(0, (points / tier.cap) * 100)) + '%';
  };

  const ensureStreakOnLoad = ({ todayYMD, yesterdayYMD }) => {
    const last = getLastDate();
    if (!last) return;
    const today = todayYMD();
    if (last === today) return;
    if (last === yesterdayYMD()) return;
    setStreakDays(0);
  };

  const updateStreakOnRecord = ({ todayYMD, yesterdayYMD }) => {
    const last = getLastDate();
    const today = todayYMD();
    const yd = yesterdayYMD();
    let streak = getStreakDays();
    if (last === today) return streak;
    if (last === yd) streak += 1;
    else streak = 1;
    setStreakDays(streak);
    setLastDate(today);
    return streak;
  };

  const showStreakTip = ({ getRarityConfig }) => {
    const s = getStreakDays();
    const tier = getTier(s);
    const label = getRarityConfig({ rarity: tier.pityRarity }).label;
    showToast(`连续打卡 ${s} 天 · ${tier.label}（保底 ${label}）`);
  };

  const cycleWeather = () => {
    const cur = getWeatherCode();
    const idx = WEATHER_LIST.findIndex((w) => w.code === cur);
    const next = WEATHER_LIST[(idx + 1 + WEATHER_LIST.length) % WEATHER_LIST.length];
    setWeatherCode(next.code);
    renderBanner();
    showToast('今日天气：' + next.label);
  };

  return {
    renderBanner,
    ensureStreakOnLoad,
    updateStreakOnRecord,
    showStreakTip,
    cycleWeather,
    getWeatherCode,
    setWeatherCode,
    getLuckyPoints,
    setLuckyPoints,
    getStreakDays,
    setStreakDays,
  };
}
