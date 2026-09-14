/* ==========================================================================
   Allan Bian — Personal Website Interactions
   Handles full-resolution poster artwork lightbox and keyboard navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('posterTrigger');
    const lightbox = document.getElementById('posterLightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const backdrop = document.getElementById('lightboxBackdrop');

    if (!trigger || !lightbox) return;

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

    // Click & Keyboard triggers
    trigger.addEventListener('click', openLightbox);
    trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
