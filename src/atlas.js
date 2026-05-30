import { STORAGE_KEYS } from './storage.js';

export function createAtlas({ storage, utils, data, getRarityConfig, getRecords }) {
  let atlasFilter = 'all';

  const getCollection = () => storage.get(STORAGE_KEYS.collection, []);
  const setCollection = (v) => storage.set(STORAGE_KEYS.collection, v);

  const findFirstCollectTS = (poopId) => {
    const records = getRecords();
    const found = records.filter((r) => r.poopId === poopId).sort((a, b) => a.ts - b.ts)[0];
    return found ? found.ts : null;
  };

  const closeAtlasModal = () => {
    const overlay = document.getElementById('atlas-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  };

  const openAtlasModal = (poopId) => {
    const poop = data.findPoop(poopId);
    if (!poop) return;
    const title = document.getElementById('modal-title');
    const img = document.getElementById('modal-img');
    const rarity = document.getElementById('modal-rarity');
    const desc = document.getElementById('modal-desc');
    const trigger = document.getElementById('modal-trigger');
    const time = document.getElementById('modal-time');

    if (title) title.textContent = poop.name;
    if (img) {
      img.src = poop.image;
      img.alt = poop.name;
    }
    if (rarity) rarity.textContent = getRarityConfig(poop).label;
    if (desc) desc.textContent = poop.desc ?? '—';
    if (trigger) trigger.textContent = poop.trigger ?? '—';
    const ts = findFirstCollectTS(poopId);
    if (time) time.textContent = ts ? utils.ymd(new Date(ts)) + ' ' + utils.hm(new Date(ts)) : '—';

    const overlay = document.getElementById('atlas-overlay');
    if (!overlay) return;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
  };

  const renderAtlas = () => {
    const total = document.getElementById('atlas-total');
    const count = document.getElementById('atlas-count');
    const grid = document.getElementById('atlas-grid');
    if (total) total.textContent = String(data.TOTAL_POOP_COUNT);

    const collection = new Set(getCollection());
    if (count) count.textContent = String(collection.size);
    if (!grid) return;

    grid.innerHTML = '';
    const list = atlasFilter === 'all' ? data.POOP_DATABASE : data.POOP_DATABASE.filter((p) => p.rarity === atlasFilter);
    for (const poop of list) {
      const unlocked = collection.has(poop.id);
      const item = document.createElement('div');
      item.className = 'grid-item' + (unlocked ? '' : ' locked');
      const emoji = document.createElement('div');
      emoji.className = 'grid-emoji';
      if (unlocked) {
        const img = document.createElement('img');
        img.className = 'poop-img';
        img.alt = poop.name;
        img.src = poop.image;
        emoji.appendChild(img);
      }
      const name = document.createElement('div');
      name.className = 'grid-name';
      name.textContent = unlocked ? poop.name : '???';
      const tag = document.createElement('div');
      tag.className = 'grid-tag';
      tag.textContent = unlocked ? '✨ ' + getRarityConfig(poop).label : '未解锁';
      item.appendChild(emoji);
      item.appendChild(name);
      item.appendChild(tag);
      if (unlocked) item.addEventListener('click', () => openAtlasModal(poop.id));
      grid.appendChild(item);
    }
  };

  const setAtlasFilter = (filter) => {
    atlasFilter = filter;
    const row = document.getElementById('atlas-filters');
    if (row) {
      Array.from(row.querySelectorAll('.filter-chip')).forEach((btn) => btn.classList.remove('active'));
      const mapping = ['all', 'common', 'rare', 'epic', 'legendary', 'mystery'];
      const idx = mapping.indexOf(filter);
      const btn = row.querySelectorAll('.filter-chip')[idx];
      if (btn) btn.classList.add('active');
    }
    renderAtlas();
  };

  return {
    renderAtlas,
    setAtlasFilter,
    openAtlasModal,
    closeAtlasModal,
    getCollection,
    setCollection,
  };
}
