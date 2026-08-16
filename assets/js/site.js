(() => {
    document.documentElement.classList.add('js-ready');

    const header = document.querySelector('[data-header]');
    const hero = document.querySelector('[data-hero]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncHeader = () => {
        if (!header || !hero) return;
        header.classList.toggle('is-solid', hero.getBoundingClientRect().bottom < 76);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    if (menuToggle && mobileMenu) {
        const closeMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.hidden = true;
        };
        menuToggle.addEventListener('click', () => {
            const open = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!open));
            mobileMenu.hidden = open;
        });
        mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
    }

    const revealItems = [...document.querySelectorAll('[data-reveal]')];
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        revealItems.forEach((item) => observer.observe(item));
    }

    const carousel = document.querySelector('[data-carousel]');
    const cards = carousel ? [...carousel.querySelectorAll('[data-card]')] : [];
    const previous = carousel?.querySelector('[data-carousel-prev]');
    const next = carousel?.querySelector('[data-carousel-next]');
    const pause = carousel?.querySelector('[data-carousel-pause]');
    let position = 0;
    let paused = reducedMotion.matches;
    let manuallyPaused = reducedMotion.matches;
    let lastFrame = 0;
    let animationFrame = 0;

    const layout = () => {
        if (!cards.length) return;
        const mobile = window.innerWidth < 720;
        const spacing = mobile ? 112 : Math.min(205, window.innerWidth * .16);
        const depth = mobile ? 58 : 108;
        const rotation = mobile ? -8 : -13;
        const half = cards.length / 2;
        cards.forEach((card, index) => {
            let offset = index - position;
            offset = ((offset % cards.length) + cards.length + half) % cards.length - half;
            const distance = Math.abs(offset);
            card.style.transform = `translateX(calc(-50% + ${offset * spacing}px)) translateZ(${-distance * depth}px) rotateY(${offset * rotation}deg) scale(${Math.max(.5, 1 - distance * .055)})`;
            card.style.zIndex = String(100 - Math.round(distance * 10));
            card.style.opacity = String(Math.max(.18, 1 - Math.max(0, distance - 2.15) * .72));
            card.setAttribute('aria-hidden', distance > 1.6 ? 'true' : 'false');
        });
    };

    const nudge = (amount) => {
        position = (position + amount + cards.length) % cards.length;
        layout();
    };
    previous?.addEventListener('click', () => nudge(-1));
    next?.addEventListener('click', () => nudge(1));
    pause?.addEventListener('click', () => {
        manuallyPaused = !manuallyPaused;
        paused = manuallyPaused;
        pause.setAttribute('aria-pressed', String(manuallyPaused));
        pause.textContent = manuallyPaused ? 'Seguir' : 'Pausa';
        pause.setAttribute('aria-label', manuallyPaused ? 'Reanudar carrusel' : 'Pausar carrusel');
    });
    carousel?.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); nudge(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); nudge(1); }
    });
    carousel?.addEventListener('pointerenter', () => { paused = true; });
    carousel?.addEventListener('pointerleave', () => { paused = manuallyPaused || reducedMotion.matches; });
    window.addEventListener('resize', layout, { passive: true });
    layout();

    const tick = (time) => {
        animationFrame = requestAnimationFrame(tick);
        if (!lastFrame) { lastFrame = time; return; }
        const delta = Math.min(50, time - lastFrame);
        lastFrame = time;
        if (!paused && cards.length) {
            position = (position + delta / 6500) % cards.length;
            layout();
        }
    };
    if (!reducedMotion.matches) animationFrame = requestAnimationFrame(tick);
    window.addEventListener('pagehide', () => cancelAnimationFrame(animationFrame), { once: true });
})();
