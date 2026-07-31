document.addEventListener('DOMContentLoaded', function() {
    if (typeof initCTAFooterTransition === 'function') {
        initCTAFooterTransition();
    }

    // Initialize footer animations (fade in)
    if (typeof initFooterAnimations === 'function') {
        initFooterAnimations();
    }

    initAboutProjectPanel();
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
galleryIndex = 0;
setTimeout(renderGallery, 0);
}
document.addEventListener("DOMContentLoaded",()=>{

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id")) || 1;

    const project =
        projects.find(p=>p.id===id) || projects[0];

    loadProject(project);
    initGallerySlider();
});

// Gallery Slider Functionality
function initGallerySlider(){
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if(!galleryItems.length) return;

    let currentIndex = 0;
    const totalItems = galleryItems.length;

    // Create slider container wrapper if not exists
    let sliderContainer = galleryGrid.parentElement.querySelector('.gallery-slider-container');
    if(!sliderContainer && window.innerWidth > 768){
        // Desktop: wrap in slider for horizontal scroll
        sliderContainer = document.createElement('div');
        sliderContainer.className = 'gallery-slider-container';
        sliderContainer.style.overflow = 'hidden';
        sliderContainer.style.width = '100%';
        galleryGrid.parentElement.insertBefore(sliderContainer, galleryGrid);
        sliderContainer.appendChild(galleryGrid);
        galleryGrid.style.display = 'flex';
        galleryGrid.style.transition = 'transform 0.5s ease';
    }

    // Desktop: Add arrows to navigate between images
    if(window.innerWidth > 768){
        // Create container for navigation arrows (positioned outside grid)
        const navContainer = document.createElement('div');
        navContainer.className = 'gallery-desktop-nav';
        navContainer.style.display = 'flex';
        navContainer.style.justifyContent = 'space-between';
        navContainer.style.marginTop = '24px';
        navContainer.style.gap = '16px';

        // Left arrow (prev)
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-nav-btn-desktop prev';
        prevBtn.innerHTML = '&larr;';
        prevBtn.style.cssText = 'width:56px;height:56px;border:1px solid var(--color-brown);background:transparent;color:var(--color-brown);font-size:18px;cursor:pointer;transition:all 0.3s ease;';
        prevBtn.onmouseenter = () => { prevBtn.style.background = 'var(--color-brown)'; prevBtn.style.color = '#fff'; };
        prevBtn.onmouseleave = () => { prevBtn.style.background = 'transparent'; prevBtn.style.color = 'var(--color-brown)'; };
        prevBtn.onclick = () => showImage(currentIndex - 1);

        // Right arrow (next)
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-nav-btn-desktop next';
        nextBtn.innerHTML = '&rarr;';
        nextBtn.style.cssText = 'width:56px;height:56px;border:1px solid var(--color-brown);background:transparent;color:var(--color-brown);font-size:18px;cursor:pointer;transition:all 0.3s ease;';
        nextBtn.onmouseenter = () => { nextBtn.style.background = 'var(--color-brown)'; nextBtn.style.color = '#fff'; };
        nextBtn.onmouseleave = () => { nextBtn.style.background = 'transparent'; nextBtn.style.color = 'var(--color-brown)'; };
        nextBtn.onclick = () => showImage(currentIndex + 1);

        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        galleryGrid.after(navContainer);
    }

    // Add mobile controls (counter + progress bar)
    if(window.innerWidth <= 768){
        // Mobile: Add arrows to each item
        galleryItems.forEach((item, index) => {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'gallery-arrow prev';
            prevBtn.innerHTML = '&larr;';
            prevBtn.onclick = (e) => { e.stopPropagation(); showImage(index - 1); };

            const nextBtn = document.createElement('button');
            nextBtn.className = 'gallery-arrow next';
            nextBtn.innerHTML = '&rarr;';
            nextBtn.onclick = (e) => { e.stopPropagation(); showImage(index + 1); };

            item.appendChild(prevBtn);
            item.appendChild(nextBtn);
        });

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'gallery-mobile-controls';
        controlsDiv.innerHTML = `
            <span class="gallery-counter">(1/${totalItems})</span>
            <div class="gallery-progress">
                <div class="gallery-progress-bar" style="width: ${(1/totalItems)*100}%"></div>
            </div>
        `;
        galleryGrid.after(controlsDiv);
    }

    function showImage(index){
        // Wrap around
        if(index < 0) index = totalItems - 1;
        if(index >= totalItems) index = 0;

        currentIndex = index;

        // On mobile, show only current image
        galleryItems.forEach((item, i) => {
            if(window.innerWidth <= 768){
                item.classList.toggle('active', i === currentIndex);
            }
        });

        // Update counter and progress bar
        const counter = document.querySelector('.gallery-counter');
        const progressBar = document.querySelector('.gallery-progress-bar');
        if(counter){
            counter.textContent = `(${currentIndex + 1}/${totalItems})`;
        }
        if(progressBar){
            progressBar.style.width = `${((currentIndex + 1)/totalItems)*100}%`;
        }
    }

    // Show first image initially
    showImage(0);
}

let startX=0;

const slider=document.querySelector(".project-slider-track");

slider.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

});

slider.addEventListener("touchend",e=>{

const endX=e.changedTouches[0].clientX;

if(startX-endX>60){

nextSlide();
}

if(endX-startX>60){

prevSlide();
}

});



/* ===========================
   BOTTOM GALLERY
=========================== */

let galleryIndex = 0;

function renderGallery() {

    if (!project || !project.gallery.length) return;

    const images = project.gallery;
    const total = images.length;

    document.getElementById("thumb1").src =
        images[galleryIndex % total];

    document.getElementById("thumb2").src =
        images[(galleryIndex + 1) % total];

    document.getElementById("thumb3").src =
        images[(galleryIndex + 2) % total];
}

function nextGallery() {

    galleryIndex++;

    if (galleryIndex >= project.gallery.length) {
        galleryIndex = 0;
    }

    renderGallery();
}

document.addEventListener("DOMContentLoaded", () => {

    renderGallery();

    const nextBtn = document.querySelector(".gallery-nav-btn");

    if (nextBtn) {
        nextBtn.addEventListener("click", nextGallery);
    }

});
gsap.registerPlugin(ScrollTrigger);
function initScrollAnimations() {

    const sections = [
        ".project-info-section",
        ".project-about-section",
        ".gallery-grid",
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

}

document.addEventListener("DOMContentLoaded", () => {

    initScrollAnimations();

});
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
gsap.from(".gallery-item", {

    opacity: 0,
    y: 60,
    stagger: 0.2,
    duration: 0.8,

    scrollTrigger: {
        trigger: ".gallery-grid",
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
document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth > 768) return;

    const items = document.querySelectorAll(".gallery-item");
    const prev = document.querySelector(".gallery-prev-btn");
    const next = document.querySelector(".gallery-next-btn");

    let index = 0;

    function showSlide(i){

        items.forEach(item => item.classList.remove("active"));

        if(i < 0)
            index = items.length - 1;
        else if(i >= items.length)
            index = 0;
        else
            index = i;

        items[index].classList.add("active");
    }

    showSlide(0);

    next.addEventListener("click", () => {
        showSlide(index + 1);
    });

    prev.addEventListener("click", () => {
        showSlide(index - 1);
    });

    // Swipe Support
    let startX = 0;
    let endX = 0;

    const gallery = document.querySelector(".gallery-grid");

    gallery.addEventListener("touchstart",(e)=>{
        startX = e.changedTouches[0].clientX;
    });

    gallery.addEventListener("touchend",(e)=>{

        endX = e.changedTouches[0].clientX;

        if(startX - endX > 50){
            showSlide(index + 1);
        }

        if(endX - startX > 50){
            showSlide(index - 1);
        }

    });

});