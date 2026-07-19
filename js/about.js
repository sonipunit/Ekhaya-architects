// =============================================
// About Page JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initBrandValues();
    initTeamScroll();
    initTeamModal();
});

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
// Team Horizontal Scroll with Navigation
// -----------------------------------------
function initTeamScroll() {
    const wrapper = document.getElementById('teamScrollWrapper');
    const scrollThumb = document.querySelector('.team-scroll-thumb');
    const prevBtn = document.getElementById('teamPrev');
    const nextBtn = document.getElementById('teamNext');
    const cards = document.querySelectorAll('.team-member-card');

    if (!wrapper || !cards.length) return;

    const cardWidth = cards[0].offsetWidth + 60; // card width + gap
    const totalCards = cards.length;
    let currentIndex = 0;

    function updateThumb() {
        if (!scrollThumb) return;
        const scrollWidth = wrapper.scrollWidth - wrapper.clientWidth;
        const scrollLeft = wrapper.scrollLeft;
        const progress = scrollLeft / scrollWidth;
        scrollThumb.style.width = ((currentIndex + 1) / totalCards * 100) + '%';
    }

    function scrollToCard(index) {
        currentIndex = Math.max(0, Math.min(index, totalCards - 1));
        wrapper.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollToCard(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollToCard(currentIndex + 1);
        });
    }

    // Update current index on scroll
    wrapper.addEventListener('scroll', () => {
        const scrollLeft = wrapper.scrollLeft;
        currentIndex = Math.round(scrollLeft / cardWidth);
        updateThumb();
    });

    // Touch/drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.classList.add('active');
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.classList.remove('active');
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.classList.remove('active');
        // Snap to nearest card
        scrollToCard(currentIndex);
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        wrapper.scrollLeft = scrollLeft - walk;
    });

    updateThumb();
}

// -----------------------------------------
// Team Modal Popup
// -----------------------------------------
function initTeamModal() {
    const modal = document.getElementById('teamModal');
    const modalClose = modal.querySelector('.team-modal-close');
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

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
