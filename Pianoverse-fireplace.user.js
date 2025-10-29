// ==UserScript==
// @name         Pianoverse-fireplace
// @namespace    https://homexskillet.com
// @version      1.0.0
// @description  Inject a full-bleed background video under the scene on pianoverse.net
// @match        https://pianoverse.net/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==


(() => {
  const SRC = "https://homexskillet.com/s/CF92V?direct=1";
  const WRAP_ID = "___bg_vid_under_scene";
  const CSS_ID  = "___bg_vid_scene_css";
  for (const id of [WRAP_ID, CSS_ID]) document.getElementById(id)?.remove();

  const q = s => document.querySelector(s);
  const piano = q('pv-piano, [class*="piano"], [data-role="piano"], [id*="piano"]');
  const chat  = q('pv-chat,  [class*="chat"],  [data-role="chat"],  [id*="chat"]');

  const lca = (a,b) => {
    if (!a && !b) return document.body;
    if (!a) return b.parentElement || document.body;
    if (!b) return a.parentElement || document.body;
    const seen = new Set(); for (let n=a; n; n=n.parentElement) seen.add(n);
    for (let n=b; n; n=n.parentElement) if (seen.has(n)) return n;
    return document.body;
  };
  const scene = lca(piano, chat);

  // Make the scene a stacking context and transparent
  const cs = getComputedStyle(scene);
  if (!/absolute|relative|fixed|sticky/.test(cs.position)) scene.style.position = 'relative';
  let st = document.createElement('style'); st.id = CSS_ID;
  const sceneSel = scene.id ? `#${scene.id}` : scene.className ? '.'+scene.className.trim().split(/\s+/).join('.') : 'body';
  st.textContent = `${sceneSel} { background: transparent !important; }`;
  document.head.appendChild(st);

  // Insert the underlay inside the scene
  const wrap = document.createElement('div');
  wrap.id = WRAP_ID;
  Object.assign(wrap.style, {
    position: 'absolute', inset: '0', zIndex: '1',
    pointerEvents: 'none', overflow: 'hidden'
  });
  scene.insertAdjacentElement('afterbegin', wrap);

  const v = document.createElement('video');
  v.src = SRC;
  v.setAttribute('muted',''); v.muted = true; v.autoplay = true;
  v.loop = true; v.playsInline = true; v.controls = false;
  Object.assign(v.style, {
    position: 'absolute', inset: '0', width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none'
  });
  wrap.appendChild(v);

  // Lift helpers
  const lift = (el, z='3') => {
    if (!el) return;
    const s = getComputedStyle(el);
    if (!/absolute|relative|fixed|sticky/.test(s.position)) el.style.position = 'relative';
    if ((parseInt(s.zIndex,10)||0) < +z) el.style.zIndex = String(z);
  };

  // Ensure piano & chat above video
  [piano, chat].forEach(el => lift(el, '2'));

  // Targeted: header/logo/title/participants/volume/settings
  const picks = [
    'header', '[role="banner"]',
    '[class*="header"]', '[class*="topbar"]', '[class*="toolbar"]', '[class*="nav"]',
    '[class*="logo"]', '[class*="brand"]',
    '[class*="room"]', '[class*="title"]', '[class*="participants"]', '[class*="people"]',
    '[class*="volume"]', '[aria-label*="volume" i]', '[role="slider"]',
    '[aria-label*="settings" i]', '[class*="settings"]'
  ];
  picks.forEach(sel => document.querySelectorAll(sel).forEach(el => lift(el, '3')));
})();

//init commit
