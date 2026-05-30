export function createSettings({ storage, STORAGE_KEYS }) {
  const VOLUME_KEY = 'shiji_volume';
  const MUSIC_KEY = 'shiji_music';

  const defaults = { volume: 70, music: 'musicA' };

  const getVolume = () => {
    const v = storage.get(VOLUME_KEY, defaults.volume);
    return Math.max(0, Math.min(100, Number(v) || defaults.volume));
  };

  const setVolume = (v) => {
    const val = Math.max(0, Math.min(100, Number(v) || defaults.volume));
    storage.set(VOLUME_KEY, val);
    return val;
  };

  const getMusic = () => {
    const m = storage.get(MUSIC_KEY, defaults.music);
    return ['musicA', 'musicB', 'musicC'].includes(m) ? m : defaults.music;
  };

  const setMusic = (m) => {
    const val = ['musicA', 'musicB', 'musicC'].includes(m) ? m : defaults.music;
    storage.set(MUSIC_KEY, val);
    return val;
  };

  const open = () => {
    const overlay = document.getElementById('settings-overlay');
    if (!overlay) return;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    const overlay = document.getElementById('settings-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  };

  const init = () => {
    const closeBtn = document.getElementById('settings-close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    const slider = document.getElementById('volume-slider');
    const icon = document.getElementById('volume-icon');
    const select = document.getElementById('music-select');

    if (slider) {
      slider.value = getVolume();
      if (icon) icon.textContent = Number(slider.value) > 0 ? '🔊' : '🔇';
      slider.addEventListener('input', () => {
        const v = Number(slider.value);
        setVolume(v);
        if (icon) icon.textContent = v > 0 ? '🔊' : '🔇';
      });
    }

    if (select) {
      select.value = getMusic();
      select.addEventListener('change', () => {
        setMusic(select.value);
      });
    }

    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) settingsBtn.addEventListener('click', open);
  };

  return { init, open, close, getVolume, setVolume, getMusic, setMusic };
}
