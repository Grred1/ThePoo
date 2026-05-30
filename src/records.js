import { STORAGE_KEYS } from './storage.js';

export function createRecords({ storage, utils, config, getRarityConfig, getWeatherCode }) {
  const getRecords = () => storage.get(STORAGE_KEYS.records, []);
  const setRecords = (v) => storage.set(STORAGE_KEYS.records, v);

  const buildNote = (sec, weatherCode) => {
    const a0 = ['闪电战', '顺滑无比'];
    const a1 = ['标准发挥', '短促有力'];
    const a2 = ['带薪摸鱼', '从容不迫'];
    const a3 = ['深度冥想', '便秘的边缘'];
    const a4 = ['人椅合一', '双腿的噩梦'];
    const meals = ['昨晚的火锅', '今早的冰美式', '上午的外卖', '那杯来路不明的奶茶'];
    const missions = ['终于完成了它的历史使命', '光荣卸任', '交代了后事'];
    let evals = a2;
    if (sec < 60) evals = a0;
    else if (sec < 180) evals = a1;
    else if (sec < 480) evals = a2;
    else if (sec < 900) evals = a3;
    else evals = a4;
    const leg = Math.min(99, Math.round((sec / 60) * 6));
    const wTag = config.isRainyWeather(weatherCode) ? utils.randomPick(['滋润型', '黏糊型']) : null;
    const wLine = wTag ? `今晚的雨让你获得了${wTag}加成。` : '';
    return `这是一次${utils.randomPick(evals)}的如厕。你的双腿感受到了${leg}%的麻木。${utils.randomPick(meals)}${utils.randomPick(missions)}。${wLine}`;
  };

  const renderRecords = () => {
    const records = getRecords();
    const total = document.getElementById('records-total');
    if (total) total.textContent = String(records.length);
    const list = document.getElementById('records-list');
    if (!list) return;

    list.innerHTML = '';
    if (records.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'record-note';
      empty.textContent = '还没有如厕记录，先从一次开始吧～';
      list.appendChild(empty);
      return;
    }

    records.forEach((r, i) => {
      const el = document.createElement('div');
      el.className = 'record';
      const t = document.createElement('div');
      t.className = 'record-title';
      t.innerHTML = `<div class="idx">📋 如厕档案 #${records.length - i}</div><div class="ts">${r.date} ${r.time}</div>`;
      const l1 = document.createElement('div');
      l1.className = 'record-line';
      l1.innerHTML = `⏱ 历时：<span class="v">${utils.fmtDuration(r.durationSec)}</span>`;
      const l2 = document.createElement('div');
      l2.className = 'record-line';
      l2.innerHTML = `💩 获得：<span class="v">${r.poopName}</span>（${r.rarityLabel}）`;
      const note = document.createElement('div');
      note.className = 'record-note';
      note.textContent = r.note;
      el.appendChild(t);
      el.appendChild(l1);
      el.appendChild(l2);
      el.appendChild(note);
      list.appendChild(el);
    });
  };

  const saveDropRecord = (drop, { todayYMD, hm }) => {
    const poop = drop.poop;
    const rarityLabel = getRarityConfig(poop).label;
    const date = todayYMD();
    const time = hm(drop.settleAt);
    const note = buildNote(drop.durationSec, getWeatherCode());
    const record = {
      ts: drop.settleAt.getTime(),
      date,
      time,
      durationSec: drop.durationSec,
      poopId: poop.id,
      poopName: poop.name,
      rarity: poop.rarity,
      rarityLabel,
      bonuses: drop.bonuses,
      pointsGain: drop.pointsGain,
      luckyAfter: drop.luckyAfter,
      note,
    };

    const records = getRecords();
    records.unshift(record);
    setRecords(records.slice(0, 200));
  };

  return { getRecords, renderRecords, saveDropRecord, buildNote };
}
