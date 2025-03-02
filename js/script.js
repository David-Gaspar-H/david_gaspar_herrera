// Wait for templates to be loaded before initializing cursor
document.addEventListener('templatesLoaded', initCursor);
document.addEventListener('DOMContentLoaded', function() {
    // If templates aren't being used, still initialize cursor
    if (!document.getElementById('header-container') || 
        document.getElementById('header-container').children.length > 0) {
        initCursor();
    }
});

// Custom cursor initialization
function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('glitch-btn')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.mixBlendMode = 'color-dodge';
        } else {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = 'difference';
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Update year in footer
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
updateFooterYear();

// Random character movement on home page
function initHeroCharacter() {
    const heroCharacter = document.querySelector('.hero-character');

    if (heroCharacter) {
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            heroCharacter.style.transform = `scaleX(-1) translate(${randomX}px, ${randomY}px)`;
        }, 2000);
    }
}
document.addEventListener('DOMContentLoaded', initHeroCharacter);
document.addEventListener('templatesLoaded', initHeroCharacter);

// Glitch effect for buttons
function initGlitchButtons() {
    const glitchButtons = document.querySelectorAll('.glitch-btn');

    glitchButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('glitching');
        });
        
        btn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                btn.classList.remove('glitching');
            }, 300);
        });
    });
}
document.addEventListener('DOMContentLoaded', initGlitchButtons);
document.addEventListener('templatesLoaded', initGlitchButtons);

// Sticker rotation on scroll
function initStickers() {
    const stickers = document.querySelectorAll('.sticker');
    
    if (stickers.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            stickers.forEach((sticker, index) => {
                const rotationSpeed = index % 2 === 0 ? 0.05 : -0.05;
                const rotation = scrollPosition * rotationSpeed;
                sticker.style.transform = `translateY(${Math.sin(scrollPosition / 100) * 10}px) rotate(${rotation}deg)`;
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', initStickers);
document.addEventListener('templatesLoaded', initStickers);

// Parallax scrolling effect
function initParallax() {
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Adjust header opacity
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = `rgba(245, 243, 231, ${0.9 + scrollPosition / 1000})`;
        }
        
        // Parallax for certain elements
        const parallaxElements = document.querySelectorAll('.section-title, .feature-card');
        
        parallaxElements.forEach(element => {
            const distance = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            
            if (distance < viewportHeight && distance > 0) {
                const parallaxValue = (viewportHeight - distance) / 20;
                element.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', initParallax);
document.addEventListener('templatesLoaded', initParallax);

// Easter egg: Konami code (up, up, down, down, left, right, left, right, B, A)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const requiredKey = konamiCode[konamiCodePosition];
    
    if (key === requiredKey) {
        konamiCodePosition++;
        
        if (konamiCodePosition === konamiCode.length) {
            activateEasterEgg();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateEasterEgg() {
    // Create a retro game effect
    const easterEgg = document.createElement('div');
    easterEgg.style.position = 'fixed';
    easterEgg.style.top = '0';
    easterEgg.style.left = '0';
    easterEgg.style.width = '100%';
    easterEgg.style.height = '100%';
    easterEgg.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    easterEgg.style.zIndex = '10000';
    easterEgg.style.display = 'flex';
    easterEgg.style.justifyContent = 'center';
    easterEgg.style.alignItems = 'center';
    easterEgg.style.flexDirection = 'column';
    easterEgg.style.color = 'white';
    easterEgg.style.fontFamily = 'VT323, monospace';
    
    const message = document.createElement('h2');
    message.textContent = 'KONAMI CODE ACTIVATED!';
    message.style.fontSize = '3rem';
    message.style.marginBottom = '20px';
    
    const subMessage = document.createElement('p');
    subMessage.textContent = 'You found the secret. Press any key to continue...';
    subMessage.style.fontSize = '1.5rem';
    
    easterEgg.appendChild(message);
    easterEgg.appendChild(subMessage);
    document.body.appendChild(easterEgg);
    
    document.addEventListener('keydown', function closeEasterEgg() {
        document.body.removeChild(easterEgg);
        document.removeEventListener('keydown', closeEasterEgg);
    });
    
    document.addEventListener('click', function closeEasterEgg() {
        document.body.removeChild(easterEgg);
        document.removeEventListener('click', closeEasterEgg);
    });
}

// Preload animation
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.backgroundColor = 'var(--main-bg)';
    preloader.style.zIndex = '10000';
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
    preloader.style.transition = 'opacity 0.5s';
    
    const loadingText = document.createElement('h2');
    loadingText.textContent = 'LOADING...';
    loadingText.style.fontFamily = 'VT323, monospace';
    loadingText.style.fontSize = '3rem';
    loadingText.style.color = 'var(--text-color)';
    
    preloader.appendChild(loadingText);
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 500);
    }, 1000);
});