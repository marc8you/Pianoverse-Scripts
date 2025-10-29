// ==UserScript==
// @name         Pianoverse-fireplace
// @namespace    https://homexskillet.com
// @version      1.0.0
// @description  Inject a full-bleed background video under the scene on pianoverse.net
// @match        https://pianoverse.net/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==


(()=>{let d=document,src="https://homexskillet.com/s/CF92V?direct=1",wId="___bg_vid_under_scene",cId="___bg_vid_scene_css",re=/(absolute|relative|fixed|sticky)/,q=s=>d.querySelector(s),p=q('pv-piano,[class*="piano"],[data-role="piano"],[id*="piano"]'),c=q('pv-chat,[class*="chat"],[data-role="chat"],[id*="chat"]'),l=(a,b)=>{if(!(a||b))return d.body;if(!a)return b.parentElement||d.body;if(!b)return a.parentElement||d.body;let S=new Set;for(let n=a;n;n=n.parentElement)S.add(n);for(let n=b;n;n=n.parentElement)if(S.has(n))return n;return d.body},s=l(p,c);[wId,cId].forEach(id=>d.getElementById(id)?.remove());re.test(getComputedStyle(s).position)||(s.style.position="relative");let st=d.createElement("style");st.id=cId;let sel=s.id?"#"+s.id:s.className?"."+s.className.trim().replace(/\s+/g,"."):"body";st.innerHTML=`${sel}{background:transparent!important}`;d.head.appendChild(st);let w=d.createElement("div");w.id=wId;w.style.cssText="position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden";s.prepend(w);let v=d.createElement("video");v.src=src;v.muted=!0;v.autoplay=!0;v.loop=!0;v.playsInline=!0;v.controls=!1;v.setAttribute("muted","");v.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;pointer-events:none";w.appendChild(v);let lift=(e,z=3)=>{if(!e)return;let g=getComputedStyle(e);re.test(g.position)||(e.style.position="relative");(+g.zIndex||0)<z&&(e.style.zIndex=z)};[p,c].forEach(e=>lift(e,2));'header,[role="banner"],[class*="header"],[class*="topbar"],[class*="toolbar"],[class*="nav"],[class*="logo"],[class*="brand"],[class*="room"],[class*="title"],[class*="participants"],[class*="people"],[class*="volume"],[aria-label*="volume" i],[role="slider"],[aria-label*="settings" i],[class*="settings"]'.split(",").forEach(s=>d.querySelectorAll(s).forEach(el=>lift(el,3)));})()

//init commit
