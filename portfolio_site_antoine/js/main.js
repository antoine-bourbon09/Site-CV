// 1. Interactive Scroll Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special trigger for progress bars inside skill cards
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill) {
                // Read inline style backup or custom attribute
                const targetWidth = progressFill.style.width;
                progressFill.style.width = '0%';
                setTimeout(() => {
                    progressFill.style.width = targetWidth;
                }, 100);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    // Collect all animate targets
    const targets = document.querySelectorAll('.animate-slide, .animate-fade, .skill-card-detailed');
    targets.forEach(target => revealObserver.observe(target));
});

// 2. Client-side Category Filtering Logic for Skills
function filterSkills(category) {
    // Adjust Active State Buttons
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Filter Cards
    const cards = document.querySelectorAll('.skill-card-detailed');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}
