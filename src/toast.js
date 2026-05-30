export function createToast(toastEl) {
  let timer = null;

  const showToast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (timer) clearTimeout(timer);
    const ms = msg && msg.length > 26 ? 5200 : 2800;
    timer = setTimeout(() => toastEl.classList.remove('show'), ms);
  };

  return { showToast };
}
