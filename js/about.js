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
// Team Horizontal Scroll
// -----------------------------------------
function initTeamScroll() {
    const wrapper = document.querySelector('.team-scroll-wrapper');
    const scrollThumb = document.querySelector('.team-scroll-thumb');

    if (!wrapper || !scrollThumb) return;

    const grid = wrapper.querySelector('.team-grid');

    function updateThumb() {
        const scrollWidth = wrapper.scrollWidth - wrapper.clientWidth;
        const scrollLeft = wrapper.scrollLeft;
        const thumbWidth = (wrapper.clientWidth / wrapper.scrollWidth) * 100;
        const thumbPosition = (scrollLeft / scrollWidth) * (100 - thumbWidth);

        scrollThumb.style.width = thumbWidth + '%';
        scrollThumb.style.left = thumbPosition + '%';
    }

    wrapper.addEventListener('scroll', updateThumb);

    let isDragging = false;
    let startX, startLeft;

    scrollThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startLeft = parseFloat(scrollThumb.style.left) || 0;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        const scrollBarWidth = document.querySelector('.team-scroll-bar').clientWidth;
        const deltaPercent = (delta / scrollBarWidth) * 100;
        const newLeft = Math.max(0, Math.min(100 - parseFloat(scrollThumb.style.width), startLeft + deltaPercent));

        const scrollWidth = wrapper.scrollWidth - wrapper.clientWidth;
        wrapper.scrollLeft = (newLeft / (100 - parseFloat(scrollThumb.style.width))) * scrollWidth;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = '';
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
