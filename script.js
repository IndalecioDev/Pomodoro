/* ══════════════════════════════════════════════════════
   MODOS DE LECTURA
   Cada modo tiene: nombre, color RGB, ID de YouTube e icono SVG
══════════════════════════════════════════════════════ */
const MODES = {
  chill: {
    name: "Chill",
    c: [110, 231, 183],
    yt: "QWL5vrp1Hgo",
    svg: `<svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2C11 9 9.39 12.17 9 12.5A6.14 6.14 0 0 1 9 11C8 6 17 8 17 8Z"/></svg>`
  },
  misterio: {
    name: "Misterio",
    c: [167, 139, 250],
    yt: "_58D6roBk1g",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>`
  },
  terror: {
    name: "Terror",
    c: [248, 113, 113],
    yt: "dcwB95o3UdA",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5zm-1 3v4h2V8h-2zm0 6v2h2v-2h-2z"/></svg>`
  },
  sad: {
    name: "Lluvia",
    c: [125, 211, 252],
    yt: "VUL8PQETF0A",
    svg: `<svg viewBox="0 0 24 24"><path d="M6 19v1h2v-1l-1-4-1 4zm4 2v1h2v-1l-1-4-1 4zm4-2v1h2v-1l-1-4-1 4zM17.5 7A5.5 5.5 0 0 0 12 2a5.5 5.5 0 0 0-5.47 5.02A4 4 0 0 0 3 11a4 4 0 0 0 4 4h10a4 4 0 0 0 0-8z"/></svg>`
  },
  celtica: {
    name: "Fantasía",
    c: [251, 191, 36],
    yt: "DhAJBJnIPr8",
    svg: `<svg viewBox="0 0 24 24"><path d="m12 1-3 6H3l5 4-2 6 6-4 6 4-2-6 5-4h-6z"/></svg>`
  },
  jazz: {
    name: "Jazz",
    c: [251, 146, 60],
    yt: "MYPVQccHhAQ",
    svg: `<svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6zm-2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>`
  },
  hoguera: {
    name: "Hoguera",
    c: [249, 115, 22],
    yt: "lGphuanCRDk",
    svg: `<svg viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-3.31 0-6-2.69-6-6 0-1.53.57-3.05 1.58-4.2.87 2.09 2.83 3.47 5.17 3.47 1.8 0 3.29-.72 4.39-1.94C17.42 12.66 18 13.8 18 14c0 3.31-2.69 6-6 6z"/></svg>`
  },
  anime: {
    name: "Anime",
    c: [244, 114, 182],
    yt: "oCV-C8_VFdk",
    svg: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>`
  }
};

/* ══════════════════════════════════════════════════════
   INYECTAR TARJETAS DE MODO EN EL DOM
══════════════════════════════════════════════════════ */
const grid = document.getElementById('mode-grid');
Object.entries(MODES).forEach(([key, m], i) => {
  const [r, g, b] = m.c;
  const lbl = document.createElement('label');
  lbl.className = 'mode-card';
  lbl.innerHTML = `
    <input type="radio" name="reading-mode" value="${key}" ${i === 0 ? 'checked' : ''}>
    <div class="mode-body" style="--cr:${r};--cg:${g};--cb:${b}">
      <div class="mode-icon">${m.svg}</div>
      <span class="mlabel">${m.name}</span>
    </div>`;
  grid.appendChild(lbl);
});

/* ══════════════════════════════════════════════════════
   TICK MARKS DEL RELOJ SVG
══════════════════════════════════════════════════════ */
const tg = document.getElementById('ticks');
for (let i = 0; i < 60; i++) {
  const a = (i / 60) * 2 * Math.PI - Math.PI / 2;
  const major = i % 5 === 0;
  const len = major ? 7 : 4;
  const r1 = 83, r2 = r1 - len;
  const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ln.setAttribute('x1', 100 + r1 * Math.cos(a));
  ln.setAttribute('y1', 100 + r1 * Math.sin(a));
  ln.setAttribute('x2', 100 + r2 * Math.cos(a));
  ln.setAttribute('y2', 100 + r2 * Math.sin(a));
  ln.setAttribute('stroke', major ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.06)');
  ln.setAttribute('stroke-width', major ? '1.5' : '1');
  ln.setAttribute('stroke-linecap', 'round');
  tg.appendChild(ln);
}

/* ══════════════════════════════════════════════════════
   TEMA DE COLOR DINÁMICO
   Cambia el acento de toda la UI según el modo elegido
══════════════════════════════════════════════════════ */
function applyTheme(key) {
  const m = MODES[key];
  if (!m) return;
  const [r, g, b] = m.c;
  document.documentElement.style.setProperty('--mr', r);
  document.documentElement.style.setProperty('--mg', g);
  document.documentElement.style.setProperty('--mb', b);
  document.getElementById('eyebrow').textContent = `modo ${m.name.toLowerCase()}`;
}

/* ══════════════════════════════════════════════════════
   REFERENCIAS DOM
══════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const minutesInput = $('minutes');
const timeDisplay  = $('time-display');
const statusText   = $('status-text');
const btnStart     = $('btn-start');
const btnPause     = $('btn-pause');
const btnReset     = $('btn-reset');
const mdot         = $('mdot');
const musicText    = $('music-text');
const waves        = $('waves');
const vidWrapper   = $('video-wrapper');
const vidTitle     = $('video-title');
const ringProg     = $('ring-prog');
const flash        = $('flash');

/* ══════════════════════════════════════════════════════
   ESTADO DEL TIMER
══════════════════════════════════════════════════════ */
const CIRC = 2 * Math.PI * 85; // circunferencia del anillo (r=85)
let totalSec   = 0;
let remainSec  = 0;
let timerId    = null;
let isRunning  = false;
let hasMedia   = false;
let activeKey  = null;

/* ══════════════════════════════════════════════════════
   UTILIDADES
══════════════════════════════════════════════════════ */
const fmt = s =>
  String(Math.floor(s / 60)).padStart(2, '0') + ':' +
  String(s % 60).padStart(2, '0');

function updateRing(rem, tot) {
  ringProg.style.strokeDashoffset = tot > 0 ? CIRC * (1 - rem / tot) : 0;
}

function setMusic(msg, active) {
  musicText.textContent = msg;
  mdot.className   = 'mdot'   + (active ? ' on' : '');
  waves.className  = 'wave-bars' + (active ? ' on' : '');
}

function getMode() {
  return document.querySelector('input[name="reading-mode"]:checked')?.value ?? null;
}

/* ══════════════════════════════════════════════════════
   YOUTUBE IFRAME API
   Se carga de forma asíncrona; si el usuario pulsa
   Empezar antes de que la API esté lista, el videoId
   queda en pendingVideo y se lanza en cuanto carga.
══════════════════════════════════════════════════════ */
let ytPlayer     = null;
let ytReady      = false;
let pendingVideo = null;

const ytScript   = document.createElement('script');
ytScript.src     = 'https://www.youtube.com/iframe_api';
document.head.appendChild(ytScript);

window.onYouTubeIframeAPIReady = function () {
  ytReady = true;
  if (pendingVideo) {
    _doLaunch(pendingVideo);
    pendingVideo = null;
  }
};

function _doLaunch(videoId) {
  vidWrapper.hidden = false;
  if (ytPlayer) {
    ytPlayer.loadVideoById(videoId);
  } else {
    ytPlayer = new YT.Player('yt-player', {
      videoId,
      playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
      events: { onReady: e => e.target.playVideo() }
    });
  }
}

function launchVideo(key) {
  const m = MODES[key];
  if (!m) return;
  vidTitle.textContent = `Ambientación · ${m.name}`;
  hasMedia  = true;
  activeKey = key;
  setMusic(`Modo ${m.name} ambientando tu lectura`, true);
  if (ytReady) _doLaunch(m.yt);
  else pendingVideo = m.yt;
}

function stopVideo() {
  try { if (ytPlayer) ytPlayer.stopVideo(); } catch (e) {}
  vidWrapper.hidden = true;
  hasMedia  = false;
  activeKey = null;
}

/* ══════════════════════════════════════════════════════
   RESET COMPLETO — timer + video + estado
══════════════════════════════════════════════════════ */
function fullReset() {
  clearInterval(timerId);
  timerId   = null;
  isRunning = false;
  const m   = parseInt(minutesInput.value, 10) || 25;
  totalSec  = m * 60;
  remainSec = totalSec;
  timeDisplay.textContent  = fmt(remainSec);
  updateRing(remainSec, totalSec);
  statusText.textContent   = 'Listo para una nueva sesión';
  minutesInput.disabled    = false;
  stopVideo();
  const k = getMode();
  setMusic(k ? `Modo ${MODES[k].name} listo · pulsa empezar` : 'Elige un modo', false);
}

/* ══════════════════════════════════════════════════════
   TIMER — Empezar / Pausa / Reiniciar
══════════════════════════════════════════════════════ */
function startTimer() {
  if (isRunning) return;
  const mins = parseInt(minutesInput.value, 10);
  if (!mins || mins <= 0) { alert('Introduce un número válido.'); return; }
  const key = getMode();
  if (!key) { alert('Elige un tipo de lectura.'); return; }

  if (remainSec <= 0) { totalSec = mins * 60; remainSec = totalSec; }

  launchVideo(key); // abre el video automáticamente

  isRunning = true;
  minutesInput.disabled   = true;
  statusText.textContent  = 'Lectura en marcha · mantén el enfoque';

  timerId = setInterval(() => {
    remainSec--;
    timeDisplay.textContent = fmt(remainSec);
    updateRing(remainSec, totalSec);

    if (remainSec <= 0) {
      clearInterval(timerId);
      timerId   = null;
      isRunning = false;
      statusText.textContent = '¡Sesión completada! Respira y celebra';
      minutesInput.disabled  = false;
      stopVideo(); // cierra el video al terminar
      setMusic('Sesión completada · ambientación detenida', false);
      triggerFlash();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timerId);
  timerId   = null;
  isRunning = false;
  minutesInput.disabled  = false;
  statusText.textContent = 'Temporizador en pausa';
  if (activeKey) setMusic(`Modo ${MODES[activeKey].name} · en pausa`, true);
}

function triggerFlash() {
  flash.className = 'flash';
  void flash.offsetWidth; // fuerza reflow para reiniciar animación
  flash.className = 'flash go';
  setTimeout(() => flash.className = 'flash', 2300);
}

/* ══════════════════════════════════════════════════════
   EVENTOS
══════════════════════════════════════════════════════ */
btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);
btnReset.addEventListener('click', fullReset);

minutesInput.addEventListener('change', () => {
  if (!isRunning) {
    const m = parseInt(minutesInput.value, 10);
    if (m > 0) {
      totalSec  = m * 60;
      remainSec = totalSec;
      timeDisplay.textContent = fmt(remainSec);
      updateRing(remainSec, totalSec);
    }
  }
});

// Cambio de género → reinicia todo
document.querySelectorAll('input[name="reading-mode"]').forEach(inp => {
  inp.addEventListener('change', () => {
    applyTheme(inp.value);
    fullReset();
    setMusic(`Modo ${MODES[inp.value].name} listo · pulsa empezar`, false);
  });
});

/* ══════════════════════════════════════════════════════
   INICIALIZACIÓN
══════════════════════════════════════════════════════ */
const initKey = getMode();
applyTheme(initKey);
totalSec  = parseInt(minutesInput.value, 10) * 60;
remainSec = totalSec;
timeDisplay.textContent = fmt(remainSec);
updateRing(remainSec, totalSec);
if (initKey) setMusic(`Modo ${MODES[initKey].name} listo · pulsa empezar`, false);

/* ══════════════════════════════════════════════════════
   PARTÍCULAS DE BRASA — canvas animado
══════════════════════════════════════════════════════ */
const cvs = document.getElementById('pcvs');
const ctx  = cvs.getContext('2d');

function resize() {
  cvs.width  = innerWidth;
  cvs.height = innerHeight;
}
resize();
addEventListener('resize', resize);

const rnd = (a, b) => a + Math.random() * (b - a);

function mkP() {
  return {
    x:     rnd(0, cvs.width),
    y:     rnd(cvs.height * 0.25, cvs.height),
    vx:    rnd(-0.2, 0.2),
    vy:    rnd(-0.4, -1.2),
    r:     rnd(0.7, 2.2),
    life:  Math.random(),
    decay: rnd(0.002, 0.007)
  };
}

const PTS = Array.from({ length: 60 }, mkP);

function getRGB() {
  const s = getComputedStyle(document.documentElement);
  return [
    +s.getPropertyValue('--mr') || 224,
    +s.getPropertyValue('--mg') || 85,
    +s.getPropertyValue('--mb') || 85
  ];
}

(function loop() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  const [r, g, b] = getRGB();
  const t = Date.now();
  for (const p of PTS) {
    p.x    += p.vx + Math.sin(t * 0.0007 + p.y * 0.012) * 0.12;
    p.y    += p.vy;
    p.life -= p.decay;
    if (p.life <= 0 || p.y < -8) Object.assign(p, mkP());
    ctx.save();
    ctx.globalAlpha  = p.life * 0.5;
    ctx.fillStyle    = `rgb(${r},${g},${b})`;
    ctx.shadowColor  = `rgb(${r},${g},${b})`;
    ctx.shadowBlur   = 9;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  requestAnimationFrame(loop);
})();
