// Ultra-basic mobile menu - attach directly to elements
window.mobileMenuOpen = false;

window.toggleMobileMenu = function() {
    console.log('Toggle clicked!'); // Debug
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) {
        console.log('Elements not found'); // Debug
        return;
    }
    
    window.mobileMenuOpen = !window.mobileMenuOpen;
    console.log('Menu open:', window.mobileMenuOpen); // Debug
    
    if (window.mobileMenuOpen) {
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
};

window.handleMenuClick = function(event) {
    console.log('Menu clicked!', event.target); // Debug
    event.stopPropagation();
    
    const link = event.target.closest('a');
    if (!link) {
        console.log('No link found'); // Debug
        return;
    }
    
    console.log('Link clicked:', link.textContent); // Debug
    const parent = link.parentElement;
    const isDropdown = parent.classList.contains('dropdown') && link.textContent.includes('▼');
    
    if (isDropdown) {
        console.log('Dropdown toggle'); // Debug
        event.preventDefault();
        parent.classList.toggle('active');
    } else {
        console.log('Regular link - closing menu'); // Debug
        // Regular link - close menu and navigate
        window.toggleMobileMenu();
    }
};

// Attach events when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, attaching events'); // Debug
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle) {
        console.log('Attaching toggle event'); // Debug
        toggle.addEventListener('click', window.toggleMobileMenu);
        toggle.addEventListener('touchstart', window.toggleMobileMenu);
    }
    
    if (menu) {
        console.log('Attaching menu event'); // Debug
        menu.addEventListener('click', window.handleMenuClick);
        menu.addEventListener('touchstart', window.handleMenuClick);
    }
    
    // Form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you within 24 hours.');
            this.reset();
        });
    }
});