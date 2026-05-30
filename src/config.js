export const ENCOURAGES = [
  '坚持记录，你的肠道会越来越顺畅哦！💪',
  '规律如厕是健康生活的第一步 🌿',
  '今天有没有好好补充水分呀？💧',
  '多吃蔬菜，便便会更顺畅哦～🥦',
  '你是今天最认真的如厕达人！🏆',
];

export const WEATHER_LIST = [
  { code: 'sunny', label: '晴天', emoji: '☀️' },
  { code: 'cloudy', label: '多云', emoji: '⛅️' },
  { code: 'overcast', label: '阴天', emoji: '☁️' },
  { code: 'windy', label: '大风', emoji: '🌬️' },
  { code: 'rainy', label: '雨天', emoji: '🌧️' },
  { code: 'stormy', label: '雷雨', emoji: '⛈️' },
];

export function getTier(streakDays) {
  if (streakDays <= 2) return { cap: 100, pityRarity: 'rare', label: '新手池' };
  if (streakDays <= 6) return { cap: 200, pityRarity: 'epic', label: '进阶池' };
  return { cap: 300, pityRarity: 'legendary', label: '传说池' };
}

export function isNightBonus(now) {
  const h = now.getHours();
  return h >= 23 || h < 2;
}

export function isRainyWeather(code) {
  return code === 'rainy' || code === 'stormy';
}
