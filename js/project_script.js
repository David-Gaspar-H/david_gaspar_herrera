// Projects Page Script

// Initialize after DOM content is loaded
document.addEventListener('DOMContentLoaded', initProjectsPage);
document.addEventListener('templatesLoaded', initProjectsPage);

function initProjectsPage() {
    // Make sure we only initialize once
    if (window.projectsInitialized) return;
    window.projectsInitialized = true;
    
    // Elements
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Add blueprint visual elements dynamically
    addBlueprintElements();
    
    // Card click to flip
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter project cards
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'flipIn 0.5s ease-out';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Add blueprint visual elements
function addBlueprintElements() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;
    
    // Add some horizontal lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'blueprint-line horizontal';
        line.style.top = `${Math.random() * 100}%`;
        line.style.opacity = Math.random() * 0.2 + 0.1;
        projectsContainer.appendChild(line);
    }
    
    // Add some vertical lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'blueprint-line vertical';
        line.style.left = `${Math.random() * 100}%`;
        line.style.opacity = Math.random() * 0.2 + 0.1;
        projectsContainer.appendChild(line);
    }
    
    // Add some circles
    for (let i = 0; i < 10; i++) {
        const circle = document.createElement('div');
        circle.className = 'blueprint-circle';
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 100 + 50;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.opacity = Math.random() * 0.2 + 0.1;
        projectsContainer.appendChild(circle);
    }
}

// Glow effect for cards
function addCardGlowEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Check if mouse is close to the card
            const cardCenterX = rect.width / 2;
            const cardCenterY = rect.height / 2;
            const distance = Math.sqrt(Math.pow(x - cardCenterX, 2) + Math.pow(y - cardCenterY, 2));
            
            if (distance < 300) {
                // Calculate angle and intensity based on position
                const angleX = (y - cardCenterY) / 20;
                const angleY = (x - cardCenterX) / -20;
                const glowX = (x - cardCenterX) / rect.width * 100;
                const glowY = (y - cardCenterY) / rect.height * 100;
                
                // Apply transform and glow
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                card.style.boxShadow = `0 10px 25px rgba(0, 0, 0, 0.3), 
                                         0 0 30px 5px rgba(52, 152, 219, 0.3)`;
                card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            } else {
                // Reset
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            }
        });
    });
}

// Call the glow effect function
document.addEventListener('DOMContentLoaded', addCardGlowEffect);
document.addEventListener('templatesLoaded', addCardGlowEffect);

// Preload images to prevent flash of unstyled content
function preloadCardImages() {
    const cards = document.querySelectorAll('.card-image img');
    cards.forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.includes('/api/placeholder/')) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

document.addEventListener('DOMContentLoaded', preloadCardImages);
document.addEventListener('templatesLoaded', preloadCardImages);