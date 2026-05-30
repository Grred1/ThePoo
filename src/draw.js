export function createDraw({ showToast }) {
  const S = {
    overlay: null,
    canvas: null,
    ctx: null,
    strokes: [],
    currentStroke: null,
    isDrawing: false,
    hasDrawn: false,
  };

  const COLORS = ['#5C3A1E', '#8B5E3C', '#C49A6C', '#F5CC60'];
  let currentColor = COLORS[0];
  let brushSize = 6;

  const getPos = (e) => {
    const rect = S.canvas.getBoundingClientRect();
    const scaleX = S.canvas.width / rect.width;
    const scaleY = S.canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const drawStroke = (ctx, stroke) => {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i++) {
      ctx.lineTo(stroke[i].x, stroke[i].y);
    }
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const redrawAll = () => {
    S.ctx.clearRect(0, 0, S.canvas.width, S.canvas.height);
    for (const stroke of S.strokes) {
      drawStroke(S.ctx, stroke);
    }
  };

  const startDrawing = (e) => {
    e.preventDefault();
    S.isDrawing = true;
    const pos = getPos(e);
    S.currentStroke = { points: [pos], color: currentColor, size: brushSize };
  };

  const draw = (e) => {
    e.preventDefault();
    if (!S.isDrawing || !S.currentStroke) return;
    const pos = getPos(e);
    S.currentStroke.points.push(pos);
    S.ctx.beginPath();
    const pts = S.currentStroke.points;
    S.ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
    S.ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    S.ctx.strokeStyle = currentColor;
    S.ctx.lineWidth = brushSize;
    S.ctx.lineCap = 'round';
    S.ctx.lineJoin = 'round';
    S.ctx.stroke();
    S.hasDrawn = true;
  };

  const endDrawing = (e) => {
    e.preventDefault();
    if (!S.isDrawing) return;
    S.isDrawing = false;
    if (S.currentStroke && S.currentStroke.points.length > 0) {
      S.strokes.push(S.currentStroke);
    }
    S.currentStroke = null;
  };

  const undo = () => {
    if (S.strokes.length === 0) return;
    S.strokes.pop();
    redrawAll();
    if (S.strokes.length === 0) S.hasDrawn = false;
  };

  const save = () => {
    if (!S.hasDrawn) {
      showToast('先画点什么吧~');
      return;
    }
    const link = document.createElement('a');
    link.download = `我的大便不服_${Date.now()}.png`;
    link.href = S.canvas.toDataURL('image/png');
    link.click();
    showToast('大便已保存至本地 💩');
  };

  const open = () => {
    if (!S.overlay) return;
    S.overlay.classList.add('show');
    S.overlay.setAttribute('aria-hidden', 'false');
    S.canvas.width = S.canvas.offsetWidth;
    S.canvas.height = S.canvas.offsetHeight;
    S.ctx = S.canvas.getContext('2d');
    S.ctx.fillStyle = '#FFFEF8';
    S.ctx.fillRect(0, 0, S.canvas.width, S.canvas.height);
    S.strokes = [];
    S.currentStroke = null;
    S.isDrawing = false;
    S.hasDrawn = false;
  };

  const close = () => {
    if (!S.overlay) return;
    S.overlay.classList.remove('show');
    S.overlay.setAttribute('aria-hidden', 'true');
  };

  const init = () => {
    S.overlay = document.getElementById('draw-overlay');
    S.canvas = document.getElementById('draw-canvas');
    if (!S.overlay || !S.canvas) return;

    S.canvas.addEventListener('mousedown', startDrawing);
    S.canvas.addEventListener('mousemove', draw);
    S.canvas.addEventListener('mouseup', endDrawing);
    S.canvas.addEventListener('mouseleave', endDrawing);
    S.canvas.addEventListener('touchstart', startDrawing, { passive: false });
    S.canvas.addEventListener('touchmove', draw, { passive: false });
    S.canvas.addEventListener('touchend', endDrawing, { passive: false });

    document.getElementById('draw-undo')?.addEventListener('click', undo);
    document.getElementById('draw-save')?.addEventListener('click', save);
    document.getElementById('draw-close')?.addEventListener('click', close);

    const colorBtns = document.querySelectorAll('.draw-color-btn');
    colorBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        colorBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentColor = btn.dataset.color;
      });
    });

    const sizeBtns = document.querySelectorAll('.draw-size-btn');
    sizeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        brushSize = Number(btn.dataset.size);
      });
    });

    document.getElementById('btn-draw-poop')?.addEventListener('click', open);
  };

  return { init, open, close };
}
