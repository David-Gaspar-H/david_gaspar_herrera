/**
 * Simple HTML templating system for static sites
 * An alternative approach to components.js that doesn't rely on fetching external files
 */

document.addEventListener('DOMContentLoaded', function() {
    // Define header and footer HTML directly in this file
    const templates = {
        header: `
            <header>
                <a href="index.html" class="logo">David Gaspar-Herrera</a>
                <nav>
                    <ul>
                        <li><a href="index.html" id="nav-home">Home</a></li>
                        <li><a href="about.html" id="nav-about">About</a></li>
                        <li><a href="projects.html" id="nav-projects">Projects</a></li>
                        <li><a href="cv.html" id="nav-cv">CV</a></li>
                    </ul>
                </nav>
            </header>
        `,
        footer: `
            <footer>
                <div class="footer-content">
                    <div class="made-with">
                        <span>Made with HTML, CSS & pure JS</span>
                    </div>
                    <div class="footer-links">
                        <a href="https://github.com/David-Gaspar-H" target="_blank">GitHub</a>
                        <a href="#">Contact</a>
                    </div>
                    <div class="copyright">
                        &copy; <span id="year">2025</span> David Gaspar-Herrera. All rights reserved.
                    </div>
                </div>
            </footer>
        `
    };
    
    // Insert header and footer
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        headerContainer.innerHTML = templates.header;
        setActiveNavLink();
    }
    
    if (footerContainer) {
        footerContainer.innerHTML = templates.footer;
        updateYear();
    }
    
    // Dispatch an event to signal that templates have been loaded
    document.dispatchEvent(new Event('templatesLoaded'));
});

// Set active navigation link
function setActiveNavLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Default to home if on root
    const pageId = currentPage ? currentPage.split('.')[0] : 'index';
    
    // Set the active class for the current page nav link
    const navLinkId = pageId === 'index' ? 'nav-home' : `nav-${pageId}`;
    const activeLink = document.getElementById(navLinkId);
    
    if (activeLink) {
        activeLink.classList.add('current-page');
    }
}

// Update copyright year
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}