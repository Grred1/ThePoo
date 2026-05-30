export function createTabs({ onEnterAtlas, onEnterRecords } = {}) {
  const views = ['view-home', 'view-atlas', 'view-records', 'view-me'];

  const switchTab = (n) => {
    for (let i = 0; i < 4; i++) {
      const tab = document.getElementById('tab-' + i);
      if (tab) tab.classList.toggle('active', i === n);
    }
    views.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', idx === n);
    });
    if (n === 1 && onEnterAtlas) onEnterAtlas();
    if (n === 2 && onEnterRecords) onEnterRecords();
  };

  return { switchTab };
}
