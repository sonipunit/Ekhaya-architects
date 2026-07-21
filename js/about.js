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

// Refresh ScrollTrigger after all images and content load
window.addEventListener('load', function() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
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

    // Team Section (same style as index page team section)
    gsap.from('.team-header-new', {
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

    gsap.from('.team-slider-container', {
        scrollTrigger: {
            trigger: '.team-section-new',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    // Footer hero content animation
    gsap.from('.footer-cta-left, .footer-cta-right', {
        scrollTrigger: {
            trigger: '.footer-hero',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Footer info section
    gsap.from('.footer-info > div', {
        scrollTrigger: {
            trigger: '.footer-info',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

// Team data for the panel
const teamData = [
    {
        name: "VACHAN BOJAMMA",
        role: "Founder/Principal Architect",
        bio: "Coorg-born architect with a B.Arch from CMR University and an M.ID from Vogue Institute. Registered with the Council of Architecture (COA), Vachan spearheads design at Ekhaya, fusing refined aesthetics with purposeful planning to turn your vision into spaces that feel like home. Her detail-driven rigour and relentless pursuit of excellence deliver beautiful, practical results — always on time.",
        image: "./images/founder.png"
    },
    {
        name: "ASHWINI DEEKSHA",
        role: "Co-Founder/Head Of Operations",
        bio: "Born and raised in Coorg, Deeksha brings a blend of business acumen and creative insight to Ekhaya Architects. With a BBA in Marketing & HR from PES University and an MSc in Fashion Management from the University of Arts London, she shapes the brand's identity and client experience.",
        image: "./images/cofounder.png"
    },
    {
        name: "AR. GLORIA SAJAN",
        role: "Junior Architect",
        bio: "Talented architect contributing to innovative design solutions at Ekhaya. Gloria brings fresh perspectives and creative energy to every project, helping translate client visions into architectural reality.",
        image: "./images/team1.png"
    },
    {
        name: "AR. ESHA SHIHAS",
        role: "Junior Architect",
        bio: "Creative architect bringing fresh perspectives to residential and commercial projects. Esha excels at blending functionality with aesthetic appeal, creating spaces that inspire and delight.",
        image: "./images/team2.png"
    },
    {
        name: "AR. SONALI NAVADAGI",
        role: "Junior Architect",
        bio: "Dedicated architect with expertise in sustainable and contextual design. Sonali brings meticulous attention to detail and a passion for creating environmentally conscious spaces.",
        image: "./images/team3.png"
    },
    {
        name: "NEW MEMBER",
        role: "Design Lead",
        bio: "Bringing innovative design thinking and technical expertise to every project. Committed to creating spaces that blend functionality with timeless beauty.",
        image: "./images/team.png"
    }
];

// -----------------------------------------
// Brand Values Interactive Section
// -----------------------------------------
function initBrandValues() {
    const valueItems = document.querySelectorAll('.value-item');
    const valueImages = document.querySelectorAll('.values-image img');
    const progressBar = document.querySelector('.values-progress-bar');
    const valuesImageContainer = document.querySelector('.values-image');
    const mobileName = document.querySelector('.values-mobile-name');
    const mobileDesc = document.querySelector('.values-mobile-desc');

    if (!valueItems.length) return;

    // Value data for mobile
    const valueData = Array.from(valueItems).map(item => ({
        name: item.querySelector('.value-name')?.textContent || '',
        desc: item.querySelector('.value-desc')?.textContent || ''
    }));

    let currentIndex = 0;

    function updateValue(index) {
        // Desktop list update
        valueItems.forEach(i => i.classList.remove('active'));
        valueImages.forEach(img => img.classList.remove('active'));

        valueItems[index]?.classList.add('active');
        valueImages[index]?.classList.add('active');

        // Mobile text update
        if (mobileName) mobileName.textContent = valueData[index]?.name || '';
        if (mobileDesc) mobileDesc.textContent = valueData[index]?.desc || '';

        // Progress and counter
        if (progressBar) {
            progressBar.style.width = ((index + 1) / valueItems.length * 100) + '%';
        }
        const counter = document.querySelector('.values-counter');
        if (counter) {
            counter.textContent = `(${index + 1}/${valueItems.length})`;
        }

        currentIndex = index;
    }

    // Desktop click handlers
    valueItems.forEach((item, index) => {
        item.addEventListener('click', () => updateValue(index));
    });

    // Mobile swipe handlers
    if (valuesImageContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;

        valuesImageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        valuesImageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - next
                    if (currentIndex < valueItems.length - 1) {
                        updateValue(currentIndex + 1);
                    }
                } else {
                    // Swiped right - previous
                    if (currentIndex > 0) {
                        updateValue(currentIndex - 1);
                    }
                }
            }
        }
    }

    // Initialize first value
    updateValue(0);
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
    const sliderContainer = document.querySelector('.team-slider-container');

    if (!slides.length || !teamSlider) return;

    const totalSlides = slides.length;
    const isMobile = () => window.innerWidth <= 768;

    // Mobile: Flatten structure - each card becomes a "slide"
    // We use a single index: 0,1 = slide 0 cards; 2,3 = slide 1 cards; etc.
    let mobileCardIndex = 0; // 0-5 for 6 team members
    let desktopSlideIndex = 0;

    function getTotalMobileCards() {
        let count = 0;
        slides.forEach(slide => {
            count += slide.querySelectorAll('.team-card').length;
        });
        return count;
    }

    function updateMobileView() {
        // Calculate which slide and which card to show
        const slideIndex = Math.floor(mobileCardIndex / 2);
        const isSecondCard = mobileCardIndex % 2 === 1;

        // Move slider to correct slide
        const translateX = -(slideIndex * 100);
        teamSlider.style.transform = `translateX(${translateX}%)`;

        // Show correct card within the slide
        slides.forEach((slide, i) => {
            slide.classList.remove('show-second');
            if (i === slideIndex && isSecondCard) {
                slide.classList.add('show-second');
            }
        });

        // Update counter and progress
        const totalCards = getTotalMobileCards();
        const mobileCounter = document.querySelector('.team-mobile-counter');
        const mobileProgressBar = document.querySelector('.team-mobile-progress-bar');

        if (mobileCounter) {
            mobileCounter.textContent = `(${mobileCardIndex + 1}/${totalCards})`;
        }
        if (mobileProgressBar) {
            const progress = ((mobileCardIndex + 1) / totalCards) * 100;
            mobileProgressBar.style.width = progress + '%';
        }
    }

    function updateDesktopView() {
        const translateX = -(desktopSlideIndex * 100);
        teamSlider.style.transform = `translateX(${translateX}%)`;

        if (prevBtn) prevBtn.disabled = desktopSlideIndex === 0;
        if (nextBtn) nextBtn.disabled = desktopSlideIndex === totalSlides - 1;
    }

    function showView() {
        if (isMobile()) {
            updateMobileView();
        } else {
            updateDesktopView();
        }
    }

    function next() {
        if (isMobile()) {
            const totalCards = getTotalMobileCards();
            if (mobileCardIndex < totalCards - 1) {
                mobileCardIndex++;
                updateMobileView();
            }
        } else {
            if (desktopSlideIndex < totalSlides - 1) {
                desktopSlideIndex++;
                updateDesktopView();
            }
        }
    }

    function prev() {
        if (isMobile()) {
            if (mobileCardIndex > 0) {
                mobileCardIndex--;
                updateMobileView();
            }
        } else {
            if (desktopSlideIndex > 0) {
                desktopSlideIndex--;
                updateDesktopView();
            }
        }
    }

    // Navigation buttons (desktop only)
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Handle resize
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            // Reset mobile state when going to desktop
            mobileCardIndex = desktopSlideIndex * 2;
        } else {
            // Sync desktop state from mobile
            desktopSlideIndex = Math.floor(mobileCardIndex / 2);
        }
        showView();
    });

    // "KNOW MORE" arrow links - open team detail panel
    teamCardLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Calculate actual member index based on current slide
            const memberIndex = isMobile() ? mobileCardIndex : (desktopSlideIndex * 2 + index);
            openTeamPanel(memberIndex);
        });
    });

    // Mobile swipe gestures
    if (sliderContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    next(); // Swiped left - next
                } else {
                    prev(); // Swiped right - previous
                }
            }
        }
    }

    // Initialize
    showView();

    // Initialize team panel
    initTeamPanel();
}

// -----------------------------------------
// Team Detail Panel
// -----------------------------------------
function initTeamPanel() {
    const teamPanel = document.getElementById('teamPanel');
    const teamPanelClose = teamPanel?.querySelector('.panel-close');

    if (!teamPanel) return;

    // Close button handler
    if (teamPanelClose) {
        teamPanelClose.addEventListener('click', closeTeamPanel);
    }

    // Close on overlay click (outside panel)
    document.addEventListener('click', (e) => {
        if (teamPanel.classList.contains('is-open') && !teamPanel.contains(e.target) && !e.target.closest('.team-card-link')) {
            closeTeamPanel();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && teamPanel.classList.contains('is-open')) {
            closeTeamPanel();
        }
    });
}

function openTeamPanel(index) {
    const teamPanel = document.getElementById('teamPanel');
    const teamDetailImage = document.getElementById('teamDetailImage');
    const teamDetailName = document.getElementById('teamDetailName');
    const teamDetailRole = document.getElementById('teamDetailRole');
    const teamDetailBio = document.getElementById('teamDetailBio');

    if (!teamPanel || !teamData[index]) return;

    const member = teamData[index];

    // Populate panel content
    if (teamDetailImage) {
        teamDetailImage.src = member.image;
        teamDetailImage.alt = member.name;
    }
    if (teamDetailName) teamDetailName.textContent = member.name;
    if (teamDetailRole) teamDetailRole.textContent = member.role;
    if (teamDetailBio) teamDetailBio.textContent = member.bio;

    // Open panel
    teamPanel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeTeamPanel() {
    const teamPanel = document.getElementById('teamPanel');
    if (teamPanel) {
        teamPanel.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

    // Mobile swipe gestures
    if (sliderContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    next(); // Swiped left - next
                } else {
                    prev(); // Swiped right - previous
                }
            }
        }
    }

    // Initialize
    showView();


// -----------------------------------------
// Team Detail Panel
// -----------------------------------------
function initTeamPanel() {
    const teamPanel = document.getElementById('teamPanel');
    const teamPanelClose = teamPanel?.querySelector('.panel-close');

    if (!teamPanel) return;

    // Close button handler
    if (teamPanelClose) {
        teamPanelClose.addEventListener('click', closeTeamPanel);
    }

    // Close on overlay click (outside panel)
    document.addEventListener('click', (e) => {
        if (teamPanel.classList.contains('is-open') && !teamPanel.contains(e.target) && !e.target.closest('.team-card-link')) {
            closeTeamPanel();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && teamPanel.classList.contains('is-open')) {
            closeTeamPanel();
        }
    });
}

function openTeamPanel(index) {
    const teamPanel = document.getElementById('teamPanel');
    const teamDetailImage = document.getElementById('teamDetailImage');
    const teamDetailName = document.getElementById('teamDetailName');
    const teamDetailRole = document.getElementById('teamDetailRole');
    const teamDetailBio = document.getElementById('teamDetailBio');

    if (!teamPanel || !teamData[index]) return;

    const member = teamData[index];

    // Populate panel content
    if (teamDetailImage) {
        teamDetailImage.src = member.image;
        teamDetailImage.alt = member.name;
    }
    if (teamDetailName) teamDetailName.textContent = member.name;
    if (teamDetailRole) teamDetailRole.textContent = member.role;
    if (teamDetailBio) teamDetailBio.textContent = member.bio;

    // Open panel
    teamPanel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeTeamPanel() {
    const teamPanel = document.getElementById('teamPanel');
    if (teamPanel) {
        teamPanel.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}

// -----------------------------------------
// Legacy Team Modal (kept for compatibility)
// -----------------------------------------
function initTeamModal() {
    // Team modal is now replaced by team panel
    initTeamPanel();
}
