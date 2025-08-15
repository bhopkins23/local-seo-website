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
        
        // Close menu on outside click or menu link click
        document.addEventListener('click', function(e) {
            // Check if clicked element is a menu link
            const isMenuLink = e.target.closest('.nav-menu a');
            
            // If it's a menu link, allow the navigation and close the menu
            if (isMenuLink && isMenuOpen) {
                setTimeout(() => {
                    isMenuOpen = false;
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }, 50); // Small delay to allow navigation
                return; // Don't prevent default - allow normal link behavior
            }
            
            // Close menu if clicked outside (but not on toggle button)
            if (isMenuOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
                isMenuOpen = false;
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });
        
        // Handle mobile dropdown toggles
        const dropdowns = menu.querySelectorAll('.dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentNode;
                    parent.classList.toggle('active');
                }
            });
        });
        
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
                    
                    // Close all mobile dropdowns
                    const activeDropdowns = menu.querySelectorAll('.dropdown.active');
                    activeDropdowns.forEach(dd => dd.classList.remove('active'));
                }
            }, 250);
        };
    }
    
    // Minimal smooth scrolling - only for hash links
    function initScroll() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link || !link.getAttribute('href') || link.getAttribute('href') === '#') return;
            
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
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