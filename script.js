// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Project Slider Logic ---
    const track = document.getElementById('projectsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function getVisibleCardsCount() {
        return window.innerWidth <= 820 ? 1 : 2;
    }

    function updateSlider() {
        const cards = document.querySelectorAll('.project-card');
        if (!cards.length || !track) return;

        // Calculate card width dynamically including gap (28px)
        const gap = 28;
        const cardWidth = cards[0].offsetWidth + gap;

        // Apply slide animation
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    if (nextBtn && prevBtn && track) {
        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.project-card');
            const visibleCards = getVisibleCardsCount();
            
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.project-card');
            const visibleCards = getVisibleCardsCount();
            
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, cards.length - visibleCards); // Loop to end
            }
            updateSlider();
        });

        // Recalculate slider position when browser window is resized
        window.addEventListener('resize', () => {
            const cards = document.querySelectorAll('.project-card');
            const visibleCards = getVisibleCardsCount();
            
            if (currentIndex > cards.length - visibleCards) {
                currentIndex = Math.max(0, cards.length - visibleCards);
            }
            updateSlider();
        });
    }

    // --- 2. Smooth Scroll Anchor Navigation ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});