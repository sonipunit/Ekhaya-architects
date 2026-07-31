/* =============================================
   Immediate loader check - hide on non-index pages
   ============================================= */
(function() {
    const loaderEl = document.getElementById('loader');
    if (!loaderEl) {
        // No loader element on this page, ensure body is visible immediately
        document.body.style.opacity = '1';
    }
})();

/* =============================================
   DOM references
   ============================================= */
const loaderCounter = document.querySelector('.loader-counter');
const loader = document.getElementById('loader');
const heroImage = document.querySelector('.hero-image');
const menuPanel = document.getElementById('menuPanel');
const contactPanel = document.getElementById('contactPanel');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');
const heroSubtitle = document.querySelector('.hero-subtitle');

const panels = {
    menu: menuPanel,
    contact: contactPanel
};

/* =============================================
   Text Rotation for Hero Subtitle
   ============================================= */
function initTextRotation() {
    // Using CSS animation for hero rotating text
}

/* =============================================
   Loader - Index page only
   ============================================= */
/* =============================================
   Loader - Only on Page Refresh / Reload
   ============================================= */


if (loader) {

    // Detect how this page was opened
    const navigation =
        performance.getEntriesByType("navigation")[0];

    const isReload =
        navigation && navigation.type === "reload";

    if (isReload) {

        document.body.style.overflow = "hidden";

        let progress = 0;

        loader.style.display = "flex";
        loader.style.visibility = "visible";
        loader.style.opacity = "1";

        const interval = setInterval(() => {

            progress++;

            if (loaderCounter) {
                loaderCounter.innerHTML = progress + "%";
            }

            if (progress >= 100) {

                clearInterval(interval);

                gsap.to(loader,{
                    y:"-100%",
                    duration:0.8,
                    ease:"power3.inOut",
                    onComplete(){

                        loader.style.display="none";
                        document.body.style.overflow="";

                        animateHero();
                        initTextRotation();
                        initScrollAnimations();

                    }
                });

            }

        },20);

    } else {

        loader.style.display="none";
        document.body.style.overflow="";

        animateHero();
        initTextRotation();
        initScrollAnimations();

    }

}
function finishLoading() {
    animateHero();
    initTextRotation();

    if (loader) {
        gsap.to(loader, {
            y: '-100%',
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                loader.style.visibility = 'hidden';
                loader.style.pointerEvents = 'none';
                initScrollAnimations();
            }
        });
    }
}

/* =============================================
   Hero animation
   ============================================= */
function animateHero() {
    const ease = 'power3.out';

    gsap.from('.navbar', { y: -40, opacity: 0, duration: 0.7, ease });
    gsap.from('.hero-title', { y: 60, opacity: 0, duration: 0.9, ease });
    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.9, delay: 0.12, ease });
    gsap.from('.scroll-down', { y: 16, opacity: 0, duration: 0.7, delay: 0.25, ease });
    gsap.to('.hero-image', { scale: 1, duration: 1.2, ease: 'power2.out' });
}

/* =============================================
   Panels
   ============================================= */
const panelOverlay = document.createElement('div');
panelOverlay.className = 'panel-overlay';
document.body.appendChild(panelOverlay);

function openPanel(name) {
    Object.entries(panels).forEach(([key, panel]) => {
        if (panel) {
            panel.classList.toggle('is-open', key === name);
        }
    });

    panelOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
}

function closePanel(name) {
    if (panels[name]) {
        panels[name].classList.remove('is-open');
    }

    // Check if any panel is still open
    const anyPanelOpen = Object.values(panels).some(panel => panel?.classList.contains('is-open'));
    if (!anyPanelOpen) {
        panelOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
    }
}

// Close panels when overlay is clicked
panelOverlay.addEventListener('click', () => {
    closePanel('menu');
    closePanel('contact');
});

// Event listeners for panels
document.querySelector('.menu-btn')?.addEventListener('click', () => openPanel('menu'));
document.querySelector('.contact-btn')?.addEventListener('click', () => openPanel('contact'));
menuPanel?.querySelector('.panel-close')?.addEventListener('click', () => closePanel('menu'));
contactPanel?.querySelector('.panel-close')?.addEventListener('click', () => closePanel('contact'));

// Contact triggers in footer
document.querySelectorAll('.contact-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => openPanel('contact'));
});

// Close panels on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePanel('menu');
        closePanel('contact');
        panelOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
    }
});

/* =============================================
   Navbar scroll effect
   ============================================= */
let lastScroll = 0;
const navbarLogo = document.getElementById('navbarLogo');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Navbar background and logo swap
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
            if (navbarLogo) {
                navbarLogo.src = './images/logo-dark.png';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (navbarLogo) {
                navbarLogo.src = './images/Logosmall.png';
            }
        }
    }

    // Back to top button
    if (backToTop) {
        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Hero parallax
    if (heroImage && currentScroll < window.innerHeight) {
        heroImage.style.transform = `translateY(${currentScroll * 0.3}px) scale(1)`;
    }

    lastScroll = currentScroll;
});

/* =============================================
   Smooth scroll to top
   ============================================= */
backToTop?.addEventListener('click', () => {
    const scrollDuration = 15;
    const startPosition = window.scrollY;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const easeProgress = easeOutCubic(progress);

        window.scrollTo(0, startPosition * (1 - easeProgress));

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
});

/* =============================================
   Scroll down click
   ============================================= */
document.querySelector('.scroll-down')?.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
});


/* =============================================
   About Section - Horizontal Scroll Slider
   ============================================= */
function initAboutSlider() {
    const aboutSection = document.querySelector('.about-section');
    const aboutSlider = document.getElementById('aboutSlider');
    const sliderTrack = aboutSlider?.querySelector('.slider-track');
    const images = aboutSlider?.querySelectorAll('.slider-track .slider-image');
    const prevBtn = aboutSlider?.querySelector('.slider-btn.prev');
    const nextBtn = aboutSlider?.querySelector('.slider-btn.next');
    const currentEl = document.getElementById('currentSlide');
    const totalEl = document.getElementById('totalSlides');
    const progressFill = aboutSlider?.querySelector('.slider-progress-fill');

    if (!aboutSlider || !images || images.length === 0 || !sliderTrack) return;

    let index = 0;
    const total = images.length;

    // Set total slides
    if (totalEl) totalEl.textContent = total;

    function showImage(i, progress = null) {
        // Horizontal slide
        sliderTrack.style.transform = `translateX(-${i * 100}%)`;
        if (currentEl) currentEl.textContent = i + 1;
        if (progressFill) {
            const fillPercent = progress !== null ? progress * 100 : ((i + 1) / total) * 100;
            progressFill.style.width = fillPercent + '%';
        }
    }

    // Next button click
    nextBtn?.addEventListener('click', () => {
        index++;
        if (index >= total) index = 0;
        showImage(index);
    });

    // Previous button click
    prevBtn?.addEventListener('click', () => {
        index--;
        if (index < 0) index = total - 1;
        showImage(index);
    });

    // Scroll-based horizontal sliding with pinning
    if (aboutSection) {
        ScrollTrigger.create({
            trigger: aboutSection,
            start: 'top 15%',
            end: '+=250%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                index = Math.min(Math.floor(progress * total), total - 1);
                showImage(index, progress);
            }
        });
    }

    // Initialize first slide
    showImage(0);
}

/* =============================================
   Video autoplay on scroll with audio - reset on scroll away
   ============================================= */
const videoSection = document.querySelector('.video-section');
const videoPlayer = document.getElementById('mainVideo');
let videoPlaying = false;

if (videoPlayer && videoSection && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;

            // When section is fully visible (ratio === 1) and not already playing
            if (entry.isIntersecting && ratio === 1 && !videoPlaying) {
                // Fade out preview and text
                videoSection.classList.add('has-played');
                videoSection.classList.add('is-playing');

                // Play video with audio
                videoPlayer.muted = true;
                videoPlayer.volume = 1;
                videoPlayer.play().catch(err => {
                    // Fallback to muted if audio blocked
                    videoPlayer.play();
                });

                videoPlaying = true;
            }
            // When section leaves view (scrolled away) - reset everything
            else if (!entry.isIntersecting && videoPlaying) {
                // Pause video
                videoPlayer.pause();
                videoPlayer.currentTime = 0;

                // Show preview and text overlay again
                videoSection.classList.remove('has-played');
                videoSection.classList.remove('is-playing');

                // Reset playing state so it can play again when scrolling back
                videoPlaying = false;
            }
        });
    }, {
        threshold: [0, 0.5, 0.95, 1],
        rootMargin: '0px'
    });

    videoObserver.observe(videoSection);
}

/* =============================================
   Team video autoplay on scroll with audio - immediately on reach
   ============================================= */
const teamSection = document.querySelector('.team-section');
const teamVideo = document.getElementById('teamVideo');
let teamVideoPlaying = false;
let teamVideoHasPlayedOnce = false;

if (teamVideo && teamSection && 'IntersectionObserver' in window) {
    const teamVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;

            // When section enters viewport (any visibility) - play immediately
            if (entry.isIntersecting && ratio > 0.1 && !teamVideoPlaying) {
                // Play video with audio
                teamVideo.muted = false;
                teamVideo.volume = 1;

                // Try to play with audio, fallback to muted if blocked
                const playPromise = teamVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(err => {
                        console.log('Autoplay with audio blocked, trying muted:', err);
                        teamVideo.muted = true;
                        teamVideo.play().catch(e => console.log('Play failed:', e));
                    });
                }
                teamVideoPlaying = true;
                teamVideoHasPlayedOnce = true;
            }
            // When section leaves view - pause
            else if (!entry.isIntersecting && teamVideoPlaying) {
                teamVideo.pause();
                teamVideoPlaying = false;
            }
        });
    }, {
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 1],
        rootMargin: '-50px 0px -50px 0px'
    });

    teamVideoObserver.observe(teamSection);

    // Also try playing when user interacts with page (for audio autoplay policies)
    const enableAudio = () => {
        if (teamVideoHasPlayedOnce && teamVideo.muted) {
            teamVideo.muted = false;
            teamVideo.play().catch(() => {});
        }
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('scroll', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    // Remove scroll listener after first scroll
    const scrollListener = () => {
        enableAudio();
        document.removeEventListener('scroll', scrollListener);
    };
    document.addEventListener('scroll', scrollListener);
}

/* =============================================
   Scroll Reveal Animations with GSAP ScrollTrigger
   ============================================= */
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // About section animations
    gsap.from('.about-left .section-label', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.about-link', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
    });

    // Portfolio section animations
    gsap.from('.portfolio-header', {
        scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.portfolio-item', {
        scrollTrigger: {
            trigger: '.portfolio-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });


    // Team section
    gsap.from('.team-content', {
        scrollTrigger: {
            trigger: '.team-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    gsap.from('.team-image', {
        scrollTrigger: {
            trigger: '.team-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });

    // CTA section
    gsap.from('.cta-container', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
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

    // Smooth parallax effect for footer background
    // gsap.to('.footer-bg', {
    //     scrollTrigger: {
    //         trigger: '.footer-hero',
    //         start: 'top bottom',
    //         end: 'bottom top',
    //         scrub: 1
    //     },
    //     y: '10%',
    //     ease: 'none'
    // });

    console.log('Footer animations initialized');
}

/* =============================================
   Initialize Footer Animations Only
   ============================================= */
function initFooterAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Footer CTA animations
    gsap.from('.footer-cta-left', {
        scrollTrigger: {
            trigger: '.footer-hero',
            start: 'top 75%',
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
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
    });

    // Footer info section
    gsap.from('.footer-info > div', {
        scrollTrigger: {
            trigger: '.footer-info',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
    });

    console.log('Footer animations explicit init');
}

/* =============================================
   Contact form
   ============================================= */
contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    data.phone = `+91 ${data.phone}`;

    // Show success message
    const submitBtn = contactForm.querySelector('.btn--submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'SENT ✓';
    submitBtn.style.background = '#4a7c59';

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
        closePanel('contact');
    }, 2000);

    console.log('Contact Form Data:', data);
});

/* =============================================
   Smooth anchor scrolling for menu links
   ============================================= */
document.querySelectorAll('.panel--menu nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                closePanel('menu');
                panelOverlay.classList.remove('is-active');
                document.body.style.overflow = '';
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    });
});

/* =============================================
   Image lazy loading with fade effect
   ============================================= */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                };
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* =============================================
   CTA to Footer Flawless Curtain Reveal
   ============================================= */
function initCTAFooterTransition() {
    const ctaWrap = document.querySelector('.cta-wrap');
    const ctaSection = document.querySelector('.cta-section');
    const footerSection = document.querySelector('.footer-section');

    if (!ctaWrap || !footerSection) return;

    // Full curtain reveal animation for all screen sizes
    gsap.registerPlugin(ScrollTrigger);

    const startColor = [160, 128, 96];
    const endColor = [15, 12, 10]; // Darker brown-black for seamless blend

    function interpolateColor(color1, color2, factor) {
        const r = Math.round(color1[0] + factor * (color2[0] - color1[0]));
        const g = Math.round(color1[1] + factor * (color2[1] - color1[1]));
        const b = Math.round(color1[2] + factor * (color2[2] - color1[2]));
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Create timeline for flawless synced animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ctaWrap,
            start: 'center center',
            end: '+=200%',
            scrub: 0.5,
            pin: ctaWrap,
            anticipatePin: 1
        }
    });

    // CTA: gradual zoom (text stays visible throughout)
    tl.to(ctaSection, {
        scale: 1.2,
        ease: 'none',
        duration: 1
    }, 0);

    // CTA background color transition - blends to dark brown to match footer image
    tl.to(ctaWrap, {
        ease: 'power1.inOut',
        duration: 1,
        onUpdate: function() {
            const progress = this.progress();
            // Blend from brown to darker brown-black for seamless footer blend
            const blendedColor = interpolateColor(startColor, endColor, progress);
            ctaSection.style.backgroundColor = blendedColor;
        }
    }, 0);

    // Ensure footer is already visible and positioned correctly
    gsap.set(footerSection, { yPercent: 0, position: 'relative' });

    // Ensure footer overlay is visible by default
    const footerOverlay = footerSection.querySelector('.footer-overlay');
    if (footerOverlay) {
        gsap.set(footerOverlay, { opacity: 1 });
    }
}

console.log('Ekhaya Architects - Website Loaded');

/* =============================================
   Portfolio Data
   ============================================= */
const projects = [
{
    id:1,
    name: "Project Ginger",
    title:"Project Ginger",
    year: "2025",
    image: "./images/ginger.png",
    heroImage:"./images/bg.png",
    cover:"./images/ginger.png",
    category:"Homestay",
    location:"Coorg, Karnataka",
    team:"Principal Architect — Ar. Vachan Bojamma",
about:[
"Nestled amidst the misty hills and spice-laden forests of Coorg, Project Ginger is a thoughtfully designed homestay that invites guests to experience the quiet beauty of the Western Ghats.",

"The architecture draws from the region's vernacular traditions, sloping terracotta roofs, timber framed verandas, and natural stone while weaving in contemporary comforts that make every stay effortless.",

"Surrounded by coffee and cardamom plantations, the property is designed to blur the boundary between indoors and out, letting the landscape become an extension of every living space."
],
    gallery:[
        "./images/ginger.png",
        "./images/hatti.png",
        "./images/river.png",
        "./images/suvai.png",
    ]
},
{
    id:2,
    name: "Project Hatti Hole",
    title:"Project Hatti Hole",
    year: "2025",
    image: "./images/hatti.png",
    heroImage:"./images/hatti.png",
    cover:"./images/hatti.png",
    category:"Apartment",
    location:"Coorg",
    team:"Principal Architect — Ar. Vachan Bojamma",
    about:[
        "Hatti Hole project description..."
    ],
    gallery:[
        "./images/hatti.png",
        "./images/river.png",
        "./images/suvai.png",
        "./images/suvai.png",
    ]
},
{
        id: 3,
        name: "Project River",
        category: "House",
        year: "2025",
        image: "./images/river.png",
        name: "Project River",
        title:"Project River",
        year: "2025",
        image: "./images/river.png",
        heroImage:"./images/river.png",
        cover:"./images/river.png",
        category:"Apartment",
        location:"Coorg",
        team:"Principal Architect — Ar. Vachan Bojamma",
        about:[
            "River project description..."
        ],
        gallery:[
            "./images/hatti.png",
            "./images/river.png",
            "./images/suvai.png",
            "./images/suvai.png",
        ]
},
{
        id: 4,
        name: "Project Suvai",
        category: "House",
        year: "2025",
        image: "./images/river.png",
        name: "Project Suvai",
        title:"Project Suvai",
        year: "2025",
        image: "./images/suvai.png",
        heroImage:"./images/suvai.png",
        cover:"./images/suvai.png",
        category:"Apartment",
        location:"Coorg",
        team:"Principal Architect — Ar. Vachan Bojamma",
        about:[
            "Suvaiproject description..."
        ],
        gallery:[
            "./images/hatti.png",
            "./images/river.png",
            "./images/suvai.png",
            "./images/suvai.png",
        ]
    }
];

/* =============================================
   Portfolio Rendering - Desktop & Mobile Carousel
   ============================================= */
const portfolioList = document.getElementById('portfolioList');
const portfolioPreview = document.getElementById('portfolioPreview');
const previewImg = portfolioPreview?.querySelector('img');
const portfolioTrack = document.getElementById('portfolioTrack');

let portfolioIndex = 0;

function renderPortfolio() {
    if (!portfolioList) return;

    // Render desktop project rows
    portfolioList.innerHTML = projects.map((project, index) => `
        <div class="project-row ${index === 0 ? 'active' : ''}" data-index="${index}">
            <span class="project-num">0${index + 1}.</span>
            <span class="project-name">${project.name}</span>
            <div class="project-meta-col">
                <span class="project-category">${project.category}</span>
                <span class="project-year">${project.year}</span>
            </div>
            <span class="project-arrow">→</span>
        </div>
    `).join('');

    // Render mobile carousel images
    if (portfolioTrack) {
        portfolioTrack.innerHTML = projects.map((project, index) => `
            <img src="${project.image}" alt="${project.name}" class="portfolio-carousel-image ${index === 0 ? 'active' : ''}" data-index="${index}">
        `).join('');
    }

    // Set initial state
    portfolioIndex = 0;
    updatePortfolioCarousel(0);

    initPortfolioInteractions();
    initPortfolioCarousel();
}

function updatePortfolioCarousel(index) {
    portfolioIndex = index;
    const project = projects[index];

    // Update images
    document.querySelectorAll('.portfolio-carousel-image').forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });

    // Update text elements
    const currentNum = document.getElementById('portfolioCurrentNum');
    const currentName = document.getElementById('portfolioCurrentName');
    document.getElementById("portfolioDetailLink").href =`projects.html?id=${project.id}`;
    const current = document.getElementById('portfolioCurrent');
    const total = document.getElementById('portfolioTotal');
    const progressBar = document.getElementById('portfolioProgressBar');
    const progressFill = document.getElementById('portfolioProgressFill');
    const counterOverlay = document.getElementById('portfolioCounterOverlay');

    if (currentNum) currentNum.textContent = `0${index + 1}.`;
    if (currentName) currentName.textContent = project.name.toUpperCase();
    if (current) current.textContent = index + 1;
    if (total) total.textContent = projects.length;
    if (progressBar) progressBar.style.width = `${((index + 1) / projects.length) * 100}%`;
    if (progressFill) progressFill.style.width = `${((index + 1) / projects.length) * 100}%`;
    if (counterOverlay) counterOverlay.textContent = `${index + 1} / ${projects.length}`;
}

function initPortfolioCarousel() {
    // Navigation buttons on image
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = portfolioIndex - 1;
            if (newIndex < 0) newIndex = projects.length - 1;
            updatePortfolioCarousel(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = portfolioIndex + 1;
            if (newIndex >= projects.length) newIndex = 0;
            updatePortfolioCarousel(newIndex);
        });
    }

    // Click on nav row to advance
    const nav = document.getElementById('portfolioCarouselNav');
    if (nav) {
        nav.addEventListener('click', () => {
            let newIndex = portfolioIndex + 1;
            if (newIndex >= projects.length) newIndex = 0;
            updatePortfolioCarousel(newIndex);
        });
    }

    // Swipe support on track
    const track = document.getElementById('portfolioTrack');
    if (track) {
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - next
                    let newIndex = portfolioIndex + 1;
                    if (newIndex >= projects.length) newIndex = 0;
                    updatePortfolioCarousel(newIndex);
                } else {
                    // Swiped right - previous
                    let newIndex = portfolioIndex - 1;
                    if (newIndex < 0) newIndex = projects.length - 1;
                    updatePortfolioCarousel(newIndex);
                }
            }
        }
    }
}

function initPortfolioInteractions() {
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach(row => {
        const index = parseInt(row.dataset.index);

        // Mouse enter - show center image
        row.addEventListener('mouseenter', () => {
            if (previewImg) {
                previewImg.src = projects[index].image;
            }
            portfolioPreview?.classList.add('active');
            row.classList.add('active');
        });

        // Mouse leave - hide image
        row.addEventListener('mouseleave', () => {
            portfolioPreview?.classList.remove('active');
            row.classList.remove('active');
        });

        // Click to navigate to project page
        row.addEventListener('click', () => {
            const projectId = projects[index].id;
            window.location.href = `projects.html?id=${projectId}`;
        });
    });
}
const images=document.querySelectorAll(".gallery-image");

const next=document.querySelector(".next");

const prev=document.querySelector(".prev");

const current=document.getElementById("current");

const progress=document.querySelector(".gallery-progress-bar");

let index=0;

const total=images.length;

document.getElementById("total").textContent=total;

function showImage(i){

    images.forEach(img=>img.classList.remove("active"));

    images[i].classList.add("active");

    current.textContent=i+1;

    progress.style.width=((i+1)/total)*100+"%";
}

next.addEventListener("click",()=>{

    index++;

    if(index>=total){

        index=0;
    }

    showImage(index);

});

prev.addEventListener("click",()=>{

    index--;

    if(index<0){

        index=total-1;
    }

    showImage(index);

});

showImage(index);
setInterval(()=>{

    index++;

    if(index>=total){

        index=0;
    }

    showImage(index);

},5000);

// Add touch swipe support for gallery (mobile)
function initGallerySwipe() {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    galleryTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    }, { passive: true });

    function handleGallerySwipe() {
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next
                index++;
                if (index >= total) index = 0;
                showImage(index);
            } else {
                // Swiped right - previous
                index--;
                if (index < 0) index = total - 1;
                showImage(index);
            }
        }
    }
}

initGallerySwipe();

// Initialize portfolio
renderPortfolio();

// Initialize CTA to footer transition
// Wait for footer to be loaded if using dynamic injection
if (document.querySelector('.footer-section')) {
    // Footer already exists (inline in HTML)
    initCTAFooterTransition();
} else {
    // Wait for dynamic footer injection
    window.addEventListener('footerLoaded', () => {
        initCTAFooterTransition();
    });

    // Fallback: init after a timeout in case event doesn't fire
    setTimeout(() => {
        const footer = document.querySelector('.footer-section');
        if (footer) {
            initCTAFooterTransition();
        }
    }, 1000);
}