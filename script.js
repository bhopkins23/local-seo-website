console.log('Script.js loading...'); // Debug

// Extremely simple mobile menu
let mobileMenuOpen = false;

function toggleMobileMenu() {
    console.log('Toggle menu function called'); // Debug
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    console.log('Toggle element:', toggle); // Debug
    console.log('Menu element:', menu); // Debug
    
    if (!toggle || !menu) {
        console.log('ERROR: Elements not found!'); // Debug
        return;
    }
    
    mobileMenuOpen = !mobileMenuOpen;
    console.log('Menu should be open:', mobileMenuOpen); // Debug
    
    if (mobileMenuOpen) {
        console.log('Opening menu...'); // Debug
        menu.style.display = 'flex';
        menu.classList.add('active');
        toggle.classList.add('active');
        document.body.classList.add('mobile-menu-open');
    } else {
        console.log('Closing menu...'); // Debug
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        const dropdowns = menu.querySelectorAll('.dropdown');
        dropdowns.forEach(dd => dd.classList.remove('active'));
    }
}

function handleMenuClick(event) {
    console.log('Menu click handler called, target:', event.target); // Debug
    
    const link = event.target.closest('a');
    if (!link) {
        console.log('No link element found'); // Debug
        return;
    }
    
    console.log('Link found:', link.textContent, 'href:', link.href); // Debug
    const parent = link.parentElement;
    const isDropdown = parent.classList.contains('dropdown') && link.textContent.includes('▼');
    
    if (isDropdown) {
        console.log('Handling dropdown toggle'); // Debug
        event.preventDefault();
        parent.classList.toggle('active');
        console.log('Dropdown active state:', parent.classList.contains('active')); // Debug
    } else {
        console.log('Handling regular link click - will close menu'); // Debug
        // Let the link navigate, then close menu
        setTimeout(function() {
            if (mobileMenuOpen) {
                toggleMobileMenu();
            }
        }, 100);
    }
}

// Initialize immediately when script loads
function initMobileMenu() {
    console.log('Initializing mobile menu...'); // Debug
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    console.log('Found toggle:', !!toggle, 'Found menu:', !!menu); // Debug
    
    if (toggle) {
        console.log('Adding click listener to toggle'); // Debug
        toggle.onclick = toggleMobileMenu;
        toggle.addEventListener('touchstart', function(e) {
            console.log('Touch start on toggle'); // Debug
            e.preventDefault();
            toggleMobileMenu();
        });
    } else {
        console.log('ERROR: Toggle button not found!'); // Debug
    }
    
    if (menu) {
        console.log('Adding click listener to menu'); // Debug
        menu.onclick = handleMenuClick;
        menu.addEventListener('touchstart', handleMenuClick);
    } else {
        console.log('ERROR: Menu not found!'); // Debug
    }
}

// Try to initialize immediately
if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting...'); // Debug
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    console.log('DOM already loaded, initializing now...'); // Debug
    initMobileMenu();
}

// Also try after a short delay as fallback
setTimeout(function() {
    console.log('Fallback initialization attempt...'); // Debug
    initMobileMenu();
}, 1000);

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you within 24 hours.');
            this.reset();
        };
    }
});