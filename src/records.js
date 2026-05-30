import { STORAGE_KEYS } from './storage.js';
import { WEATHER_LIST } from './config.js';

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

  const buildNote = (drop, weatherCode) => {
    const poop = drop?.poop;
    const sec = Math.max(0, Math.floor(drop?.durationSec ?? 0));
    const streakDays = Math.max(0, Math.floor(drop?.streakDays ?? 0));
    const bonuses = Array.isArray(drop?.bonuses) ? drop.bonuses : [];

    const paceBySec = (s) => {
      if (s < 10) return utils.randomPick(['快得离谱', '一眨眼就完', '闪电收工']);
      if (s < 60) return utils.randomPick(['干净利落', '短平快', '几下就收工']);
      if (s < 180) return utils.randomPick(['节奏刚好', '稳稳当当', '标准发挥']);
      if (s < 480) return utils.randomPick(['从容不迫', '慢慢来', '很有耐心']);
      if (s < 900) return utils.randomPick(['有点拉扯', '不太顺手', '需要时间']);
      return utils.randomPick(['坐到世界安静', '腿先投降', '时间在这里暂停']);
    };

    const shapeFlavor = (shape) => {
      if (shape === 'hard_ball') return utils.randomPick(['颗粒感很强', '一看就硬核', '分段得很认真']);
      if (shape === 'sausage') return utils.randomPick(['拉得很顺', '成型很丝滑', '一条线条很漂亮']);
      if (shape === 'soft') return utils.randomPick(['软软塌塌', '松弛得很', '落地就摊开']);
      if (shape === 'mushy') return utils.randomPick(['边缘有点散', '糊糊地铺开', '不太讲形状']);
      if (shape === 'liquid') return utils.randomPick(['带点溅射', '水花感很明显', '更像一摊']);
      return utils.randomPick(['看着就不太普通', '像彩蛋一样', '有点限定气质']);
    };

    const cuesFromPoop = (p) => {
      const name = String(p?.name ?? '');
      const id = String(p?.id ?? '');
      const emoji = String(p?.emoji ?? '');

      const cues = [];
      if (id.includes('numb') || name.includes('麻') || emoji.includes('⚡')) cues.push('麻');
      if (id.includes('tiny') || name.includes('小') || emoji.includes('❓')) cues.push('问号');
      if (id.includes('long_wait') || name.includes('等待') || emoji.includes('⏳')) cues.push('等待');
      if (name.includes('玉米') || emoji.includes('🌽')) cues.push('玉米');
      if (name.includes('黑芝麻') || name.includes('黑') || emoji.includes('⚫')) cues.push('黑');
      if (name.includes('番茄') || name.includes('意面') || emoji.includes('🍝')) cues.push('番茄');
      if (name.includes('气泡') || emoji.includes('🫧')) cues.push('气泡');
      if (name.includes('雪糕') || name.includes('冰') || name.includes('软冰淇淋') || emoji.includes('🍦') || emoji.includes('🍨')) cues.push('雪糕');
      if (name.includes('悲伤') || emoji.includes('😢')) cues.push('悲伤');
      if (name.includes('晕') || emoji.includes('😵')) cues.push('晕');
      if (name.includes('惊讶') || emoji.includes('😮')) cues.push('惊讶');
      if (name.includes('早八') || emoji.includes('⛈️')) cues.push('早八');
      if (name.includes('咖啡') || emoji.includes('☕')) cues.push('咖啡');
      if (name.includes('倒数下班') || name.includes('下班') || emoji.includes('🎵')) cues.push('下班');
      if (name.includes('十秒') || emoji.includes('💨')) cues.push('十秒');
      if (name.includes('午觉') || emoji.includes('😪')) cues.push('午觉');
      if (name.includes('凌晨') || emoji.includes('🌑')) cues.push('深夜');
      if (name.includes('饮茶') || emoji.includes('🍵')) cues.push('饮茶');
      if (name.includes('断网') || emoji.includes('📡')) cues.push('断网');
      if (name.includes('制作人') || emoji.includes('🩷')) cues.push('操心');
      if (name.includes('脆皮') || emoji.includes('🩹')) cues.push('虚弱');
      if (name.includes('奇点') || emoji.includes('⚫')) cues.push('奇点');
      if (name.includes('欧皇') || emoji.includes('🌈') || emoji.includes('👑')) cues.push('欧');
      if (name.includes('验牌') || emoji.includes('🃏')) cues.push('验牌');
      if (name.includes('牛马') || emoji.includes('🐴')) cues.push('牛马');
      if (name.includes('功德') || emoji.includes('🪵')) cues.push('功德');
      if (name.includes('贤者') || emoji.includes('🪷')) cues.push('贤者');
      if (name.includes('祛魅') || emoji.includes('🕊')) cues.push('祛魅');
      if (name.includes('圣光') || emoji.includes('✨') || name.includes('圣')) cues.push('圣光');
      if (name.includes('黑气') || emoji.includes('🖤')) cues.push('黑气');
      if (name.includes('华强') || emoji.includes('🍉')) cues.push('买瓜');
      if (name.includes('高雅') || emoji.includes('🐧')) cues.push('高雅');
      if (streakDays >= 7 && p?.rarity === 'legendary') cues.push('连击');
      return cues;
    };

    const pickCue = (cues) => {
      const name = String(poop?.name ?? '');
      const id = String(poop?.id ?? '');
      if (id.includes('numb') || name.includes('麻')) return '麻';
      if (id.includes('tiny') || name.includes('问号')) return '问号';
      if (id.includes('long_wait') || name.includes('等待')) return '等待';
      if (sec >= 900) return '麻';
      if (cues.length > 0) return utils.randomPick(cues);
      return null;
    };

    const rarityHint = (rarity) => {
      if (rarity === 'common') return utils.randomPick(['挺踏实的。', '看着很日常。', '属于稳定发挥。']);
      if (rarity === 'rare') return utils.randomPick(['有点小惊喜。', '今天略带戏。', '感觉比平时更有梗。']);
      if (rarity === 'epic') return utils.randomPick(['画风突然变了。', '气场不一般。', '这坨一看就不简单。']);
      if (rarity === 'legendary') return utils.randomPick(['像中了大奖。', '今天手气离谱。', '这一坨带着金光。']);
      if (rarity === 'mystery') return utils.randomPick(['完全不按套路。', '像突然掉了个彩蛋。', '离谱但又很合理。']);
      return '';
    };

    const cueStory = (cue) => {
      const n = String(poop?.name ?? '这坨');
      const pace = paceBySec(sec);
      const flavor = shapeFlavor(poop?.shape);
      if (cue === '麻') {
        return utils.randomPick([
          `你今天${pace}，${n}落地时${flavor}，先别急着起身。`,
          `${n}一出现就带点“坐久了”的味道，${flavor}，腿记得缓一缓。`,
          `这回${pace}到让人发怵，${n}${flavor}，请给膝盖一点时间。`,
        ]);
      }
      if (cue === '问号') {
        return utils.randomPick([
          `${n}小得像个标点，${flavor}，你甚至会怀疑它是不是在反问你。`,
          `你以为结束了，结果掉下来的是${n}——${flavor}，像留了个问号。`,
          `${n}${flavor}，存在感不大，但很会制造“你确定吗？”的氛围。`,
        ]);
      }
      if (cue === '等待') {
        return utils.randomPick([
          `这次${pace}得很有耐心，最后等来的${n}${flavor}，像把铺垫都交代完了。`,
          `${n}${flavor}，它像“等到自己想出来”的那种结果，慢但不白等。`,
          `漫长的铺垫，换来${n}${flavor}的落地声，仪式感拉满。`,
        ]);
      }
      if (cue === '玉米') {
        return utils.randomPick([
          `${n}身上点着几颗小黄点，${flavor}，像把上一顿的碎片留作证据。`,
          `${n}${flavor}，还顺便夹带了“明天见”的小彩蛋。`,
          `你一低头就懂了：${n}${flavor}，粗纤维这回没白吃。`,
        ]);
      }
      if (cue === '气泡') {
        return utils.randomPick([
          `${n}${flavor}，边成型边冒小泡，像偷偷打了个嗝。`,
          `${n}落地时${flavor}，那点气泡感让它看起来格外轻佻。`,
          `${n}${flavor}，你几乎能听见它“噗”地一声。`,
        ]);
      }
      if (cue === '雪糕') {
        return utils.randomPick([
          `${n}${flavor}，更像“融化中的形状”，看着就很松弛。`,
          `${n}落地时${flavor}，甜品气质借来一点点，但别太当真。`,
          `${n}${flavor}，站不住是正常的，它就是走这个路线。`,
        ]);
      }
      if (cue === '悲伤') {
        return utils.randomPick([
          `${n}${flavor}，情绪有点低落，先给自己一点温柔。`,
          `这回${pace}，${n}${flavor}，看起来像在等一句“没事”。`,
          `${n}${flavor}，今天就别为难肚子了，清淡点会更舒服。`,
        ]);
      }
      if (cue === '晕') {
        return utils.randomPick([
          `${n}${flavor}，自带眩晕感，建议慢一点看它。`,
          `${n}落地后还在晃，${flavor}，像刚下过山车。`,
          `${n}${flavor}，别被它的旋转特效带节奏。`,
        ]);
      }
      if (cue === '惊讶') {
        return utils.randomPick([
          `${n}${flavor}，表情比你还惊讶，仿佛它也没想到自己会这样落地。`,
          `${n}一落地就睁大眼，${flavor}，像在问“我怎么就出来了？”`,
          `${n}${flavor}，别问它怎么来的，它自己也没想明白。`,
        ]);
      }
      if (cue === '咖啡') {
        return utils.randomPick([
          `${n}${flavor}，咖啡因的后劲写在它的节奏里，今天少来两杯吧。`,
          `这回${pace}，${n}${flavor}，像被美式催出来的一样干脆。`,
          `${n}${flavor}，精神过载的气息很明显。`,
        ]);
      }
      if (cue === '十秒') {
        return utils.randomPick([
          `太快了，${n}${flavor}，你甚至还没反应过来它就完成了落地。`,
          `这回${pace}，${n}${flavor}，主打一个不拖泥带水。`,
          `${n}${flavor}，这速度像开了冲刺技能。`,
        ]);
      }
      if (cue === '深夜') {
        return utils.randomPick([
          `深夜的安静里，${n}${flavor}，像把一天的疲惫悄悄放下。`,
          `${n}${flavor}，夜里的屏幕光仿佛还留在它的轮廓上。`,
          `${n}${flavor}，像凌晨的秘密，只给自己看。`,
        ]);
      }
      if (cue === '下班') {
        return utils.randomPick([
          `${n}${flavor}，像一声倒计时：再坚持一下就解放。`,
          `下班前的那股劲被它带出来了，${n}${flavor}，很会踩点。`,
          `${n}${flavor}，它看起来就是“马上结束这一切”的证明。`,
        ]);
      }
      if (cue === '功德') {
        return utils.randomPick([
          `${n}${flavor}，落地得很克制，像一声轻轻的“功德+1”。`,
          `${n}${flavor}，今天这一下有点修行味。`,
          `${n}${flavor}，来都来了，放下吧。`,
        ]);
      }
      if (cue === '欧') {
        return utils.randomPick([
          `${n}${flavor}，一眼看过去就觉得今天手气不错。`,
          `你这回${pace}，结果掉了个${n}${flavor}，像突然捡到刮刮乐。`,
          `${n}${flavor}，好运这种东西，有时候真的说来就来。`,
        ]);
      }
      if (cue === '连击') {
        return utils.randomPick([
          `坚持带来的惯性还在，${n}${flavor}，像给你的连击盖了个章。`,
          `连击攒到这里，掉下来的${n}${flavor}，仪式感很足。`,
          `你一路坚持到现在，${n}${flavor}，像奖章一样沉。`,
        ]);
      }
      return utils.randomPick([
        `你今天${pace}，结果掉下来的${poop?.name ?? '它'}${flavor}，挺有性格。`,
        `${poop?.name ?? '它'}${flavor}，跟你今天的状态莫名很配。`,
        `这一回${pace}，${poop?.name ?? '它'}${flavor}，氛围拿捏得刚刚好。`,
      ]);
    };

    const cues = poop ? cuesFromPoop(poop) : [];
    const cue = pickCue(cues);
    const main = cueStory(cue);

    const isRainy = config.isRainyWeather(weatherCode);
    const isNightBonus = bonuses.some((b) => String(b).includes('深夜加成'));
    const rainFits = isRainy && (poop?.shape === 'liquid' || poop?.shape === 'mushy' || cue === '悲伤' || cue === '晕');
    const nightFits = isNightBonus && cue !== '深夜';
    const streakFits = streakDays >= 7 && poop?.rarity === 'legendary' && cue !== '连击';

    const addons = [];
    if (rainFits && Math.random() < 0.7) addons.push(utils.randomPick(['雨天的潮气让它的质感更明显。', '湿度一上来，今天的表现也更有“水感”。']));
    if (nightFits && Math.random() < 0.5) addons.push(utils.randomPick(['深夜加成一叠，连掉落都更有戏。', '夜色一加成，剧情就容易走偏。']));
    if (streakFits && Math.random() < 0.5) addons.push(utils.randomPick(['连击攒起来了，运气也会跟着抬头。', '坚持这种事，最后总会以某种方式回礼。']));
    if (poop?.rarity && Math.random() < 0.25) addons.push(rarityHint(poop.rarity));

    const out = [main, ...addons].filter(Boolean);
    if (out.length <= 1) return out[0] ?? '';
    if (out.length === 2) return out.join('');
    return out.slice(0, 3).join('');
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
    const note = buildNote(drop, getWeatherCode());
    const weatherCode = getWeatherCode();
    const weatherItem = WEATHER_LIST.find((w) => w.code === weatherCode);
    const weatherLabel = weatherItem ? weatherItem.label : '未知';
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
