import { POOP_DATABASE, findPoop, getRarityConfig, TOTAL_POOP_COUNT } from './poopDatabase.js';
import * as utils from './utils.js';
import * as config from './config.js';
import { createStorage } from './storage.js';
import { createToast } from './toast.js';
import { createBanner } from './banner.js';
import { createRecords } from './records.js';
import { createAtlas } from './atlas.js';
import { createDrop } from './drop.js';
import { createTabs } from './tabs.js';
import { createDraw } from './draw.js';
import { createPoster } from './poster.js';
import { createSettings } from './settings.js';

try {
  const storage = createStorage();
  const toast = createToast(document.getElementById('toast'));
  const banner = createBanner({ storage, showToast: toast.showToast });
  const records = createRecords({
    storage,
    utils,
    config,
    getRarityConfig,
    getWeatherCode: banner.getWeatherCode,
  });

  const atlas = createAtlas({
    storage,
    utils,
    data: { POOP_DATABASE, findPoop, TOTAL_POOP_COUNT },
    getRarityConfig,
    getRecords: records.getRecords,
  });

  const refreshStats = () => {
    const today = utils.todayYMD();
    const all = records.getRecords();
    const todayRecs = all.filter((r) => r.date === today);
    const count = todayRecs.length;
    const todayCount = document.getElementById('today-count');
    if (todayCount) todayCount.textContent = String(count);

    const yd = utils.yesterdayYMD();
    const yCount = all.filter((r) => r.date === yd).length;
    const diff = count - yCount;
    const cSub = document.getElementById('count-compare');
    if (cSub) {
      if (yCount > 0) {
        cSub.textContent = (diff >= 0 ? '比昨天 +' : '比昨天 ') + diff;
        cSub.className = 'card-sub ' + (diff >= 0 ? 'up' : 'down');
      } else {
        cSub.textContent = count > 0 ? `今日第${count}次` : '今天还没开始';
        cSub.className = 'card-sub';
      }
    }

    const avgDisplay = document.getElementById('avg-display');
    const avgCompare = document.getElementById('avg-compare');
    if (todayRecs.length > 0) {
      const avg = Math.round(todayRecs.reduce((a, r) => a + r.durationSec, 0) / todayRecs.length);
      if (avgDisplay) avgDisplay.textContent = utils.fmtMMSS(avg);
      if (avgCompare) {
        if (yCount > 0) {
          const yAvg = Math.round(all.filter((r) => r.date === yd).reduce((a, r) => a + r.durationSec, 0) / yCount);
          const adiff = avg - yAvg;
          avgCompare.textContent = '比昨天 ' + (adiff >= 0 ? '+' : '') + utils.fmtMMSS(Math.abs(adiff));
          avgCompare.className = 'card-sub ' + (adiff <= 0 ? 'up' : 'down');
        } else {
          avgCompare.textContent = '今日平均';
          avgCompare.className = 'card-sub';
        }
      }
    } else {
      if (avgDisplay) avgDisplay.textContent = '--:--';
      if (avgCompare) {
        avgCompare.textContent = '暂无记录';
        avgCompare.className = 'card-sub';
      }
    }

    const boxCount = document.getElementById('box-count');
    if (boxCount) boxCount.textContent = String(new Set(atlas.getCollection()).size);

    const encourage = document.getElementById('encourage-text');
    if (encourage) encourage.textContent = config.ENCOURAGES[count % config.ENCOURAGES.length];

    banner.renderBanner();
    atlas.renderAtlas();
    records.renderRecords();
    records.renderCalendar();
  };

  const drop = createDrop({
    utils,
    config,
    data: { POOP_DATABASE, findPoop },
    banner,
    atlas,
    records,
    showToast: toast.showToast,
    refreshStats,
    getRarityConfig,
  });

  const tabs = createTabs({
    onEnterAtlas: atlas.renderAtlas,
    onEnterRecords: () => {
      records.renderCalendar();
      records.renderRecords();
    },
  });

  const draw = createDraw({
    showToast: toast.showToast,
  });
  draw.init();

  const poster = createPoster({
    getRecords: records.getRecords,
    getStreakDays: banner.getStreakDays,
    showToast: toast.showToast,
  });
  window.handlePosterSave = poster.handlePosterSave;
  window.handlePosterClose = poster.handlePosterClose;
  document.getElementById('btn-summary')?.addEventListener('click', () => poster.handleSummary());

  const settings = createSettings({ storage });
  settings.init();

  banner.ensureStreakOnLoad({ todayYMD: utils.todayYMD, yesterdayYMD: utils.yesterdayYMD });
  banner.renderBanner();
  refreshStats();

  window.handleStart = drop.handleStart;
  window.handleEnd = drop.handleEnd;
  window.handleAgain = drop.handleAgain;
  window.handleViewNote = drop.handleViewNote;
  window.handleAddToAtlas = drop.handleAddToAtlas;
  window.switchTab = tabs.switchTab;
  window.showToast = toast.showToast;
  window.cycleWeather = banner.cycleWeather;
  window.showStreakTip = () => banner.showStreakTip({ getRarityConfig });
  window.setAtlasFilter = atlas.setAtlasFilter;
  window.closeAtlasModal = atlas.closeAtlasModal;
} catch (e) {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;
      min-height:100vh;padding:24px;text-align:center;
      font-size:1.1rem;color:#c00;flex-direction:column;gap:12px;">
      <div style="font-size:3rem">💩</div>
      哎呀，出错了，请刷新试试吧~<br>
      <small style="color:#999;font-size:.8rem">${e.message}</small>
    </div>`;
}
