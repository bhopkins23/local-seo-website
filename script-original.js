// Mobile menu functionality - Simplified and more reliable
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const body = document.body;

    console.log('Mobile menu toggle found:', !!mobileMenuToggle);
    console.log('Nav menu found:', !!navMenu);

    if (mobileMenuToggle && navMenu) {
        // Simple toggle function
        function toggleMobileMenu() {
            console.log('Toggle mobile menu called');
            
            // Toggle active classes
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
            
            // Log current state
            console.log('Menu is now:', navMenu.classList.contains('active') ? 'OPEN' : 'CLOSED');
        }
        
        // Close menu function
        function closeMobileMenu() {
            console.log('Closing mobile menu');
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
        
        // Add click event to hamburger button
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger button clicked!');
            toggleMobileMenu();
        });
        
        // Add touch event for mobile
        mobileMenuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger button touched!');
            toggleMobileMenu();
        });
        
        // Close menu when clicking on navigation links
        const navLinks = navMenu.querySelectorAll('a:not(.dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked - closing menu');
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                console.log('Clicked outside menu - closing');
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                console.log('Resized to desktop - closing mobile menu');
                closeMobileMenu();
            }
        });
        
        console.log('Mobile menu events attached successfully');
    } else {
        console.error('Mobile menu elements not found!');
        console.log('Toggle element:', mobileMenuToggle);
        console.log('Nav menu element:', navMenu);
    }

    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        if (dropdownLink && (dropdownLink.textContent.includes('Services') || dropdownLink.textContent.includes('Locations'))) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    console.log('Dropdown toggled:', dropdown.classList.contains('active'));
                }
            });
        }
    });

    // Close mobile menu when clicking on actual navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        // Only add close functionality to actual page links, not dropdown toggles
        if (!link.parentElement.classList.contains('dropdown') || 
            (!link.textContent.includes('Services') && !link.textContent.includes('Locations'))) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && mobileMenuToggle && navMenu) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('Menu closed after link click');
                }
            });
        }
    });

    // Close mobile menu on resize to desktop and ensure proper navigation display
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuToggle && navMenu) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            
            // Ensure desktop navigation is properly displayed
            navMenu.style.display = '';
            navMenu.style.position = '';
            navMenu.style.right = '';
            navMenu.style.width = '';
            navMenu.style.height = '';
            console.log('Reset to desktop navigation');
        }
    });
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show success message (in a real implementation, you'd send this to your server)
            alert('Thank you for your interest! We will contact you within 24 hours to discuss your digital marketing needs.');
            
            // Reset form
            this.reset();
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && mobileMenuToggle && navMenu && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Menu closed by clicking outside');
        }
    });

    // Highlight active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', highlightNavigation);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in effect to service cards and location cards
    const cards = document.querySelectorAll('.service-card, .location-card, .feature');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});