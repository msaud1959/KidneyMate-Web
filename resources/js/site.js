import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';

// Mark JS availability so reveal styles never hide content without JS.
document.documentElement.classList.remove('no-js');

window.Alpine = Alpine;
Alpine.plugin(focus);

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

Alpine.start();
