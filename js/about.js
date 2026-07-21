// =============================================
// About Page JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initBrandValues();
    initTeamScroll();
    initTeamModal();
    initAboutScrollAnimations();

    // Initialize CTA to Footer transition (same as index page)
    if (typeof initCTAFooterTransition === 'function') {
        initCTAFooterTransition();
    }
});

// -----------------------------------------
// Scroll Animations with GSAP ScrollTrigger
// -----------------------------------------
function initAboutScrollAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // About Company Section - text fade in
    gsap.from('.about-company-text', {
        scrollTrigger: {
            trigger: '.about-company-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.about-company-video', {
        scrollTrigger: {
            trigger: '.about-company-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Brand Values Section
    gsap.from('.brand-values-title', {
        scrollTrigger: {
            trigger: '.brand-values-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });

    gsap.from('.values-list', {
        scrollTrigger: {
            trigger: '.brand-values-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.values-image', {
        scrollTrigger: {
            trigger: '.brand-values-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Team Section
    gsap.from('.team-carousel-header', {
        scrollTrigger: {
            trigger: '.team-section-new',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });

    gsap.from('.team-slide-pair', {
        scrollTrigger: {
            trigger: '.team-carousel-viewport',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Footer section
    gsap.from('.footer-cta-left', {
        scrollTrigger: {
            trigger: '.footer-hero',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.footer-cta-right', {
        scrollTrigger: {
            trigger: '.footer-hero',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.footer-info > div', {
        scrollTrigger: {
            trigger: '.footer-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// Team data for the modal
const teamData = [
    {
        name: "VACHAN BOJAMMA",
        role: "Founder/Principal Architect",
        bio: "Coorg-born architect with a B.Arch from CMR University and an M.ID from Vogue Institute. Registered with the Council of Architecture (COA), Vachan spearheads design at Ekhaya, fusing refined aesthetics with purposeful planning to turn your vision into spaces that feel like home. Her detail-driven rigour and relentless pursuit of excellence deliver beautiful, practical results — always on time."
    },
    {
        name: "ASHWINI DEEKSHA",
        role: "Co-Founder/Head Of Operations",
        bio: "Born and raised in Coorg, Deeksha brings a blend of business acumen and creative insight to Ekhaya Architects. With a BBA in Marketing & HR from PES University and an MSc in Fashion Management from the University of Arts London, she shapes the brand's identity and client experience."
    },
    {
        name: "AR. GLORIA SAJAN",
        role: "Junior Architect",
        bio: "Talented architect contributing to innovative design solutions at Ekhaya. Gloria brings fresh perspectives and creative energy to every project, helping translate client visions into architectural reality."
    },
    {
        name: "AR. ESHA SHIHAS",
        role: "Junior Architect",
        bio: "Creative architect bringing fresh perspectives to residential and commercial projects. Esha excels at blending functionality with aesthetic appeal, creating spaces that inspire and delight."
    },
    {
        name: "AR. SONALI NAVADAGI",
        role: "Junior Architect",
        bio: "Dedicated architect with expertise in sustainable and contextual design. Sonali brings meticulous attention to detail and a passion for creating environmentally conscious spaces."
    }
];

// -----------------------------------------
// Brand Values Interactive Section
// -----------------------------------------
function initBrandValues() {
    const valueItems = document.querySelectorAll('.value-item');
    const valueImages = document.querySelectorAll('.values-image img');
    const progressBar = document.querySelector('.values-progress-bar');

    if (!valueItems.length) return;

    valueItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            valueItems.forEach(i => i.classList.remove('active'));
            valueImages.forEach(img => img.classList.remove('active'));

            item.classList.add('active');
            valueImages[index].classList.add('active');

            if (progressBar) {
                progressBar.style.width = ((index + 1) / valueItems.length * 100) + '%';
            }
            const counter = document.querySelector('.values-counter');
            if (counter) {
                counter.textContent = `(${index + 1}/${valueItems.length})`;
            }
        });
    });
}

// -----------------------------------------
// Team Carousel - Two Cards Desktop / One Card Mobile
// -----------------------------------------
function initTeamScroll() {
    const prevBtn = document.getElementById('teamPrev');
    const nextBtn = document.getElementById('teamNext');
    const slides = document.querySelectorAll('.team-slide-pair');
    const teamSlider = document.getElementById('teamSliderNew');
    const teamCardLinks = document.querySelectorAll('.team-card-link');

    if (!slides.length || !teamSlider) return;

    let currentSlide = 0;
    let showingSecondCard = false;
    const totalSlides = slides.length;
    const isMobile = () => window.innerWidth <= 768;

    function updateButtons() {
        if (!isMobile()) {
            // Desktop: Simple slide navigation
            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
        } else {
            // Mobile: Check if we're at the very end
            const atEnd = currentSlide === totalSlides - 1 && showingSecondCard;
            const atStart = currentSlide === 0 && !showingSecondCard;
            if (prevBtn) prevBtn.disabled = atStart;
            if (nextBtn) nextBtn.disabled = atEnd;
        }
    }

    function showSlide(index, showSecond = false) {
        // Use transform for smooth sliding animation
        const translateX = -(index * 100);
        teamSlider.style.transform = `translateX(${translateX}%)`;

        // Handle mobile second card toggle
        slides.forEach((slide, i) => {
            slide.classList.remove('show-second');
            if (i === index && showSecond) {
                slide.classList.add('show-second');
            }
        });

        currentSlide = index;
        showingSecondCard = showSecond;
        updateButtons();
    }

    function next() {
        if (isMobile()) {
            // Mobile: First show second card, then move to next slide
            if (!showingSecondCard) {
                showSlide(currentSlide, true);
            } else if (currentSlide < totalSlides - 1) {
                showSlide(currentSlide + 1, false);
            }
        } else {
            // Desktop: Move to next slide
            if (currentSlide < totalSlides - 1) {
                showSlide(currentSlide + 1, false);
            }
        }
    }

    function prev() {
        if (isMobile()) {
            // Mobile: First go to previous slide's second card, then first card
            if (showingSecondCard) {
                showSlide(currentSlide, false);
            } else if (currentSlide > 0) {
                showSlide(currentSlide - 1, true);
            }
        } else {
            // Desktop: Move to previous slide
            if (currentSlide > 0) {
                showSlide(currentSlide - 1, false);
            }
        }
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', next);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            // Reset to slide view on desktop
            showingSecondCard = false;
            slides.forEach(slide => slide.classList.remove('show-second'));
        }
        updateButtons();
    });

    // "KNOW MORE" arrow links - navigate to next team container
    teamCardLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Navigate to next slide/card
            next();
        });
    });

    // Initialize
    showSlide(0, false);
}

// -----------------------------------------
// Team Modal Popup
// -----------------------------------------
function initTeamModal() {
    const modal = document.getElementById('teamModal');
    const modalImage = document.getElementById('modalImage');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalBio = document.getElementById('modalBio');
    const teamMembers = document.querySelectorAll('.team-member');

    function openModal(index) {
        const member = teamData[index];
        const memberEl = teamMembers[index];
        const memberImg = memberEl.querySelector('img');

        modalImage.src = memberImg.src;
        modalName.textContent = member.name;
        modalRole.textContent = member.role;
        modalBio.textContent = member.bio;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    teamMembers.forEach((member, index) => {
        member.addEventListener('click', () => openModal(index));
    });

    // modalClose.addEventListener('click', closeModal);

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) closeModal();
    // });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
