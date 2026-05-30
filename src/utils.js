export function pad2(n) {
  return String(n).padStart(2, '0');
}

export function ymd(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function hm(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export function todayYMD() {
  return ymd(new Date());
}

export function yesterdayYMD() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return ymd(d);
}

export function fmtMMSS(sec) {
  return (
    String(Math.floor(sec / 60)).padStart(2, '0') +
    ':' +
    String(sec % 60).padStart(2, '0')
  );
}

export function fmtDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}分${String(s).padStart(2, '0')}秒`;
}

export function randomPick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function normalizeProb(p) {
  const keys = Object.keys(p);
  for (const k of keys) p[k] = Math.max(0, p[k]);
  const sum = keys.reduce((a, k) => a + p[k], 0);
  const out = {};
  if (sum <= 0) return out;
  for (const k of keys) out[k] = p[k] / sum;
  return out;
}

export function rollRarity(prob) {
  const r = Math.random();
  let acc = 0;
  for (const [k, v] of Object.entries(prob)) {
    acc += v;
    if (r <= acc) return k;
  }
  return Object.keys(prob)[0] ?? 'common';
}
