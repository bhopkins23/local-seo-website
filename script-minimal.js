// Ultra-minimal JavaScript for maximum performance
(function() {
    'use strict';
    
    // Minimal mobile menu - only essential functionality
    let toggle, menu, isMenuOpen = false;
    
    function initMenu() {
        toggle = document.querySelector('.mobile-menu-toggle');
        menu = document.querySelector('.nav-menu');
        
        if (!toggle || !menu) return;
        
        // Single event listener with minimal logic
        toggle.onclick = function() {
            isMenuOpen = !isMenuOpen;
            menu.classList.toggle('active', isMenuOpen);
            toggle.classList.toggle('active', isMenuOpen);
            document.body.classList.toggle('mobile-menu-open', isMenuOpen);
        };
        
        // Close menu on outside click - debounced
        let clickTimeout;
        document.onclick = function(e) {
            if (clickTimeout) return;
            clickTimeout = setTimeout(() => {
                if (isMenuOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
                    isMenuOpen = false;
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }
                clickTimeout = null;
            }, 100);
        };
        
        // Close on resize - throttled
        let resizeTimer;
        window.onresize = function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && isMenuOpen) {
                    isMenuOpen = false;
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }
            }, 250);
        };
    }
    
    // Minimal smooth scrolling
    function initScroll() {
        document.onclick = function(e) {
            const link = e.target.closest && e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }
    
    // Minimal form handling
    function initForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                alert('Thank you! We will contact you within 24 hours.');
                this.reset();
            };
        }
    }
    
    // Ultra-fast initialization
    function init() {
        initMenu();
        initScroll();
        initForm();
    }
    
    // Execute immediately if DOM is ready, otherwise wait
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    }
})();