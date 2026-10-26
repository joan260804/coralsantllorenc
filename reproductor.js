/* ============================================================
   Reproductor de audios · Coral Sant Llorenç
   Muestra todos los audios de una carpeta del repositorio de GitHub
   con el estilo de las notas de voz de WhatsApp.

   Uso en Google Sites (Insertar > Insertar código):
     <div class="coral-audios" data-carpeta="NOMBRE_DE_LA_CARPETA"></div>
     <script src="https://joan260804.github.io/coralsantllorenc/reproductor.js"></script>
   ============================================================ */
(function () {
  const USUARIO = 'joan260804';
  const REPO = 'coralsantllorenc';
  const RAMA = 'main';
  const MINUTOS_CACHE = 10;

  const BASE = 'https://' + USUARIO + '.github.io/' + REPO + '/';
  const API = 'https://api.github.com/repos/' + USUARIO + '/' + REPO + '/contents/';
  const AVATAR = 'data:image/jpeg;base64,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';
  const PLAY = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg>';
  const PAUSA = '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
  const MIC = '<svg viewBox="0 0 24 24"><path fill="#53bdeb" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1a7 7 0 0 0 6-6.9z"/></svg>';
  const BARRAS = 34;
  const todos = [];

  /* ---------- estilos ---------- */
  const css = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; width: 100%; }
  .coral-audios { display: flex; flex-direction: column; gap: 10px; padding: 4px 6px 8px;
    font-family: "Lato", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  .wa { position: relative; width: 100%; max-width: 420px; margin: 0 auto; background: #d9fdd3;
    border-radius: 10px; padding: 7px 10px 6px 8px; box-shadow: 0 1px 1.5px rgba(11,20,26,.18); }
  .wa-nombre { color: #10306f; font-weight: 700; font-size: clamp(17px, 5vw, 26px); line-height: 1.25; margin: 0 0 4px 4px; }
  .wa-fila { display: flex; align-items: center; gap: 8px; }
  .wa-play { flex: none; width: 34px; height: 34px; border: 0; padding: 0; border-radius: 50%;
    background: transparent; color: #54656f; cursor: pointer; display: grid; place-items: center; }
  .wa-play svg { width: 26px; height: 26px; fill: currentColor; }
  .wa-play:focus-visible, .wa-onda:focus-visible { outline: 2px solid #1a73e8; }
  .wa-centro { flex: 1; min-width: 0; }
  .wa-onda { position: relative; height: 30px; display: flex; align-items: center; gap: 2px; cursor: pointer; touch-action: none; }
  .wa-onda i { flex: 1; min-width: 2px; border-radius: 2px; background: #a8b7ad; }
  .wa-onda i.on { background: #4a5b52; }
  .wa-punto { position: absolute; top: 50%; width: 13px; height: 13px; margin: -6.5px 0 0 -6.5px;
    border-radius: 50%; background: #1a73e8; left: 0; pointer-events: none; }
  .wa-pie { display: flex; justify-content: space-between; font-size: 11.5px; color: #667781; margin-top: 1px; }
  .wa-vel { border: 0; background: rgba(0,0,0,.07); color: #3b4a54; font: 700 11px system-ui, sans-serif;
    border-radius: 9px; padding: 1px 7px; cursor: pointer; }
  .wa-avatar { flex: none; position: relative; width: 46px; height: 46px; }
  .wa-avatar img { width: 46px; height: 46px; border-radius: 50%; display: block; }
  .wa-avatar svg { position: absolute; left: -5px; bottom: -1px; width: 18px; height: 18px; }
  .wa-error { font-size: 12px; color: #b3261e; margin: 4px 0 0 4px; }
  .coral-aviso { text-align: center; color: #667781; font: 14px system-ui, sans-serif; padding: 12px; }
  @media (max-width: 360px) {
    .wa { padding: 6px 8px 5px 6px; } .wa-fila { gap: 6px; }
    .wa-avatar, .wa-avatar img { width: 38px; height: 38px; } .wa-play { width: 30px; height: 30px; }
  }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- un solo audio a la vez en toda la página ---------- */
  const MI_ID = Math.random().toString(36).slice(2);
  function avisarATodos(w) {
    try {
      for (let i = 0; i < w.frames.length; i++) {
        const f = w.frames[i];
        try { f.postMessage({ tipo: 'coral-audio-play', origen: MI_ID }, '*'); } catch (e) {}
        avisarATodos(f);
      }
    } catch (e) {}
  }
  function pararOtros() {
    try { window.top.postMessage({ tipo: 'coral-audio-play', origen: MI_ID }, '*'); } catch (e) {}
    avisarATodos(window.top);
  }
  window.addEventListener('message', e => {
    if (e.data && e.data.tipo === 'coral-audio-play' && e.data.origen !== MI_ID) todos.forEach(a => a.pause());
  });

  /* ---------- utilidades ---------- */
  const mmss = t => { if (!isFinite(t)) return '0:00'; t = Math.floor(t); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); };
  const ruta = p => p.split('/').map(encodeURIComponent).join('/');
  // "01 - Sweet Dreams (Solista).mp3" -> "Sweet Dreams (Solista)"
  const tituloDe = nombre => nombre.replace(/\.[^.]+$/, '').replace(/^\d+\s*[-._)]?\s*/, '').trim();

  function alturas(semilla) {
    let h = 0; for (const c of semilla) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const r = () => (h = (h * 1664525 + 1013904223) >>> 0) / 4294967296;
    return Array.from({ length: BARRAS }, (_, i) => {
      const env = 0.55 + 0.45 * Math.sin(Math.PI * (i + 1) / (BARRAS + 1));
      return Math.round((5 + r() * 21) * env);
    });
  }

  function crear(a) {
    const el = document.createElement('div');
    el.className = 'wa';
    el.innerHTML = `
      <p class="wa-nombre"></p>
      <div class="wa-fila">
        <button class="wa-play" type="button" aria-label="Reproducir">${PLAY}</button>
        <div class="wa-centro">
          <div class="wa-onda" role="slider" aria-label="Posición del audio" tabindex="0">
            ${alturas(a.url).map(h => `<i style="height:${h}px"></i>`).join('')}
            <span class="wa-punto"></span>
          </div>
          <div class="wa-pie"><span class="wa-t">0:00</span><button class="wa-vel" type="button" hidden>1×</button></div>
        </div>
        <div class="wa-avatar"><img alt="" src="${AVATAR}">${MIC}</div>
      </div>`;
    el.querySelector('.wa-nombre').textContent = a.titulo;

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = a.url;

    const btn = el.querySelector('.wa-play'), onda = el.querySelector('.wa-onda'),
          punto = el.querySelector('.wa-punto'), tiempo = el.querySelector('.wa-t'),
          vel = el.querySelector('.wa-vel'), barras = [...onda.querySelectorAll('i')];

    function pintar() {
      const p = audio.duration ? audio.currentTime / audio.duration : 0;
      punto.style.left = (p * 100) + '%';
      const n = Math.round(p * BARRAS);
      barras.forEach((b, i) => b.classList.toggle('on', i < n));
      tiempo.textContent = (audio.currentTime > 0 && !audio.ended) ? mmss(audio.currentTime) : mmss(audio.duration);
      onda.setAttribute('aria-valuenow', Math.round(p * 100));
    }

    btn.addEventListener('click', () => {
      if (audio.paused) {
        todos.forEach(o => { if (o !== audio) o.pause(); });
        audio.play().catch(() => mostrarError());
      } else audio.pause();
    });
    audio.addEventListener('play', () => { pararOtros(); btn.innerHTML = PAUSA; btn.setAttribute('aria-label', 'Pausar'); vel.hidden = false; });
    audio.addEventListener('pause', () => { btn.innerHTML = PLAY; btn.setAttribute('aria-label', 'Reproducir'); });
    audio.addEventListener('ended', () => { audio.currentTime = 0; pintar(); });
    audio.addEventListener('timeupdate', pintar);
    audio.addEventListener('loadedmetadata', pintar);
    audio.addEventListener('error', () => mostrarError());

    function saltar(ev) {
      if (!audio.duration) return;
      const r = onda.getBoundingClientRect();
      const x = Math.min(Math.max((ev.clientX - r.left) / r.width, 0), 1);
      audio.currentTime = x * audio.duration; pintar();
    }
    onda.addEventListener('pointerdown', ev => { onda.setPointerCapture(ev.pointerId); saltar(ev); });
    onda.addEventListener('pointermove', ev => { if (onda.hasPointerCapture(ev.pointerId)) saltar(ev); });
    onda.addEventListener('keydown', ev => {
      if (ev.key === 'ArrowRight') audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0);
      if (ev.key === 'ArrowLeft') audio.currentTime = Math.max(audio.currentTime - 5, 0);
    });

    const velocidades = [1, 1.5, 2];
    vel.addEventListener('click', () => {
      const i = (velocidades.indexOf(audio.playbackRate) + 1) % velocidades.length;
      audio.playbackRate = velocidades[i]; vel.textContent = velocidades[i] + '×';
    });

    let avisado = false;
    function mostrarError() {
      if (avisado) return; avisado = true;
      const p = document.createElement('p'); p.className = 'wa-error';
      p.textContent = 'No se puede reproducir este audio.';
      el.appendChild(p);
    }

    todos.push(audio);
    return el;
  }

  /* ---------- lista de audios de la carpeta (con copia guardada unos minutos) ---------- */
  async function listar(carpeta) {
    const clave = 'coral-audios:' + carpeta;
    let guardado = null;
    try { guardado = JSON.parse(localStorage.getItem(clave)); } catch (e) {}
    if (guardado && Date.now() - guardado.t < MINUTOS_CACHE * 60000) return guardado.audios;
    try {
      const r = await fetch(API + ruta(carpeta) + '?ref=' + RAMA, { headers: { Accept: 'application/vnd.github+json' } });
      if (!r.ok) throw new Error(r.status === 404 ? 'No existe la carpeta "' + carpeta + '" en GitHub.' : 'GitHub no responde (' + r.status + ').');
      const datos = await r.json();
      const audios = datos
        .filter(f => f.type === 'file' && /\.(mp3|m4a|aac|ogg|wav)$/i.test(f.name))
        .sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }))
        .map(f => ({ titulo: tituloDe(f.name), url: BASE + ruta(f.path) }));
      try { localStorage.setItem(clave, JSON.stringify({ t: Date.now(), audios })); } catch (e) {}
      return audios;
    } catch (err) {
      if (guardado) return guardado.audios;   // si GitHub falla, usamos la última lista conocida
      throw err;
    }
  }

  async function iniciar(caja) {
    const carpeta = (caja.dataset.carpeta || '').trim();
    if (!carpeta) { caja.innerHTML = '<p class="coral-aviso">Falta indicar la carpeta (data-carpeta).</p>'; return; }
    caja.innerHTML = '<p class="coral-aviso">Cargando audios…</p>';
    try {
      const audios = await listar(carpeta);
      caja.innerHTML = '';
      if (!audios.length) { caja.innerHTML = '<p class="coral-aviso">Todavía no hay audios en esta carpeta.</p>'; return; }
      audios.forEach(a => caja.appendChild(crear(a)));
    } catch (err) {
      caja.innerHTML = '';
      const p = document.createElement('p'); p.className = 'coral-aviso'; p.textContent = err.message;
      caja.appendChild(p);
    }
  }

  document.querySelectorAll('.coral-audios').forEach(iniciar);
})();
