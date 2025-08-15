// BASIC TEST - should show in console immediately
console.log('=== SCRIPT.JS IS NOW LOADING ===');
alert('JavaScript is working! Check console for debug info.');

// Mobile menu variables
let menuOpen = false;

// Simple toggle function
function toggleMenu() {
    console.log('🔥 TOGGLE FUNCTION CALLED!');
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    console.log('Toggle button found:', !!toggle);
    console.log('Menu found:', !!menu);
    
    if (!toggle || !menu) {
        console.log('❌ CRITICAL ERROR: Elements missing!');
        return;
    }
    
    menuOpen = !menuOpen;
    console.log('Menu should be:', menuOpen ? 'OPEN' : 'CLOSED');
    
    if (menuOpen) {
        console.log('✅ OPENING MENU');
        menu.classList.add('active');
        toggle.classList.add('active');
        menu.style.display = 'flex';
    } else {
        console.log('✅ CLOSING MENU');
        menu.classList.remove('active');
        toggle.classList.remove('active');
        // Close dropdowns
        const dropdowns = menu.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dd => dd.classList.remove('active'));
    }
}

// Simple menu click handler
function menuClick(event) {
    console.log('🔥 MENU CLICK DETECTED!', event.target.tagName);
    
    const link = event.target.closest('a');
    if (!link) {
        console.log('No link found');
        return;
    }
    
    console.log('Link clicked:', link.textContent.trim());
    
    const parent = link.parentElement;
    const isDropdown = parent.classList.contains('dropdown') && link.textContent.includes('▼');
    
    if (isDropdown) {
        console.log('🔽 DROPDOWN TOGGLE');
        event.preventDefault();
        parent.classList.toggle('active');
    } else {
        console.log('🔗 REGULAR LINK - CLOSING MENU');
        toggleMenu();
    }
}

// Setup function
function setupMobileMenu() {
    console.log('🚀 SETTING UP MOBILE MENU');
    
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle) {
        console.log('✅ Attaching toggle click');
        toggle.onclick = toggleMenu;
    } else {
        console.log('❌ No toggle button found!');
    }
    
    if (menu) {
        console.log('✅ Attaching menu click');
        menu.onclick = menuClick;
    } else {
        console.log('❌ No menu found!');
    }
}

// Initialize immediately
console.log('🎯 Starting initialization...');
setupMobileMenu();

// Also try when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded - trying again...');
    setupMobileMenu();
});

// And after 2 seconds as final fallback
setTimeout(function() {
    console.log('🎯 Fallback setup - trying again...');
    setupMobileMenu();
}, 2000);