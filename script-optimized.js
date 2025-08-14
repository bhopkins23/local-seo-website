// Optimized JavaScript - Minimal payload for better performance
(function() {
    'use strict';
    
    // Mobile menu functionality - Essential only
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        if (!toggle || !menu) return;
        
        const toggleMenu = () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        };
        
        toggle.addEventListener('click', toggleMenu);
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') && 
                !menu.contains(e.target) && 
                !toggle.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            }
        });
    }
    
    // Smooth scrolling for anchor links - Optimized
    function initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Contact form - Simplified
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We will contact you within 24 hours.');
            form.reset();
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initContactForm();
    }
})();