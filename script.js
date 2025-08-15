// Extremely simple mobile menu with inline event handlers
let mobileMenuOpen = false;

function toggleMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        menu.style.display = 'flex';
        menu.classList.add('active');
        toggle.classList.add('active');
        document.body.classList.add('mobile-menu-open');
    } else {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        // Close all dropdowns
        const dropdowns = menu.querySelectorAll('.dropdown');
        dropdowns.forEach(dd => dd.classList.remove('active'));
    }
}

function handleMenuClick(event) {
    const link = event.target.closest('a');
    if (!link) return;
    
    const parent = link.parentElement;
    const isDropdown = parent.classList.contains('dropdown') && link.textContent.includes('▼');
    
    if (isDropdown) {
        event.preventDefault();
        parent.classList.toggle('active');
    } else {
        // Regular link - close menu
        toggleMobileMenu();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle) {
        toggle.onclick = toggleMobileMenu;
    }
    
    if (menu) {
        menu.onclick = handleMenuClick;
    }
    
    // Form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you within 24 hours.');
            this.reset();
        };
    }
});