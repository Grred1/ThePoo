import { STORAGE_KEYS } from './storage.js';

export function createRecords({ storage, utils, config, getRarityConfig, getWeatherCode }) {
  const getRecords = () => storage.get(STORAGE_KEYS.records, []);
  const setRecords = (v) => storage.set(STORAGE_KEYS.records, v);
  let lastRecordTs = null;

  const CAL = {
    year: null,
    month: null,
    selectedDate: null,
  };

  const todayStr = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const recordsByDate = () => {
    const records = getRecords();
    const map = {};
    for (const r of records) {
      if (!map[r.date]) map[r.date] = [];
      map[r.date].push(r);
    }
    return map;
  };

  const renderCalendar = () => {
    const wrap = document.getElementById('calendar-wrap');
    if (!wrap) return;

    const now = new Date();
    if (CAL.year === null) CAL.year = now.getFullYear();
    if (CAL.month === null) CAL.month = now.getMonth();
    if (CAL.selectedDate === null) CAL.selectedDate = todayStr();

    const year = CAL.year;
    const month = CAL.month;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const rMap = recordsByDate();
    const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六'];
    const monthLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    wrap.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'cal-header';
    header.innerHTML = `
      <button class="cal-nav" id="cal-prev" type="button">‹</button>
      <div class="cal-title">${year}年 ${monthLabels[month]}</div>
      <button class="cal-nav" id="cal-next" type="button">›</button>
    `;
    wrap.appendChild(header);

    const wRow = document.createElement('div');
    wRow.className = 'cal-weekdays';
    for (const w of weekdayLabels) {
      const d = document.createElement('div');
      d.className = 'cal-wd';
      d.textContent = w;
      wRow.appendChild(d);
    }
    wrap.appendChild(wRow);

    const grid = document.createElement('div');
    grid.className = 'cal-grid';

    const today = todayStr();
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-cell cal-empty';
      grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cell = document.createElement('div');
      cell.className = 'cal-cell';
      if (dateStr === today) cell.classList.add('cal-today');
      if (dateStr === CAL.selectedDate) cell.classList.add('cal-selected');
      if (rMap[dateStr]) {
        cell.classList.add('cal-has-record');
        const dot = document.createElement('div');
        dot.className = 'cal-dot';
        cell.appendChild(dot);
      }
      const num = document.createElement('span');
      num.className = 'cal-num';
      num.textContent = d;
      cell.appendChild(num);
      cell.dataset.date = dateStr;
      cell.addEventListener('click', () => {
        CAL.selectedDate = dateStr;
        renderCalendar();
        renderRecords();
        document.getElementById('records-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      grid.appendChild(cell);
    }

    wrap.appendChild(grid);

    document.getElementById('cal-prev')?.addEventListener('click', () => {
      CAL.month--;
      if (CAL.month < 0) { CAL.month = 11; CAL.year--; }
      renderCalendar();
    });
    document.getElementById('cal-next')?.addEventListener('click', () => {
      CAL.month++;
      if (CAL.month > 11) { CAL.month = 0; CAL.year++; }
      renderCalendar();
    });
  };

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

    const dateTitle = document.getElementById('records-date-title');
    const filtered = CAL.selectedDate
      ? records.filter((r) => r.date === CAL.selectedDate)
      : records;

    if (dateTitle) {
      dateTitle.textContent = CAL.selectedDate ? `📅 ${CAL.selectedDate}` : '📋 全部记录';
    }

    list.innerHTML = '';
    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'record-note';
      empty.textContent = CAL.selectedDate ? '这一天还没有如厕记录～' : '还没有如厕记录，先从一次开始吧～';
      list.appendChild(empty);
      return;
    }

    filtered.forEach((r, i) => {
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
      const lm = document.createElement('div');
      lm.className = 'record-line record-lm';
      lm.innerHTML = `📍 ${r.location || '神秘地点'}${r.weather ? ` · ${r.weather}` : ''} · ${r.mood || '不知道，我的心情很曼妙'}`;
      const note = document.createElement('div');
      note.className = 'record-note';
      note.textContent = r.note;
      el.appendChild(t);
      el.appendChild(l1);
      el.appendChild(l2);
      el.appendChild(lm);
      el.appendChild(note);
      list.appendChild(el);
    });
  };

  const saveDropRecord = (drop, { todayYMD, hm }) => {
    const poop = drop.poop;
    const rarityLabel = getRarityConfig(poop).label;
    const date = todayYMD();
    const time = hm(drop.settleAt);
    const weatherCode = getWeatherCode();
    const weatherLabel = (config.WEATHER_LIST.find((w) => w.code === weatherCode) || {}).label || weatherCode;
    const note = buildNote(drop.durationSec, weatherCode);
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
      location: '神秘地点',
      mood: '不知道，我的心情很曼妙',
      weather: weatherLabel,
    };

    const records = getRecords();
    records.unshift(record);
    setRecords(records.slice(0, 200));
    lastRecordTs = record.ts;
  };

  const updateLastRecord = (location, mood) => {
    if (!lastRecordTs) return;
    const records = getRecords();
    const idx = records.findIndex((r) => r.ts === lastRecordTs);
    if (idx === -1) return;
    records[idx].location = location;
    records[idx].mood = mood;
    setRecords(records);
  };

  return { getRecords, renderRecords, renderCalendar, saveDropRecord, updateLastRecord, buildNote };
}
