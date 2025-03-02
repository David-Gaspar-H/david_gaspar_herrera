// Art Gallery Script

// Sample art data
const artData = [
    {
        id: 1,
        title: "Neo-Tokyo Dreams",
        description: "A digital illustration inspired by the cyberpunk aesthetics of Akira, featuring a futuristic cityscape at night.",
        image: "assets/images/art/art1.jpg", // Replace with your image paths
        category: "digital",
        date: "March 2024"
    },
    {
        id: 2,
        title: "Vintage Mecha",
        description: "Character design for a retro-futuristic mecha robot with 90s anime influences.",
        image: "assets/images/art/art2.jpg",
        category: "character",
        date: "January 2024"
    },
    {
        id: 3,
        title: "Analog Sketch #42",
        description: "A traditional pen and ink sketch exploring organic forms and mechanical elements.",
        image: "assets/images/art/art3.jpg",
        category: "traditional",
        date: "December 2023"
    },
    {
        id: 4,
        title: "Glitch Study",
        description: "An experimental piece exploring digital artifacts and corrupted imagery as aesthetic elements.",
        image: "assets/images/art/art4.jpg",
        category: "experimental",
        date: "November 2023"
    },
    {
        id: 5,
        title: "Street Style",
        description: "Character design featuring 90s-inspired street fashion with a modern twist.",
        image: "assets/images/art/art5.jpg",
        category: "character",
        date: "October 2023"
    },
    {
        id: 6,
        title: "Watercolor Memories",
        description: "A traditional watercolor painting exploring themes of nostalgia and faded memories.",
        image: "assets/images/art/art6.jpg",
        category: "traditional",
        date: "September 2023"
    },
    {
        id: 7,
        title: "Digital Dystopia",
        description: "A digital painting depicting a dystopian landscape influenced by classic anime and manga.",
        image: "assets/images/art/art7.jpg",
        category: "digital",
        date: "August 2023"
    },
    {
        id: 8,
        title: "Signal Interference",
        description: "An experimental piece exploring the aesthetics of analog TV static and signal disruption.",
        image: "assets/images/art/art8.jpg",
        category: "experimental",
        date: "July 2023"
    }
];

// For development/placeholder purposes, create URLs for the art pieces
// In a real implementation, you would use actual image paths
function createPlaceholderURL(index) {
    // Generate placeholder images with different colors
    const colors = [
        "e74c3c", "3498db", "9b59b6", "f1c40f", 
        "1abc9c", "e67e22", "2ecc71", "34495e"
    ];
    const color = colors[index % colors.length];
    return `/api/placeholder/400/300/${color}`;
}

// Initialize the gallery
function initGallery() {
    const gallery = document.querySelector('.art-gallery');
    const overlay = document.querySelector('.art-overlay');
    const closeBtn = document.querySelector('.close-overlay');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let currentArtIndex = 0;
    let visibleArt = [...artData]; // Initially all art is visible
    
    // Create gallery items
    function renderGallery() {
        gallery.innerHTML = ''; // Clear gallery
        
        // Filter art based on current filter
        visibleArt = currentFilter === 'all' 
            ? [...artData] 
            : artData.filter(item => item.category === currentFilter);
        
        // Create gallery items
        visibleArt.forEach((artwork, index) => {
            const artItem = document.createElement('div');
            artItem.className = 'art-item';
            artItem.setAttribute('data-id', artwork.id);
            artItem.setAttribute('data-index', index);
            artItem.style.animationDelay = `${index * 0.1}s`;
            
            // Use placeholder images for development
            const imageSrc = createPlaceholderURL(index);
            
            artItem.innerHTML = `
                <img src="${imageSrc}" alt="${artwork.title}">
                <div class="art-info">
                    <h3 class="art-title">${artwork.title}</h3>
                    <p class="art-description">${artwork.category}</p>
                </div>
            `;
            
            // Add click event to open overlay
            artItem.addEventListener('click', () => {
                currentArtIndex = index;
                openArtOverlay(artwork);
            });
            
            gallery.appendChild(artItem);
        });
    }
    
    // Open art overlay
    function openArtOverlay(artwork) {
        const overlayImg = document.querySelector('.overlay-img');
        const overlayTitle = document.querySelector('.overlay-title');
        const overlayDesc = document.querySelector('.overlay-description');
        const overlayDate = document.querySelector('.overlay-date');
        const overlayCategory = document.querySelector('.overlay-category');
        
        // Set overlay content
        overlayImg.src = createPlaceholderURL(artData.findIndex(item => item.id === artwork.id));
        overlayTitle.textContent = artwork.title;
        overlayDesc.textContent = artwork.description;
        overlayDate.textContent = artwork.date;
        overlayCategory.textContent = artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1);
        
        // Show overlay
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close art overlay
    function closeArtOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Navigate to previous/next artwork
    function navigateArt(direction) {
        currentArtIndex = (currentArtIndex + direction + visibleArt.length) % visibleArt.length;
        openArtOverlay(visibleArt[currentArtIndex]);
    }
    
    // Add event listeners
    closeBtn.addEventListener('click', closeArtOverlay);
    
    prevBtn.addEventListener('click', () => {
        navigateArt(-1);
    });
    
    nextBtn.addEventListener('click', () => {
        navigateArt(1);
    });
    
    // Close overlay with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeArtOverlay();
        } else if (e.key === 'ArrowLeft' && overlay.classList.contains('active')) {
            navigateArt(-1);
        } else if (e.key === 'ArrowRight' && overlay.classList.contains('active')) {
            navigateArt(1);
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and re-render gallery
            currentFilter = btn.getAttribute('data-filter');
            renderGallery();
        });
    });
    
    // Initial render
    renderGallery();
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);