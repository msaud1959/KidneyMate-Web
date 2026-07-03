import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';

// Mark JS availability so reveal styles never hide content without JS.
document.documentElement.classList.remove('no-js');

window.Alpine = Alpine;
Alpine.plugin(focus);
Alpine.plugin(collapse);

// Reveal-on-scroll: fires once per element, respects reduced motion via CSS.
const revealables = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealables.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    revealables.forEach((el) => observer.observe(el));
} else {
    revealables.forEach((el) => el.classList.add('is-revealed'));
}

// Ambient band videos: desktop-only, in-view-only, never with reduced motion.
const prefersStill = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLarge = window.matchMedia('(min-width: 64rem)').matches;
document.querySelectorAll('video[data-ambient]').forEach((video) => {
    if (prefersStill || !isLarge) return; // poster only
    const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { video.play().catch(() => {}); }
        else { video.pause(); }
    }, { rootMargin: '80px' });
    io.observe(video);
});

// Hero dust: a whisper of drifting brand particles behind the hero.
const dustCanvas = document.querySelector('canvas[data-hero-dust]');
if (dustCanvas && !prefersStill) {
    const ctx = dustCanvas.getContext('2d');
    const parent = dustCanvas.parentElement;
    let w, h;
    const resize = () => {
        w = dustCanvas.width = parent.clientWidth;
        h = dustCanvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const motes = Array.from({ length: 110 }, () => ({
        x: Math.random(), y: Math.random(),
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: -0.00004 - Math.random() * 0.00011,
        red: Math.random() < 0.14,
        a: 0.12 + Math.random() * 0.3,
    }));
    let dustRunning = false, dustRaf = 0;
    const tick = () => {
        ctx.clearRect(0, 0, w, h);
        for (const m of motes) {
            m.x = (m.x + m.vx + 1) % 1;
            m.y = (m.y + m.vy + 1) % 1;
            ctx.beginPath();
            ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2);
            ctx.fillStyle = m.red ? `rgba(232, 124, 138, ${m.a})` : `rgba(126, 151, 224, ${m.a})`;
            ctx.fill();
        }
        if (dustRunning) dustRaf = requestAnimationFrame(tick);
    };
    new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !dustRunning) { dustRunning = true; dustRaf = requestAnimationFrame(tick); }
        else if (!entry.isIntersecting && dustRunning) { dustRunning = false; cancelAnimationFrame(dustRaf); }
    }).observe(dustCanvas);
}

// 3D organ-to-kidney scroll sequence: lazy chunk, only when wanted and possible.
const organRoot = document.querySelector('[data-organ-scroll]');
if (
    organRoot &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })()
) {
    import('./organ-scroll.js').then(({ initOrganScroll }) => initOrganScroll(organRoot)).catch(() => {});
}

Alpine.start();
