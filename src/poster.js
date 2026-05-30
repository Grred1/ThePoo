export function createPoster({ getRecords, getStreakDays, showToast }) {
  const weekRecords = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const cutoff = sevenDaysAgo.getTime();
    return getRecords().filter((r) => r.ts >= cutoff);
  };

  const mostFrequent = (items) => {
    if (items.length === 0) return { value: '无', count: 0 };
    const freq = {};
    for (const item of items) {
      if (item) freq[item] = (freq[item] || 0) + 1;
    }
    let best = null;
    let bestCount = 0;
    for (const [k, v] of Object.entries(freq)) {
      if (v > bestCount) { best = k; bestCount = v; }
    }
    return { value: best, count: bestCount };
  };

  const calcStats = () => {
    const recs = weekRecords();
    if (recs.length === 0) return null;

    const locations = recs.map((r) => r.location).filter(Boolean);
    const moods = recs.map((r) => r.mood).filter(Boolean);
    const topLocation = mostFrequent(locations);
    const topMood = mostFrequent(moods);

    let totalSec = 0;
    let maxSec = -1;
    let minSec = Infinity;
    let maxDate = '';
    let minDate = '';
    for (const r of recs) {
      totalSec += r.durationSec;
      if (r.durationSec > maxSec) { maxSec = r.durationSec; maxDate = r.date; }
      if (r.durationSec < minSec) { minSec = r.durationSec; minDate = r.date; }
    }

    const avgSec = Math.round(totalSec / recs.length);

    return {
      totalCount: recs.length,
      totalMin: Math.floor(totalSec / 60),
      totalSecRemain: totalSec % 60,
      avgMin: Math.floor(avgSec / 60),
      avgSecRemain: avgSec % 60,
      topLocation: topLocation.value,
      topMood: topMood.value,
      maxSec,
      maxDate: maxDate || '无',
      minSec,
      minDate: minDate || '无',
      streakDays: getStreakDays(),
    };
  };

  const generateCopy = (stats) => {
    const madlibs = [
      `本周打工人的肠道KPI已超标！在${stats.topLocation}拉了${stats.totalCount}次，共计${stats.totalMin}分${stats.totalSecRemain}秒——老板看了都沉默，HR看了想加薪。建议将"带薪拉屎"写入年终总结核心指标。`,
      `本周肠道内卷报告：${stats.totalCount}次如厕，平均${stats.avgMin}分${stats.avgSecRemain}秒/次。在${stats.topLocation}完成了主要产能输出，心情以${stats.topMood}为主。鉴定结果：合格打工人，建议评优。`,
      `数据不会骗人：本周在${stats.topLocation}开的"股东大会"最密集，心情主要是${stats.topMood}。你的肠道用${stats.totalMin}分${stats.totalSecRemain}秒完成了${stats.totalCount}次KPI——这就是传说中的"带薪摸鱼主力军"。`,
      `本周如厕大数据：${stats.totalCount}次，总时长${stats.totalMin}分${stats.totalSecRemain}秒。最久的一天在${stats.maxDate}（${Math.floor(stats.maxSec / 60)}分${stats.maxSec % 60}秒）。你的肠道已经晋升为部门最佳员工。`,
    ];
    return madlibs[Math.floor(Math.random() * madlibs.length)];
  };

  const fmtDateDisplay = (dateStr) => {
    if (!dateStr || dateStr === '无') return '无';
    const parts = dateStr.split('-');
    return `${parseInt(parts[1])}月${parseInt(parts[2])}日`;
  };

  const drawPoster = (stats) => {
    const W = 600;
    const H = 900;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#FEF3DC');
    bgGrad.addColorStop(0.3, '#FFF8E8');
    bgGrad.addColorStop(0.7, '#C8EDDA');
    bgGrad.addColorStop(1, '#EAD5F5');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 12; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = 4 + Math.random() * 12;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(92,58,30,${0.04 + Math.random() * 0.04})`;
      ctx.fill();
    }

    ctx.save();
    ctx.shadowColor = 'rgba(92,58,30,0.12)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#FFFEF8';
    ctx.beginPath();
    roundRect(ctx, 30, 30, W - 60, H - 60, 24);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#5C3A1E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    roundRect(ctx, 30, 30, W - 60, H - 60, 24);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.shadowColor = 'rgba(92,58,30,0.10)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#FEF3DC';
    ctx.beginPath();
    roundRect(ctx, 55, 50, W - 110, 68, 16);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#5C3A1E';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    roundRect(ctx, 55, 50, W - 110, 68, 16);
    ctx.stroke();
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#5C3A1E';
    ctx.font = 'bold 26px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('💩 本周摸鱼报告 💩', W / 2, 84);

    const copy = generateCopy(stats);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#7A5030';
    ctx.font = '700 15px "PingFang SC", "Microsoft YaHei", sans-serif';

    const wrapText = (text, x, y, maxWidth, lineHeight) => {
      const chars = text.split('');
      let line = '';
      let ly = y;
      for (const ch of chars) {
        const test = line + ch;
        if (ctx.measureText(test).width > maxWidth && line.length > 0) {
          ctx.fillText(line, x, ly);
          line = ch;
          ly += lineHeight;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, x, ly);
      return ly + lineHeight;
    };

    const copyEnd = wrapText(copy, 70, 138, W - 140, 22);
    const dividerY = copyEnd + 10;

    ctx.save();
    ctx.strokeStyle = '#C49A6C';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(70, dividerY);
    ctx.lineTo(W - 70, dividerY);
    ctx.stroke();
    ctx.restore();

    const statsItems = [
      { label: '您本周拉屎主要集中在', value: `${stats.topLocation}` },
      { label: '您本周共拉屎', value: `${stats.totalCount} 次` },
      { label: '您本周拉屎的总时长为', value: `${stats.totalMin} 分 ${stats.totalSecRemain} 秒` },
      { label: '您本周拉屎的平均时长为', value: `${stats.avgMin} 分 ${stats.avgSecRemain} 秒` },
      { label: '您本周拉屎的心情主要是', value: `${stats.topMood}` },
      { label: '您本周拉屎最久的一天是', value: `${fmtDateDisplay(stats.maxDate)}（${Math.floor(stats.maxSec / 60)} 分 ${stats.maxSec % 60} 秒）` },
      { label: '您本周拉屎最快的一天是', value: `${fmtDateDisplay(stats.minDate)}（${Math.floor(stats.minSec / 60)} 分 ${stats.minSec % 60} 秒）` },
    ];

    const startY = dividerY + 20;
    const itemH = 44;

    statsItems.forEach((item, idx) => {
      const y = startY + idx * itemH;
      const bgColors = ['#FFFEF8', '#FFF3C0', '#C8EDDA', '#FCE4EC', '#EAD5F5', '#FFF3C0', '#C8EDDA'];
      ctx.fillStyle = bgColors[idx];
      ctx.beginPath();
      roundRect(ctx, 60, y, W - 120, 36, 10);
      ctx.fill();

      ctx.save();
      ctx.strokeStyle = 'rgba(92,58,30,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      roundRect(ctx, 60, y, W - 120, 36, 10);
      ctx.stroke();
      ctx.restore();

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#5C3A1E';
      ctx.font = '700 14px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(item.label, 72, y + 18);

      const valX = 72 + ctx.measureText(item.label).width + 6;
      const tiltAngles = [-0.04, 0.05, -0.03, 0.06, -0.05, 0.04, -0.06];
      const valColors = ['#E8758C', '#6DBF9E', '#F5CC60', '#E8758C', '#4EBF78', '#E8758C', '#6DBF9E'];
      const valSizes = [19, 20, 18, 19, 20, 18, 19];

      ctx.save();
      ctx.translate(valX, y + 18);
      ctx.rotate(tiltAngles[idx]);
      ctx.fillStyle = valColors[idx];
      ctx.font = `bold ${valSizes[idx]}px "PingFang SC", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.value, 0, 0);
      ctx.restore();
    });

    const streakY = startY + statsItems.length * itemH + 16;
    ctx.save();
    ctx.shadowColor = 'rgba(92,58,30,0.10)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#FFF8E8';
    ctx.beginPath();
    roundRect(ctx, 85, streakY, W - 170, 40, 14);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#F5CC60';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    roundRect(ctx, 85, streakY, W - 170, 40, 14);
    ctx.stroke();
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#5C3A1E';
    ctx.font = 'bold 16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`🔥 肠道连续打卡 ${stats.streakDays} 天 🔥`, W / 2, streakY + 20);

    const footerY = H - 65;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#B89060';
    ctx.font = '700 13px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('—— 由「便便日记」生成 ——', W / 2, footerY);

    return canvas;
  };

  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const handleSummary = () => {
    const stats = calcStats();
    if (!stats) {
      showToast('本周还没有记录，快去拉屎吧～');
      return;
    }

    const canvas = drawPoster(stats);
    const container = document.getElementById('poster-container');
    if (!container) return;
    container.innerHTML = '';
    container.appendChild(canvas);

    const overlay = document.getElementById('poster-overlay');
    if (!overlay) return;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
  };

  const handlePosterSave = () => {
    const canvas = document.querySelector('#poster-container canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `便便日记_本周摸鱼报告_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('本周摸鱼报告已保存 💩✨');
  };

  const handlePosterClose = () => {
    const overlay = document.getElementById('poster-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
  };

  return { handleSummary, handlePosterSave, handlePosterClose };
}
