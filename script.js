// Mobile menu functionality

// Mobile menu variables
let menuOpen = false;

// Toggle mobile menu open/closed
function toggleMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    menuOpen = !menuOpen;
    
    if (menuOpen) {
        menu.classList.add('active');
        toggle.classList.add('active');
        menu.style.display = 'flex';
    } else {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        // Close dropdowns
        const dropdowns = menu.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dd => dd.classList.remove('active'));
    }
}

// Handle clicks on menu items
function menuClick(event) {
    const link = event.target.closest('a');
    if (!link) return;
    
    const parent = link.parentElement;
    const isDropdown = parent.classList.contains('dropdown') && link.textContent.includes('▼');
    
    if (isDropdown) {
        // Toggle dropdown
        event.preventDefault();
        parent.classList.toggle('active');
    } else {
        // Regular link - close menu
        toggleMenu();
    }
}

// Initialize mobile menu
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle) {
        toggle.onclick = toggleMenu;
    }
    
    if (menu) {
        menu.onclick = menuClick;
    }
}

// Initialize immediately
setupMobileMenu();

// Also try when DOM loads
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// And after 2 seconds as final fallback
setTimeout(setupMobileMenu, 2000);