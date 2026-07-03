/*
 * Ambient 3D particle field.
 * A slow, deep drift of brand-coloured points behind interior heroes,
 * with gentle auto-rotation and a touch of scroll parallax so the page
 * opens with real depth rather than a flat gradient. Shares three.js
 * with the organ sequence. Lazy-loaded, WebGL-gated, reduced-motion safe.
 */
import * as THREE from 'three';

const PALETTE = ['#7e97e0', '#6f8bdd', '#9fb2ec', '#3d5da8', '#e87c8a'];

export function initAmbientField(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch { return; }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
  camera.position.z = 5;

  const mobile = window.innerWidth < 768;
  const N = mobile ? 800 : 1900;

  const positions = new Float32Array(N * 3);
  const colours = new Float32Array(N * 3);
  const drift = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    // soft ellipsoid volume, denser toward the centre
    const r = Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 4.2;
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 2.6;
    positions[i * 3 + 2] = r * Math.cos(phi) * 2.4 - 0.4;
    const c = new THREE.Color(PALETTE[(Math.random() * (Math.random() < 0.12 ? PALETTE.length : PALETTE.length - 1)) | 0]);
    colours[i * 3] = c.r; colours[i * 3 + 1] = c.g; colours[i * 3 + 2] = c.b;
    drift[i] = Math.random() * Math.PI * 2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colours, 3));

  // Soft round sprite
  const sc = document.createElement('canvas');
  sc.width = sc.height = 64;
  const sctx = sc.getContext('2d');
  const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.8)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  sctx.fillStyle = g;
  sctx.fillRect(0, 0, 64, 64);

  const material = new THREE.PointsMaterial({
    size: mobile ? 0.038 : 0.046,
    map: new THREE.CanvasTexture(sc),
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const cloud = new THREE.Points(geo, material);
  scene.add(cloud);

  const stage = canvas.parentElement;
  function resize() {
    const cw = stage.clientWidth, ch = stage.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  const base = geo.attributes.position.array;
  const timer = new THREE.Timer();
  let running = false, raf = 0;
  function frame() {
    timer.update();
    const t = timer.getElapsed();
    const pos = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      pos[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.3 + drift[i]) * 0.06;
      pos[i * 3] = base[i * 3] + Math.cos(t * 0.22 + drift[i]) * 0.05;
    }
    geo.attributes.position.needsUpdate = true;
    cloud.rotation.y = t * 0.04;
    cloud.rotation.x = Math.sin(t * 0.15) * 0.08;
    // gentle parallax as the hero scrolls out of view
    cloud.position.y = Math.min(scrollY, 900) * 0.0008;
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
    else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }, { rootMargin: '120px' });
  io.observe(canvas);
}
