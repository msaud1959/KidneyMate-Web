/*
 * Organ-to-kidney particle sequence.
 * A stylised cluster of abdominal organs (torso, stomach, liver, bowel,
 * two kidneys) forms in blue particles; as the visitor scrolls, the
 * cloud converges and the brand kidney emerges in red, ureter and all.
 * The kidney silhouette is sampled from the logo's own paths.
 *
 * Loaded lazily, only when [data-organ-scroll] exists, WebGL is
 * available and the visitor has not asked for reduced motion.
 */
import * as THREE from 'three';

const BLUE = { frame: '#7e97e0', stomach: '#5f7fd9', liver: '#3d5da8', bowel: '#8fa5e6', torso: '#41598f' };
const RED = ['#d9455b', '#e87c8a', '#f2b3b9'];

function sampleShape(drawFn, count, w = 640, h = 640) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, w, h);
    drawFn(ctx, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    const pts = [];
    let guard = 0;
    while (pts.length < count && guard < count * 400) {
        guard++;
        const x = Math.random() * w, y = Math.random() * h;
        if (data[((y | 0) * w + (x | 0)) * 4 + 3] > 40) {
            pts.push([(x / w - 0.5) * 2, -(y / h - 0.5) * 2]);
        }
    }
    while (pts.length < count) pts.push(pts[(Math.random() * pts.length) | 0] || [0, 0]);
    return pts;
}

/* The brand kidney, drawn with the same path data as the logo. */
function drawKidney(ctx, w, h) {
    const s = w / 105;
    ctx.save();
    ctx.scale(s, s);
    ctx.translate(4.5, -4); // centre the artwork (bean plus ureter) in frame
    ctx.lineCap = 'round';
    ctx.lineWidth = 13;
    ctx.strokeStyle = '#fff';
    ctx.stroke(new Path2D('M62 30 C 58 22, 46 17, 36 22 C 24 28, 18 42, 19 55 C 20 70, 30 82, 44 83 C 54 83.5, 61 78, 62 70 C 63 64, 61 60, 58 57'));
    ctx.stroke(new Path2D('M63 47 C 72 49, 76 56, 76 64 V 92'));
    ctx.fillStyle = '#fff';
    ctx.fill(new Path2D('M57 42 h9 a4.5 4.5 0 0 1 4.5 4.5 v8 a4.5 4.5 0 0 1 -4.5 4.5 h-9 z'));
    ctx.restore();
}

/* Stylised abdominal cluster: torso outline, stomach, liver, bowel coil, two kidneys. */
const ORGANS = [
    { colour: BLUE.torso, share: 0.22, draw: (ctx, w, h) => {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = w * 0.012;
        ctx.beginPath(); ctx.ellipse(w / 2, h / 2, w * 0.30, h * 0.44, 0, 0, Math.PI * 2); ctx.stroke();
    } },
    { colour: BLUE.stomach, share: 0.18, draw: (ctx, w, h) => {
        ctx.fillStyle = '#fff'; ctx.beginPath();
        ctx.ellipse(w * 0.42, h * 0.30, w * 0.11, h * 0.075, -0.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(w * 0.51, h * 0.38, w * 0.055, h * 0.05, -0.9, 0, Math.PI * 2); ctx.fill();
    } },
    { colour: BLUE.liver, share: 0.20, draw: (ctx, w, h) => {
        ctx.fillStyle = '#fff'; ctx.beginPath();
        ctx.moveTo(w * 0.38, h * 0.20); ctx.quadraticCurveTo(w * 0.72, h * 0.14, w * 0.70, h * 0.30);
        ctx.quadraticCurveTo(w * 0.66, h * 0.40, w * 0.50, h * 0.36); ctx.closePath(); ctx.fill();
    } },
    { colour: BLUE.bowel, share: 0.24, draw: (ctx, w, h) => {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = w * 0.045; ctx.lineCap = 'round';
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const r = w * (0.07 + i * 0.045);
            ctx.moveTo(w * 0.5 + r, h * 0.62);
            ctx.arc(w * 0.5, h * 0.62, r, 0, Math.PI * 1.65);
        }
        ctx.stroke();
    } },
    { colour: '#ce1126', share: 0.16, draw: (ctx, w, h) => {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = w * 0.05; ctx.lineCap = 'round';
        for (const [cx, flip] of [[0.34, 1], [0.66, -1]]) {
            ctx.beginPath();
            ctx.ellipse(w * cx, h * 0.47, w * 0.035, h * 0.06, 0.25 * flip, 0.6, Math.PI * 1.9);
            ctx.stroke();
        }
    } },
];

export function initOrganScroll(root) {
    const canvas = root.querySelector('canvas');
    const captions = [...root.querySelectorAll('[data-stage]')];
    const fallback = root.querySelector('[data-organ-fallback]');
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch { return; }
    if (fallback) fallback.hidden = true;
    canvas.removeAttribute('hidden');

    const N = window.innerWidth < 768 ? 1000 : 4200;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
    camera.position.z = 3.1;

    // Build targets ------------------------------------------------------
    const posA = new Float32Array(N * 3);   // organ cluster
    const posB = new Float32Array(N * 3);   // brand kidney
    const colA = new Float32Array(N * 3);
    const colB = new Float32Array(N * 3);
    const stagger = new Float32Array(N);

    let offset = 0;
    for (const organ of ORGANS) {
        const count = Math.round(N * organ.share);
        const pts = sampleShape(organ.draw, count);
        const c = new THREE.Color(organ.colour);
        for (let i = 0; i < count && offset < N; i++, offset++) {
            const [x, y] = pts[i];
            posA[offset * 3] = x * 1.45;
            posA[offset * 3 + 1] = y * 1.45;
            posA[offset * 3 + 2] = (Math.random() - 0.5) * 0.5;
            colA[offset * 3] = c.r; colA[offset * 3 + 1] = c.g; colA[offset * 3 + 2] = c.b;
        }
    }
    for (; offset < N; offset++) { // spare points: faint dust
        posA[offset * 3] = (Math.random() - 0.5) * 3.4;
        posA[offset * 3 + 1] = (Math.random() - 0.5) * 3;
        posA[offset * 3 + 2] = (Math.random() - 0.5) * 1.2;
        const c = new THREE.Color(BLUE.frame);
        colA[offset * 3] = c.r; colA[offset * 3 + 1] = c.g; colA[offset * 3 + 2] = c.b;
    }

    const kidneyPts = sampleShape(drawKidney, N);
    const shuffled = [...kidneyPts.keys()].sort(() => Math.random() - 0.5);
    for (let i = 0; i < N; i++) {
        const [x, y] = kidneyPts[shuffled[i]];
        posB[i * 3] = x * 1.15;
        posB[i * 3 + 1] = y * 1.15;
        posB[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        const c = new THREE.Color(RED[(Math.random() * RED.length) | 0]);
        colB[i * 3] = c.r; colB[i * 3 + 1] = c.g; colB[i * 3 + 2] = c.b;
        stagger[i] = Math.random();
    }

    // Geometry -----------------------------------------------------------
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(posA);
    const colours = new Float32Array(colA);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colours, 3));

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext('2d');
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.85)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);

    const material = new THREE.PointsMaterial({
        size: window.innerWidth < 768 ? 0.026 : 0.03,
        map: new THREE.CanvasTexture(spriteCanvas),
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        sizeAttenuation: true,
    });
    const cloud = new THREE.Points(geo, material);
    cloud.position.x = window.matchMedia('(min-width: 64rem)').matches ? 0.55 : 0;
    scene.add(cloud);

    // Sizing ---------------------------------------------------------------
    const stage = canvas.parentElement;
    function resize() {
        const { clientWidth: cw, clientHeight: ch } = stage;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(cw, ch, false);
        camera.aspect = cw / ch;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Scroll progress -------------------------------------------------------
    const ease = (x) => x * x * (3 - 2 * x);
    let progress = 0;
    function readScroll() {
        const rect = root.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        progress = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
        const stageIdx = progress < 0.34 ? 0 : progress < 0.72 ? 1 : 2;
        captions.forEach((el, i) => el.classList.toggle('is-active', i === stageIdx));
    }
    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    // Render loop, paused off screen -----------------------------------------
    let running = false, raf = 0;
    const timer = new THREE.Timer();
    function frame() {
        timer.update();
        const t = timer.getElapsed();
        // morph begins after the organs have had their moment
        const m = ease(Math.min(1, Math.max(0, (progress - 0.38) / 0.44)));
        const pos = geo.attributes.position.array;
        const col = geo.attributes.color.array;
        for (let i = 0; i < N; i++) {
            const k = ease(Math.min(1, Math.max(0, (m * 1.45) - stagger[i] * 0.45)));
            const drift = Math.sin(t * 0.7 + i) * 0.012;
            pos[i * 3] = posA[i * 3] + (posB[i * 3] - posA[i * 3]) * k;
            pos[i * 3 + 1] = posA[i * 3 + 1] + (posB[i * 3 + 1] - posA[i * 3 + 1]) * k + drift;
            pos[i * 3 + 2] = posA[i * 3 + 2] + (posB[i * 3 + 2] - posA[i * 3 + 2]) * k + Math.cos(t * 0.6 + i * 1.7) * 0.012;
            col[i * 3] = colA[i * 3] + (colB[i * 3] - colA[i * 3]) * k;
            col[i * 3 + 1] = colA[i * 3 + 1] + (colB[i * 3 + 1] - colA[i * 3 + 1]) * k;
            col[i * 3 + 2] = colA[i * 3 + 2] + (colB[i * 3 + 2] - colA[i * 3 + 2]) * k;
        }
        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;
        cloud.rotation.y = -0.25 + m * 0.5 + Math.sin(t * 0.25) * 0.06;
        cloud.rotation.x = Math.sin(t * 0.2) * 0.04;
        renderer.render(scene, camera);
        if (running) raf = requestAnimationFrame(frame);
    }
    const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
        else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }, { rootMargin: '100px' });
    io.observe(root);
}
