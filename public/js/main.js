/* ==========================================================================
   Allan Bian — Personal Website Interactions
   Handles full-resolution artwork lightbox, floating wayfinding dock,
   scrollspy section tracking, and keyboard navigation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Poster Artwork Lightbox
    // --------------------------------------------------------------------------
    const trigger = document.getElementById('posterTrigger');
    const lightbox = document.getElementById('posterLightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const backdrop = document.getElementById('lightboxBackdrop');

    if (trigger && lightbox) {
        const openLightbox = () => {
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            trigger.focus();
        };

        trigger.addEventListener('click', openLightbox);
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (backdrop) backdrop.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. Floating Wayfinding Dock (Scroll Reveal & Scrollspy)
    // --------------------------------------------------------------------------
    const navDock = document.getElementById('navDock');
    const navLinks = document.querySelectorAll('.nav-dock-link');
    const sections = document.querySelectorAll('section[id]');

    if (navDock) {
        // Toggle dock visibility on scroll
        const handleScroll = () => {
            if (window.scrollY > 90) {
                navDock.classList.add('is-visible');
            } else {
                navDock.classList.remove('is-visible');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        // Scrollspy: Track active section
        if ('IntersectionObserver' in window && sections.length > 0) {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -55% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const activeId = entry.target.getAttribute('id');
                        navLinks.forEach((link) => {
                            if (link.getAttribute('data-section') === activeId) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach((section) => observer.observe(section));
        }
    }
});
