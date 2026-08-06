// =============================================
// Services Page JavaScript - Accordion Functionality
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    initServicesAccordion();
    animateHero()

        if (typeof initCTAFooterTransition === 'function') {
        initCTAFooterTransition();
    }

    // Initialize footer animations (fade in)
    if (typeof initFooterAnimations === 'function') {
        initFooterAnimations();
    }
    initKnowMoreLinks();

});

// -----------------------------------------
// Services Accordion with Image Change
// -----------------------------------------
function initServicesAccordion() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImages = document.querySelectorAll('.services-image img');

    if (!serviceItems.length) return;

    serviceItems.forEach((item, index) => {
        const header = item.querySelector('.service-header');
        const toggle = item.querySelector('.service-toggle');

        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all items
            serviceItems.forEach((si, siIndex) => {
                si.classList.remove('active');
                si.querySelector('.service-toggle').textContent = '+';
            });

            // Update all images
            serviceImages.forEach(img => img.classList.remove('active'));

            // If this item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                toggle.textContent = '—';

                // Show corresponding image
                if (serviceImages[index]) {
                    serviceImages[index].classList.add('active');
                }
            } else {
                // If closing, show first image as default
                if (serviceImages[0]) {
                    serviceImages[0].classList.add('active');
                }
            }
        });
    });

    // Initialize first image as active
    if (serviceImages.length && serviceItems[0].classList.contains('active')) {
        serviceImages[0].classList.add('active');
    }
}
