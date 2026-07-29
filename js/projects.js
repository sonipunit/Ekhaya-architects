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

    // Gallery



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

renderGallery();
}
document.addEventListener("DOMContentLoaded",()=>{

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id")) || 1;

    const project =
        projects.find(p=>p.id===id) || projects[0];

    loadProject(project);
});
function revealSlide(next){

const current=document.querySelector(".project-slider-image.active");

const incoming=document.createElement("img");

incoming.src=project.gallery[next];

incoming.className="project-slider-image";

incoming.style.position="absolute";
incoming.style.top=0;
incoming.style.left="100%";

document.querySelector(".project-slider-track")
.appendChild(incoming);

gsap.timeline({

onComplete(){

current.remove();

incoming.classList.add("active");
}
})
.to(current,{
x:"-100%",
duration:.7,
ease:"power3.inOut"
},0)

.to(incoming,{
left:0,
duration:.7,
ease:"power3.inOut"
},0);

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
gsap.to(".gallery-grid",{

x:-80,
opacity:0,

duration:.45,

onComplete:updateGallery
});
gsap.from(".gallery-grid",{

x:80,

opacity:0,

duration:.55
});
function renderGallery() {

    heroImage.src = gallery[currentIndex];

    thumbs[0].src = gallery[(currentIndex + 1) % gallery.length];

    thumbs[1].src = gallery[(currentIndex + 2) % gallery.length];

    thumbs[2].src = gallery[(currentIndex + 3) % gallery.length];

}
function nextGallery() {

    currentIndex++;

    if(currentIndex >= gallery.length){

        currentIndex = 0;

    }

    animateGallery();

}
function prevGallery(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = gallery.length-1;

    }

    animateGallery();

}
function animateGallery(){

    gsap.to(".gallery-wrapper",{

        x:-80,
        opacity:0,

        duration:.35,

        ease:"power2.in",

        onComplete:()=>{

            renderGallery();

            gsap.fromTo(".gallery-wrapper",
            {
                x:80,
                opacity:0
            },
            {
                x:0,
                opacity:1,
                duration:.45,
                ease:"power2.out"
            });

        }

    });

}
const hero = document.getElementById("galleryHeroImage");

const thumbs = [
    document.getElementById("thumb1"),
    document.getElementById("thumb2"),
    document.getElementById("thumb3")
];

let galleryIndex = 0;

function renderGallery(){

    const images = project.gallery;
    const total = images.length;

    hero.src = images[galleryIndex];

    thumbs[0].src = images[(galleryIndex + 1) % total];
    thumbs[1].src = images[(galleryIndex + 2) % total];
    thumbs[2].src = images[(galleryIndex + 3) % total];

}
