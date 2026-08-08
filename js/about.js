// =============================================
// About Page JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initBrandValues();
    initTeamScroll();
    initTeamModal();
    initAboutScrollAnimations();
    animateHero()
    // Initialize CTA to Footer transition (zoom + color change)
    if (typeof initCTAFooterTransition === 'function') {
        initCTAFooterTransition();
    }

    // Initialize footer animations (fade in)
    if (typeof initFooterAnimations === 'function') {
        initFooterAnimations();
    }

    // Initialize KNOW MORE links
    initKnowMoreLinks();
});

// Refresh ScrollTrigger after all images and content load
window.addEventListener('load', function() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
        console.log('ScrollTrigger refreshed');
    }
});

// Also refresh after a short delay to ensure everything is settled
setTimeout(function() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 100);

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

    // About page specific animations only
    // Footer animations are handled by initCTAFooterTransition() in main.js
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
    const valueItems = document.querySelectorAll(".value-item");
    const valueImages = document.querySelectorAll(".values-image img");

    const mobileName = document.querySelector(".values-mobile-name");
    const mobileDesc = document.querySelector(".values-mobile-desc");
    const counter = document.querySelector(".values-counter");
    const progress = document.querySelector(".values-progress-bar");

    if (!valueItems.length) return;

    let currentValue = 0;

    function updateBrandValue(index) {

        currentValue = (index + valueItems.length) % valueItems.length;

        valueItems.forEach(item => item.classList.remove("active"));
        valueImages.forEach(img => img.classList.remove("active"));

        valueItems[currentValue].classList.add("active");
        valueImages[currentValue].classList.add("active");

        if (mobileName) {
            mobileName.textContent =
                valueItems[currentValue].querySelector(".value-name").textContent;
        }

        if (mobileDesc) {
            mobileDesc.textContent =
                valueItems[currentValue].querySelector(".value-desc").textContent;
        }

        if (counter) {
            counter.textContent =
                `(${currentValue + 1}/${valueItems.length})`;
        }

        if (progress) {
            progress.style.width =
                `${((currentValue + 1) / valueItems.length) * 100}%`;
        }
    }

    // Desktop click
    valueItems.forEach((item, index) => {
        item.addEventListener("click", () => updateBrandValue(index));
    });

    // Buttons
    document.querySelector(".values-next")?.addEventListener("click", () => {
        updateBrandValue(currentValue + 1);
    });

    document.querySelector(".values-prev")?.addEventListener("click", () => {
        updateBrandValue(currentValue - 1);
    });

    // Swipe
    const imageContainer = document.querySelector(".values-image");

    if (imageContainer) {

        let startX = 0;
        let endX = 0;

        imageContainer.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        imageContainer.addEventListener("touchend", e => {

            endX = e.changedTouches[0].clientX;

            const diff = startX - endX;

            if (Math.abs(diff) < 50) return;

            if (diff > 0) {
                updateBrandValue(currentValue + 1);
            } else {
                updateBrandValue(currentValue - 1);
            }

        }, { passive: true });
    }

    updateBrandValue(0);
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
    teamCardLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Get the data-index from the parent card
            const card = link.closest('.team-card');
            const memberIndex = card ? parseInt(card.dataset.index) : 0;
            console.log('Opening team panel for index:', memberIndex);
            openTeamPanel(memberIndex);
        });
    });

    // Initialize
    showView();

    // Initialize team panel
    initTeamPanel();

    // Initialize separate founders and team member sliders
    initFoundersSlider();
    initTeamMembersSlider();

    // Initialize KNOW MORE links for side panel
    initKnowMoreLinks();
}

// -----------------------------------------
// KNOW MORE Links - Open Team Panel
// -----------------------------------------
function initKnowMoreLinks() {
    document.querySelectorAll('.team-card-link').forEach((link) => {
        // Remove existing href to prevent page jump
        link.removeAttribute('href');
        link.style.cursor = 'pointer';

        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const card = link.closest('.team-card');
            const memberIndex = card ? parseInt(card.dataset.index) : 0;
            console.log('KNOW MORE clicked, index:', memberIndex);

            openTeamPanel(memberIndex);
        });
    });
}

// -----------------------------------------
// Founders Slider - 2 cards
// -----------------------------------------
function initFoundersSlider() {
    console.log('Initializing founders slider...');
    const slider = document.querySelector('.founders-slider');
    const prevBtn = document.querySelector('.founders-prev');
    const nextBtn = document.querySelector('.founders-next');
    const counter = document.querySelector('.founders-counter');
    const progressBar = document.querySelector('.founders-progress-bar');

    console.log('Founders elements:', { slider: !!slider, prevBtn: !!prevBtn, nextBtn: !!nextBtn });

    if (!slider) {
        console.log('Founders slider not found, skipping');
        return;
    }

    let currentIndex = 0;
    const totalCards = 2;

    function updateView() {
        const translateX = -(currentIndex * 100);
        slider.style.transform = `translateX(${translateX}%)`;
        if (counter) counter.textContent = `(${currentIndex + 1}/${totalCards})`;
        if (progressBar) progressBar.style.width = `${((currentIndex + 1) / totalCards) * 100}%`;
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalCards - 1;
    }

    function next() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateView();
        }
    }

    function prev() {
        console.log('Founders prev() called, current:', currentIndex);
        if (currentIndex > 0) {
            currentIndex--;
            updateView();
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Founders PREV button clicked');
            prev();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Founders NEXT button clicked');
            next();
        });
    }

    // Swipe support
    const container = document.querySelector('.founders-slider-container');
    if (container) {
        let touchStartX = 0;
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        container.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? next() : prev();
            }
        }, { passive: true });
    }

    // Add global swipe detection for founders
    const foundersSection = document.querySelector('.team-section-founders');
    if (foundersSection) {
        let startX = 0;
        let startY = 0;
        foundersSection.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
            console.log('Founders touchstart:', startX);
        }, { passive: true });
        foundersSection.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].screenX;
            const endY = e.changedTouches[0].screenY;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);
            console.log('Founders touchend, diffX:', diffX, 'diffY:', diffY);
            // Check if horizontal swipe (more horizontal than vertical)
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
                console.log('Horizontal swipe detected');
                diffX > 0 ? next() : prev();
            }
        }, { passive: true });
    }

    updateView();
    console.log('Founders slider initialized, currentIndex:', currentIndex);
}

// -----------------------------------------
// Team Members Slider - 4 cards
// -----------------------------------------
function initTeamMembersSlider() {
    console.log('Initializing team members slider...');
    const grid = document.querySelector('.team-grid-members');
    const prevBtn = document.querySelector('.team-prev');
    const nextBtn = document.querySelector('.team-next');
    const counter = document.querySelector('.team-counter');
    const progressBar = document.querySelector('.team-progress-bar');

    console.log('Team members elements:', { grid: !!grid, prevBtn: !!prevBtn, nextBtn: !!nextBtn });

    if (!grid) {
        console.log('Team grid not found, skipping');
        return;
    }

    let currentIndex = 0;
    const totalCards = 4;

    function updateView() {
        const translateX = -(currentIndex * 100);
        grid.style.transform = `translateX(${translateX}%)`;
        if (counter) counter.textContent = `(${currentIndex + 1}/${totalCards})`;
        if (progressBar) progressBar.style.width = `${((currentIndex + 1) / totalCards) * 100}%`;
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalCards - 1;
    }

    function next() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateView();
        }
    }

    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateView();
        }
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Swipe support
    const container = document.querySelector('.team-slider-wrapper');
    if (container) {
        let touchStartX = 0;
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        container.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? next() : prev();
            }
        }, { passive: true });
    }

    updateView();
}

// -----------------------------------------
// Team Detail Panel with blur backdrop
// -----------------------------------------
function initTeamPanel() {
    const teamPanel = document.getElementById('teamPanel');
    const teamPanelClose = teamPanel?.querySelector('.panel-close');

    if (!teamPanel) return;

    // Create backdrop if not exists
    let backdrop = document.querySelector('.team-panel-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'team-panel-backdrop';
        document.body.appendChild(backdrop);
    }

    // Close button handler
    if (teamPanelClose) {
        teamPanelClose.addEventListener('click', closeTeamPanel);
    }

    // Close on backdrop click
    backdrop.addEventListener('click', closeTeamPanel);

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

    // Show backdrop with blur
    const backdrop = document.querySelector('.team-panel-backdrop');
    if (backdrop) {
        backdrop.classList.add('is-active');
    }

    // Open panel
    teamPanel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeTeamPanel() {
    const teamPanel = document.getElementById('teamPanel');

    // Hide backdrop
    const backdrop = document.querySelector('.team-panel-backdrop');
    if (backdrop) {
        backdrop.classList.remove('is-active');
    }

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

class InfiniteCarousel {
    constructor({
        track,
        cardSelector,
        prev,
        next,
        counter,
        progress,
        onChange
    }) {

        this.track = document.querySelector(track);
        if (!this.track) return;

        this.cards = [...this.track.querySelectorAll(cardSelector)];
        this.prevBtn = document.querySelector(prev);
        this.nextBtn = document.querySelector(next);
        this.counter = document.querySelector(counter);
        this.progress = document.querySelector(progress);
        this.onChange = onChange;

        this.current = 0;
        this.startX = 0;
        this.endX = 0;

        this.bind();
        this.update();

        window.addEventListener('resize', () => this.update());
    }

    getVisibleCount() {

        const container = this.track.parentElement;
        const card = this.cards[0];

        if (!card) return 1;

        const cardWidth = card.getBoundingClientRect().width;
        const visible = Math.round(container.clientWidth / cardWidth);

        return Math.max(1, Math.min(visible, this.cards.length));
    }

    canSlide() {
        return this.cards.length > this.getVisibleCount();
    }

    bind() {
        // Only bind click events - remove swipe for static mobile layout
        this.nextBtn?.addEventListener('click', () => this.next());
        this.prevBtn?.addEventListener('click', () => this.prev());

        // Touch/swipe events removed - cards are static on all screen sizes
    }

    next() {

        if (!this.canSlide()) return;

        this.current = (this.current + 1) % this.cards.length;
        this.update();
    }

    prev() {

        if (!this.canSlide()) return;

        this.current =
            (this.current - 1 + this.cards.length) % this.cards.length;

        this.update();
    }

    update() {

        const visible = this.getVisibleCount();

        if (!this.canSlide()) {
            this.track.style.transform = 'translateX(0)';
        } else {
            const cardWidth = this.cards[0].getBoundingClientRect().width;
            this.track.style.transform =
                `translateX(-${this.current * cardWidth}px)`;
        }

        if (this.counter) {
            this.counter.textContent =
                `(${this.current + 1}/${this.cards.length})`;
        }

        if (this.progress) {
            this.progress.style.width =
                `${((this.current + 1) / this.cards.length) * 100}%`;
        }

        this.onChange?.(this.current);
    }
}

/* Founders */
new InfiniteCarousel({
    track: '#foundersSlider',
    cardSelector: '.founder-card',
    prev: '.founders-prev',
    next: '.founders-next',
    counter: '.founders-counter',
    progress: '.founders-progress-bar'
});

/* Team */
new InfiniteCarousel({
    track: '#teamMembersGrid',
    cardSelector: '.member-card',
    prev: '.team-prev',
    next: '.team-next',
    counter: '.team-counter',
    progress: '.team-progress-bar'
});




