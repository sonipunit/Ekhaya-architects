document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    loadProject(project);
    initGallery();
    animateHero()
    initScrollAnimations();
    initAboutProjectPanel();

    // Initialize CTA to Footer transition (zoom + color change)
    if (typeof initCTAFooterTransition === 'function') {
        initCTAFooterTransition();
    }

    // Initialize footer animations (fade in)
    if (typeof initFooterAnimations === 'function') {
        initFooterAnimations();
    }
});


// About Project Panel Functions
function initAboutProjectPanel() {
    const aboutProjectLink = document.getElementById('aboutProjectLink');
    const aboutProjectPanel = document.getElementById('aboutProjectPanel');
    const aboutProjectClose = aboutProjectPanel?.querySelector('.panel-close');

    if (!aboutProjectPanel) return;

    // Create backdrop if not exists
    let backdrop = document.querySelector('.about-project-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'about-project-backdrop';
        document.body.appendChild(backdrop);
    }

    // Open panel on link click
    if (aboutProjectLink) {
        aboutProjectLink.addEventListener('click', (e) => {
            e.preventDefault();
            openAboutProjectPanel();
        });
    }

    // Close button handler
    if (aboutProjectClose) {
        aboutProjectClose.addEventListener('click', closeAboutProjectPanel);
    }

    // Close on backdrop click
    backdrop.addEventListener('click', closeAboutProjectPanel);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutProjectPanel.classList.contains('is-open')) {
            closeAboutProjectPanel();
        }
    });
}

function openAboutProjectPanel() {
    const aboutProjectPanel = document.getElementById('aboutProjectPanel');

    // Show backdrop
    const backdrop = document.querySelector('.about-project-backdrop');
    if (backdrop) {
        backdrop.classList.add('is-active');
    }

    // Open panel
    if (aboutProjectPanel) {
        aboutProjectPanel.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeAboutProjectPanel() {
    const aboutProjectPanel = document.getElementById('aboutProjectPanel');

    // Hide backdrop
    const backdrop = document.querySelector('.about-project-backdrop');
    if (backdrop) {
        backdrop.classList.remove('is-active');
    }

    if (aboutProjectPanel) {
        aboutProjectPanel.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}
const params = new URLSearchParams(window.location.search);

const projectId = Number(params.get("id")) || 1;

const project =
    projects.find(p => p.id === projectId) || projects[0];

function loadProject(project){

    // Hero
    document.querySelector(".hero-title").innerHTML =
        `Project <b>${project.title.replace("Project ","")}</b>`;

    document.querySelector(".hero-image").src =
        project.heroImage;

    // Info

    document.querySelector(".project-info-title").textContent =
        project.title.toUpperCase();

    document.querySelector(".project-info-image img").src =
        project.cover;

    const metaValues =
        document.querySelectorAll(".meta-value");

    metaValues[0].textContent = project.category;
    metaValues[1].textContent = project.location;
    metaValues[2].innerHTML = project.team;

    // About

    const about =
        document.querySelector(".about-text");

    about.innerHTML =
        project.about.map(p=>`<p>${p}</p>`).join("");

    // Slider

    const slider =
        document.querySelector(".project-slider-track");

    slider.innerHTML =
        project.gallery.map(img=>
        `<img src="${img}" class="project-slider-image">`
        ).join("");

    slider.firstElementChild.classList.add("active");

    // Next project

    const next =
        projects[(project.id)%projects.length];

    document.querySelector(".next-project-image img").src =
        next.cover;

    document.querySelector(".next-project-title").textContent =
        next.title.toUpperCase();

    document.querySelector(".next-project-link").href =
        `projects.html?id=${next.id}`;

    // Update About Project Popup with dynamic data
    const popupTitle = document.querySelector('#aboutProjectPanel .about-project-header h2');
    const popupImage = document.getElementById('aboutProjectImage');
    const popupText = document.querySelector('#aboutProjectPanel .about-project-text');

    if (popupTitle) {
        popupTitle.textContent = project.title.toUpperCase();
    }
    if (popupImage) {
        popupImage.src = project.cover;
        popupImage.alt = project.title;
    }
    if (popupText) {
        popupText.innerHTML = project.about.map(p => `<p>${p}</p>`).join('');
    }

    // Initialize gallery after loading project
    initGallery();
}

// Gallery - Mobile view like Meet the Team with arrows, progress bar, swipe
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryWrapper = document.querySelector('.gallery-wrapper');

    if (!galleryGrid || !project.gallery) return;

    // Clear and inject gallery items with Phosphor circle arrows inside each item
    galleryGrid.innerHTML = project.gallery.map((img, index) => `
        <div class="gallery-item ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${img}" alt="Project gallery image ${index + 1}">
        </div>
    `).join('');

    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    const totalItems = galleryItems.length;
    if (totalItems === 0) return;

    let currentIndex = 0;
    let isMobile = window.innerWidth <= 768;

    // Add click handlers to arrows inside each gallery item
    galleryItems.forEach((item, index) => {
        const prevArrow = item.querySelector('.gallery-arrow.prev');
        const nextArrow = item.querySelector('.gallery-arrow.next');

        if (prevArrow) {
            prevArrow.onclick = (e) => {
                e.stopPropagation();
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = totalItems - 1;
                showImage(newIndex);
            };
        }
        if (nextArrow) {
            nextArrow.onclick = (e) => {
                e.stopPropagation();
                let newIndex = currentIndex + 1;
                if (newIndex >= totalItems) newIndex = 0;
                showImage(newIndex);
            };
        }
    });

    // Get or create side buttons
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    // Remove existing mobile controls if any
    const existingControls = galleryWrapper?.querySelector('.gallery-mobile-controls');
    if (existingControls) existingControls.remove();

    // Create mobile navigation - arrows at TOP + counter/progress at bottom
    if (isMobile && galleryWrapper) {
        // Remove any existing mobile nav to avoid duplicates
        const existingNav = galleryWrapper.querySelector('.gallery-mobile-nav');
        if (existingNav) existingNav.remove();
        const existingControls = galleryWrapper.querySelector('.gallery-mobile-controls');
        if (existingControls) existingControls.remove();


        // Insert controls at the bottom with arrows + counter + progress bar
        const controlsHTML = `
            <div class="gallery-mobile-controls">
                <span class="gallery-mobile-counter">(1/${totalItems})</span>
                <div class="gallery-mobile-progress">
                    <div class="gallery-mobile-progress-bar" style="width: ${(1/totalItems)*100}%"></div>
                </div>
            </div>
        `;
        galleryWrapper.insertAdjacentHTML('beforeend', controlsHTML);

        // Get fresh references and add click handlers
        const mobilePrev = galleryWrapper.querySelector('.gallery-mobile-prev');
        const mobileNext = galleryWrapper.querySelector('.gallery-mobile-next');

        if (mobilePrev) {
            mobilePrev.onclick = (e) => {
                e.preventDefault();
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = totalItems - 1;
                showImage(newIndex);
            };
        }
        if (mobileNext) {
            mobileNext.onclick = (e) => {
                e.preventDefault();
                let newIndex = currentIndex + 1;
                if (newIndex >= totalItems) newIndex = 0;
                showImage(newIndex);
            };
        }
    }

    function showImage(index) {
        // Wrap around
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;

        const prevIndex = currentIndex;
        currentIndex = index;

        // Determine slide direction
        let direction = 'fade';
        if (window.innerWidth <= 768) {
            if (currentIndex > prevIndex || (prevIndex === totalItems - 1 && currentIndex === 0)) {
                direction = 'right';
            } else if (currentIndex < prevIndex || (prevIndex === 0 && currentIndex === totalItems - 1)) {
                direction = 'left';
            }
        }

        if (window.innerWidth > 768) {
            // Desktop: Show 3 images at a time in a grid
            const itemsPerPage = 3;
            const currentPage = Math.floor(currentIndex / itemsPerPage);

            // Show items from current page, hide others with animation
            galleryItems.forEach((item, i) => {
                const itemPage = Math.floor(i / itemsPerPage);
                const colIndex = i % 3;

                // Clear previous animation classes
                item.classList.remove('slide-in-left', 'slide-in-right', 'fade-in', 'is-visible');

                if (itemPage === currentPage) {
                    item.style.display = 'block';
                    // Small stagger based on column position for beautiful reveal
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, colIndex * 100);
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            // Mobile: Show only current image with slide animation
            galleryItems.forEach((item, i) => {
                // Clear previous animation classes
                item.classList.remove('slide-in-left', 'slide-in-right', 'fade-in', 'is-visible');

                if (i === currentIndex) {
                    item.style.display = 'block';
                    // Trigger reflow to restart animation
                    void item.offsetWidth;

                    // Add appropriate animation class based on direction
                    if (direction === 'right') {
                        item.classList.add('slide-in-right');
                    } else if (direction === 'left') {
                        item.classList.add('slide-in-left');
                    } else {
                        item.classList.add('fade-in');
                    }
                    item.classList.add('active');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
        }

        // Update counter and progress bar (mobile style)
        const counter = galleryWrapper?.querySelector('.gallery-mobile-counter');
        const progressBar = galleryWrapper?.querySelector('.gallery-mobile-progress-bar');

        if (counter) {
            counter.textContent = `(${currentIndex + 1}/${totalItems})`;
        }
        if (progressBar) {
            progressBar.style.width = `${((currentIndex + 1)/totalItems)*100}%`;
        }
    }

    // Desktop side button handlers - change one image at a time in circular motion
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = totalItems - 1; // Wrap to last image
            showImage(newIndex);
        };
    }
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            let newIndex = currentIndex + 1;
            if (newIndex >= totalItems) newIndex = 0; // Wrap to first image
            showImage(newIndex);
        };
    }

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    galleryGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    galleryGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next
                showImage(currentIndex + 1);
            } else {
                // Swiped right - previous
                showImage(currentIndex - 1);
            }
        }
    }

    // Handle resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            // Just re-initialize the whole gallery on breakpoint change
            initGallery();
        }
    });

    // Initialize first image
    showImage(0);
}

gsap.registerPlugin(ScrollTrigger);
function initScrollAnimations() {

    const sections = [
        ".project-info-section",
        ".project-about-section",
        ".gallery-wrapper",
        ".next-project-section"
    ];

    sections.forEach(section => {

        gsap.from(section, {

            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }

        });

    });

    // Gallery items scroll reveal with stagger
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Use IntersectionObserver for gallery items
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, (index % 3) * 100); // Stagger by column position
                    galleryObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        galleryItems.forEach(item => {
            galleryObserver.observe(item);
        });
    }

}

gsap.from(".about-text p", {

    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,

    scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%"
    }

});

gsap.from(".next-project-content", {

    opacity: 0,
    x: -80,
    duration: 1,

    scrollTrigger: {
        trigger: ".next-project-section",
        start: "top 70%"
    }

});
