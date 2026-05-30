export function createDrop({
  utils,
  config,
  data,
  banner,
  atlas,
  records,
  showToast,
  refreshStats,
  getRarityConfig,
}) {
  const S = {
    status: 'idle',
    start: null,
    elapsed: 0,
    interval: null,
    teaseKey: null,
    fifteenShown: false,
    pendingDrop: null,
  };

  const teaseByElapsed = (sec) => {
    if (sec < 60) return { key: 't0', html: '还在热身呢？' };
    if (sec < 180) return { key: 't1', html: '进入状态了，好样的' };
    if (sec < 480) return { key: 't2', html: '标准健康如厕，继续保持！' };
    if (sec < 900) return { key: 't3', html: '有点久了，腿还好吗？' };
    return { key: 't4', html: '腿麻了吧……<br>感觉得了' };
  };

  const playSceneDropOnce = () => {
    const el = document.getElementById('scene-box-drop');
    if (!el) return;
    el.classList.remove('play');
    void el.offsetWidth;
    el.classList.add('play');
    setTimeout(() => el.classList.remove('play'), 3050);
  };

  const updateRunningTease = (sec) => {
    const t = teaseByElapsed(sec);
    if (S.teaseKey !== t.key) {
      S.teaseKey = t.key;
      const bubble = document.getElementById('speech-bubble');
      if (bubble) bubble.innerHTML = t.html;
    }
    if (!S.fifteenShown && sec >= 900) {
      S.fifteenShown = true;
      playSceneDropOnce();
    }
  };

  const pointsGainByDuration = (sec) => {
    if (sec < 60) return 0;
    if (sec < 180) return 10;
    if (sec < 480) return 15;
    if (sec < 900) return 5;
    return 0;
  };

  const pickByRarity = (rarity) => {
    const list = data.POOP_DATABASE.filter((p) => p.rarity === rarity);
    if (list.length > 0) return utils.randomPick(list);
    return utils.randomPick(data.POOP_DATABASE);
  };

  const calcDrop = (sec) => {
    const now = new Date();
    const weather = banner.getWeatherCode();
    const streakDays = banner.getStreakDays();
    const tier = config.getTier(streakDays);
    const luckyPoints = banner.getLuckyPoints();
    const bonuses = [];

    if (sec < 60) {
      bonuses.push('⚡ 1分钟内强制神秘');
      const poop = data.findPoop('tiny_mystery') ?? pickByRarity('mystery');
      return { poop, pointsGain: 0, luckyAfter: luckyPoints, streakDays, settleAt: now, bonuses, durationSec: sec };
    }
    if (sec > 900) {
      bonuses.push('⚡ 15分钟以上强制神秘');
      const poop = data.findPoop('numb_legs') ?? pickByRarity('mystery');
      return { poop, pointsGain: 0, luckyAfter: luckyPoints, streakDays, settleAt: now, bonuses, durationSec: sec };
    }

    if (luckyPoints >= tier.cap) {
      bonuses.push(`🎯 积分池保底（${tier.label}）`);
      banner.setLuckyPoints(0);
      const poop = pickByRarity(tier.pityRarity);
      return { poop, pointsGain: 0, luckyAfter: 0, streakDays, settleAt: now, bonuses, durationSec: sec };
    }

    const pointsGain = pointsGainByDuration(sec);
    const luckyAfter = luckyPoints + pointsGain;
    banner.setLuckyPoints(luckyAfter);

    const base = { common: 70, rare: 20, epic: 8, legendary: 2 };
    if (config.isNightBonus(now)) {
      base.epic += 1.5;
      base.legendary += 0.5;
      base.common -= 2.0;
      bonuses.push('🌙 深夜加成 +1.5% / +0.5%');
    }
    if (config.isRainyWeather(weather)) {
      base.rare += 1.0;
      base.common -= 1.0;
      bonuses.push('🌧 雨天加成 +1%');
    }
    const legBonus = Math.min(30, streakDays * 5);
    if (legBonus > 0) {
      base.legendary += legBonus;
      base.common -= legBonus;
      bonuses.push(`🔥 连击加成：传说+${legBonus}%`);
    }

    const prob = utils.normalizeProb(base);
    const rarity = utils.rollRarity(prob);
    const poop = pickByRarity(rarity);
    return { poop, pointsGain, luckyAfter, streakDays, settleAt: now, bonuses, durationSec: sec };
  };

  const applyRarityToResultCard = (rarity) => {
    const el = document.getElementById('result-card');
    if (!el) return;
    el.classList.remove('rarity-common', 'rarity-rare', 'rarity-epic', 'rarity-legendary', 'rarity-mystery');
    el.classList.add('rarity-' + rarity);
  };

  const showEndOverlay = () => {
    const overlay = document.getElementById('drop-overlay');
    const box = document.getElementById('mystery-box');
    const poopEl = document.getElementById('drop-poop');
    const stage = document.getElementById('drop-stage');
    const card = document.getElementById('result-card');
    const poopImg = document.getElementById('drop-poop-img');

    if (!overlay || !box || !poopEl || !stage || !card) return;

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    card.classList.remove('show');

    box.className = 'mystery-box';
    poopEl.className = 'drop-poop';
    if (S.pendingDrop?.poop?.image && poopImg) {
      poopImg.src = S.pendingDrop.poop.image;
      poopImg.alt = S.pendingDrop.poop.name;
    }

    stage.querySelectorAll('.particle').forEach((p) => p.remove());

    box.classList.add('shake1');
    setTimeout(() => {
      box.classList.remove('shake1');
      box.classList.add('shake2');
    }, 500);

    setTimeout(() => {
      box.classList.remove('shake2');
      box.classList.add('burst');
      const count = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const colors = ['#F5CC60', '#6DBF9E', '#E8758C', '#C49A6C', '#B8E4CC', '#EAD5F5'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
        const dist = 70 + Math.random() * 55;
        const dx = Math.round(Math.cos(angle) * dist);
        const dy = Math.round(Math.sin(angle) * dist);
        p.style.setProperty('--dx', dx + 'px');
        p.style.setProperty('--dy', dy + 'px');
        stage.appendChild(p);
        requestAnimationFrame(() => p.classList.add('play'));
      }
    }, 1500);

    setTimeout(() => {
      poopEl.classList.add('play');
    }, 2000);

    setTimeout(() => {
      finalizeAndShowCard();
    }, 3000);
  };

  const hideEndOverlay = () => {
    const overlay = document.getElementById('drop-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  };

  const finalizeAndShowCard = () => {
    const item = S.pendingDrop;
    if (!item) return;

    banner.updateStreakOnRecord({ todayYMD: utils.todayYMD, yesterdayYMD: utils.yesterdayYMD });
    records.saveDropRecord(item, { todayYMD: utils.todayYMD, hm: utils.hm });

    const collection = atlas.getCollection();
    if (!collection.includes(item.poop.id)) {
      collection.unshift(item.poop.id);
      atlas.setCollection(collection);
    }

    applyRarityToResultCard(item.poop.rarity);
    const resultPoopImg = document.getElementById('result-poop-img');
    if (resultPoopImg) {
      resultPoopImg.src = item.poop.image;
      resultPoopImg.alt = item.poop.name;
    }
    const name = document.getElementById('result-name');
    if (name) name.textContent = item.poop.name;
    const rarity = document.getElementById('result-rarity');
    if (rarity) rarity.textContent = '✨ ' + getRarityConfig(item.poop).label;
    const duration = document.getElementById('result-duration');
    if (duration) duration.textContent = utils.fmtDuration(item.durationSec);
    const time = document.getElementById('result-time');
    if (time) time.textContent = utils.hm(item.settleAt);
    const bonus = document.getElementById('result-bonus');
    if (bonus) bonus.textContent = item.bonuses.length > 0 ? item.bonuses.join(' · ') : '无';

    const card = document.getElementById('result-card');
    if (card) card.classList.add('show');

    refreshStats();
  };

  const handleStart = () => {
    if (S.status === 'running') return;
    S.status = 'running';
    S.start = Date.now();
    S.elapsed = 0;
    S.teaseKey = null;
    S.fifteenShown = false;
    S.pendingDrop = null;

    const timer = document.getElementById('timer-display');
    if (timer) timer.textContent = '00:00';
    const btnStart = document.getElementById('btn-start');
    const btnEnd = document.getElementById('btn-end');
    if (btnStart) btnStart.disabled = true;
    if (btnEnd) btnEnd.disabled = false;

    const scene = document.getElementById('scene');
    if (scene) scene.classList.add('running');
    const bubble = document.getElementById('speech-bubble');
    if (bubble) bubble.innerHTML = '还在热身呢？';

    hideEndOverlay();

    S.interval = setInterval(() => {
      S.elapsed = Math.floor((Date.now() - S.start) / 1000);
      const t = document.getElementById('timer-display');
      if (t) t.textContent = utils.fmtMMSS(S.elapsed);
      updateRunningTease(S.elapsed);
    }, 500);
  };

  const handleEnd = () => {
    if (S.status !== 'running') return;
    if (S.interval) clearInterval(S.interval);
    S.status = 'done';
    S.elapsed = Math.floor((Date.now() - S.start) / 1000);

    const timer = document.getElementById('timer-display');
    if (timer) timer.textContent = utils.fmtMMSS(S.elapsed);
    const btnStart = document.getElementById('btn-start');
    const btnEnd = document.getElementById('btn-end');
    if (btnEnd) btnEnd.disabled = true;
    if (btnStart) btnStart.disabled = false;

    const scene = document.getElementById('scene');
    if (scene) scene.classList.remove('running');
    const bubble = document.getElementById('speech-bubble');
    if (bubble) bubble.innerHTML = '结束结算中…';

    const drop = calcDrop(S.elapsed);
    S.pendingDrop = drop;
    const img = document.getElementById('drop-poop-img');
    if (img) {
      img.src = drop.poop.image;
      img.alt = drop.poop.name;
    }
    showEndOverlay();
  };

  const handleAgain = () => {
    hideEndOverlay();
    const bubble = document.getElementById('speech-bubble');
    if (bubble) bubble.innerHTML = '点击开始<br>计时吧！';
    S.status = 'idle';
    S.pendingDrop = null;
  };

  const handleViewNote = () => {
    const item = S.pendingDrop;
    if (!item) {
      showToast('还没有掉落结果');
      return;
    }
    showToast(records.buildNote(item.durationSec, banner.getWeatherCode()));
  };

  const handleAddToAtlas = () => {
    const item = S.pendingDrop;
    if (!item) {
      showToast('还没有掉落结果');
      return;
    }
    const collection = atlas.getCollection();
    const btn = document.getElementById('btn-add-atlas');
    const origin = btn ? btn.textContent : '';
    if (!collection.includes(item.poop.id)) {
      collection.unshift(item.poop.id);
      atlas.setCollection(collection);
      showToast('已收入图鉴：' + item.poop.name);
      if (btn) btn.textContent = '已收入 ✅';
    } else {
      showToast('已在图鉴中：' + item.poop.name);
      if (btn) btn.textContent = '已在图鉴 ✅';
    }
    if (btn) {
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = origin || '收入图鉴 📖';
      }, 1400);
    }
  };

  return {
    handleStart,
    handleEnd,
    handleAgain,
    handleViewNote,
    handleAddToAtlas,
    hideEndOverlay,
    getPendingDrop: () => S.pendingDrop,
  };
}
