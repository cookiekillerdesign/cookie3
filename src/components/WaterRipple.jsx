import { useCallback, useEffect, useRef, useState } from 'react';
import { shade } from '../lib/format';

/* ---------- deterministic PRNG (same family as GenerativeArt) ---------- */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h;
}
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(hex, a) { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; }

/* ---------- placeholder art (baked once per project, used as the ripple's color texture) ---------- */
const TEX_W = 480, TEX_H = 360;

function paintPattern(canvas, seed, hue, label) {
  const w = canvas.width, h = canvas.height;
  const ctx = canvas.getContext('2d');
  const rand = mulberry32(hashSeed(String(seed)));
  const light = shade(hue);

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#0F0F13');
  g.addColorStop(1, rgba(hue, .9));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.filter = `blur(${Math.round(w * .11)}px)`;
  for (let i = 0; i < 4; i++) {
    const bx = rand() * w, by = rand() * h, br = (.24 + rand() * .3) * w;
    ctx.fillStyle = i % 2 ? rgba(light, .55) : rgba(hue, .5);
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
  }
  ctx.filter = 'none';

  ctx.save();
  ctx.globalAlpha = .85;
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = 'rgba(241,240,236,.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, (i / 5) * h);
    ctx.lineTo(w, (i / 5) * h - w * .18);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = .12;
  ctx.fillStyle = '#F1F0EC';
  ctx.font = `900 ${Math.round(h * .58)}px 'Nunito Sans',sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(label, w / 2, h / 2 + h * .04);
  ctx.restore();
}

/* ---------- GL plumbing ---------- */
const VERT = `attribute vec2 p;varying vec2 uv;void main(){uv=p*0.5+0.5;gl_Position=vec4(p,0.,1.);}`;

const SIM_FRAG = `precision highp float;varying vec2 uv;
uniform sampler2D uCurr,uPrev;uniform vec2 texel;uniform float damping;
uniform vec3 splat;uniform float splatRadius;
float decode(vec4 t){return (t.r-0.5)*2.0;}
void main(){
  float up=decode(texture2D(uCurr,uv+vec2(0.,texel.y)));
  float down=decode(texture2D(uCurr,uv-vec2(0.,texel.y)));
  float left=decode(texture2D(uCurr,uv-vec2(texel.x,0.)));
  float right=decode(texture2D(uCurr,uv+vec2(texel.x,0.)));
  float old=decode(texture2D(uPrev,uv));
  float hgt=(up+down+left+right)*0.5-old;
  hgt*=damping;
  float d=distance(uv,splat.xy);
  hgt=clamp(hgt+smoothstep(splatRadius,0.0,d)*splat.z,-1.0,1.0);
  float enc=clamp(hgt*0.5+0.5,0.0,1.0);
  gl_FragColor=vec4(enc,enc,enc,1.0);
}`;

const DISPLAY_FRAG = `precision highp float;varying vec2 uv;
uniform sampler2D uHeight,uColor;uniform vec2 texel;uniform float strength;
float decode(vec4 t){return (t.r-0.5)*2.0;}
void main(){
  float hl=decode(texture2D(uHeight,uv-vec2(texel.x,0.)));
  float hr=decode(texture2D(uHeight,uv+vec2(texel.x,0.)));
  float hu=decode(texture2D(uHeight,uv+vec2(0.,texel.y)));
  float hd=decode(texture2D(uHeight,uv-vec2(0.,texel.y)));
  vec2 grad=vec2(hr-hl,hu-hd);
  vec2 duv=clamp(uv+grad*strength,vec2(.01),vec2(.99));
  vec3 base=texture2D(uColor,duv).rgb;
  float spec=clamp((grad.x-grad.y)*2.4,0.0,1.0);
  float shd=clamp(1.0-(grad.x+grad.y)*1.5,.72,1.3);
  base=base*shd+spec*.4;
  gl_FragColor=vec4(base,1.0);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
  return s;
}
function link(gl, vsSrc, fsSrc) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc), fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}
function makeSimTarget(gl, w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(w * h * 4).fill(128));
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { tex, fbo };
}

const SIM_W = 128, SIM_H = 96;

export default function WaterRipple({ seed, hue, initials, className = '' }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const patternRef = useRef(null);
  const [bgUrl, setBgUrl] = useState('');
  const [active, setActive] = useState(false);
  const glRef = useRef(null);
  const rafRef = useRef(0);
  const inViewRef = useRef(true);
  const pointerRef = useRef({ x: .5, y: .5, px: .5, py: .5, has: false });
  const decayRef = useRef(0);

  useEffect(() => {
    const off = document.createElement('canvas');
    off.width = TEX_W; off.height = TEX_H;
    paintPattern(off, seed, hue, initials);
    patternRef.current = off;
    setBgUrl(off.toDataURL('image/jpeg', .86));
  }, [seed, hue, initials]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { inViewRef.current = e.isIntersecting; }, { threshold: .01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const destroyGL = useCallback(() => {
    const state = glRef.current;
    if (!state) return;
    const { gl } = state;
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    glRef.current = null;
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(decayRef.current);
    destroyGL();
  }, [destroyGL]);

  const ensureGL = useCallback(() => {
    if (glRef.current) return glRef.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
    const canvas = canvasRef.current;
    if (!canvas || !patternRef.current) return null;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: false })
      || canvas.getContext('experimental-webgl');
    if (!gl) return null;

    const simProg = link(gl, VERT, SIM_FRAG), dispProg = link(gl, VERT, DISPLAY_FRAG);
    if (!simProg || !dispProg) return null;

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const colorTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, colorTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, patternRef.current);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    const order = [makeSimTarget(gl, SIM_W, SIM_H), makeSimTarget(gl, SIM_W, SIM_H), makeSimTarget(gl, SIM_W, SIM_H)];

    const simLoc = {
      p: gl.getAttribLocation(simProg, 'p'),
      uCurr: gl.getUniformLocation(simProg, 'uCurr'),
      uPrev: gl.getUniformLocation(simProg, 'uPrev'),
      texel: gl.getUniformLocation(simProg, 'texel'),
      damping: gl.getUniformLocation(simProg, 'damping'),
      splat: gl.getUniformLocation(simProg, 'splat'),
      splatRadius: gl.getUniformLocation(simProg, 'splatRadius'),
    };
    const dispLoc = {
      p: gl.getAttribLocation(dispProg, 'p'),
      uHeight: gl.getUniformLocation(dispProg, 'uHeight'),
      uColor: gl.getUniformLocation(dispProg, 'uColor'),
      texel: gl.getUniformLocation(dispProg, 'texel'),
      strength: gl.getUniformLocation(dispProg, 'strength'),
    };

    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); glRef.current = null; setActive(false); }, { once: true });

    const state = { gl, quad, simProg, dispProg, simLoc, dispLoc, colorTex, order, dpr: Math.min(devicePixelRatio || 1, 1.75) };
    glRef.current = state;
    return state;
  }, []);

  const stepAndRender = useCallback((state, splat) => {
    const { gl, quad, simProg, dispProg, simLoc, dispLoc, colorTex } = state;
    let order = state.order;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * state.dpr)), h = Math.max(1, Math.round(rect.height * state.dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }

    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.useProgram(simProg);
    gl.enableVertexAttribArray(simLoc.p);
    gl.vertexAttribPointer(simLoc.p, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(simLoc.texel, 1 / SIM_W, 1 / SIM_H);
    gl.uniform1f(simLoc.damping, .985);
    gl.uniform1f(simLoc.splatRadius, .05);

    const SUBSTEPS = 2;
    for (let i = 0; i < SUBSTEPS; i++) {
      const curr = order[0], prev = order[1], out = order[2];
      gl.viewport(0, 0, SIM_W, SIM_H);
      gl.bindFramebuffer(gl.FRAMEBUFFER, out.fbo);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, curr.tex); gl.uniform1i(simLoc.uCurr, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, prev.tex); gl.uniform1i(simLoc.uPrev, 1);
      if (splat && i === 0) gl.uniform3f(simLoc.splat, splat.x, splat.y, splat.z);
      else gl.uniform3f(simLoc.splat, -1, -1, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      order = [out, curr, prev];
    }
    state.order = order;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(dispProg);
    gl.enableVertexAttribArray(dispLoc.p);
    gl.vertexAttribPointer(dispLoc.p, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, order[0].tex); gl.uniform1i(dispLoc.uHeight, 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, colorTex); gl.uniform1i(dispLoc.uColor, 1);
    gl.uniform2f(dispLoc.texel, 1 / SIM_W, 1 / SIM_H);
    gl.uniform1f(dispLoc.strength, .1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  const loop = useCallback(() => {
    const state = glRef.current;
    if (!state || !inViewRef.current) { rafRef.current = 0; return; }
    const p = pointerRef.current;
    let splat = null;
    if (p.has) {
      const dx = p.x - p.px, dy = p.y - p.py;
      const speed = Math.min(1, Math.hypot(dx, dy) * 16);
      if (speed > .0015) splat = { x: p.x, y: 1 - p.y, z: .25 + speed * .85 };
      p.px = p.x; p.py = p.y;
    }
    stepAndRender(state, splat);
    rafRef.current = requestAnimationFrame(loop);
  }, [stepAndRender]);

  const start = useCallback(() => {
    const state = ensureGL();
    if (!state) return;
    setActive(true);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
  }, [ensureGL, loop]);

  const scheduleStop = useCallback(() => {
    clearTimeout(decayRef.current);
    decayRef.current = setTimeout(() => {
      setActive(false);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }, 1400);
  }, []);

  const trackPointer = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    pointerRef.current.x = (e.clientX - r.left) / r.width;
    pointerRef.current.y = (e.clientY - r.top) / r.height;
  };
  const onPointerEnter = (e) => {
    trackPointer(e);
    const p = pointerRef.current;
    p.px = p.x - .015; p.py = p.y - .015; p.has = true;
    clearTimeout(decayRef.current);
    start();
  };
  const onPointerMove = (e) => { trackPointer(e); pointerRef.current.has = true; clearTimeout(decayRef.current); start(); };
  const onPointerLeave = () => { pointerRef.current.has = false; scheduleStop(); };

  return (
    <span
      ref={wrapRef}
      className={`ripple ${className}`}
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <canvas ref={canvasRef} className={`ripple-gl${active ? ' show' : ''}`} aria-hidden="true" />
    </span>
  );
}
