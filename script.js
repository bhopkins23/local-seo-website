// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    console.log('Mobile menu toggle found:', !!mobileMenuToggle);
    console.log('Nav menu found:', !!navMenu);
    console.log('Dropdowns found:', dropdowns.length);

    if (mobileMenuToggle && navMenu) {
        // Add both click and touchstart for better mobile support
        function toggleMenu(e) {
            // Only allow hamburger menu on mobile screens
            if (window.innerWidth > 768) {
                console.log('Hamburger menu disabled on desktop');
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked/touched!');
            console.log('Current window width:', window.innerWidth);
            console.log('Mobile menu toggle element:', mobileMenuToggle);
            console.log('Nav menu element:', navMenu);
            
            const isActive = mobileMenuToggle.classList.contains('active');
            console.log('Menu currently active:', isActive);
            
            if (isActive) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Menu closed');
            } else {
                mobileMenuToggle.classList.add('active');
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            }
        }
        
        // Remove any existing event listeners first
        mobileMenuToggle.removeEventListener('click', toggleMenu);
        mobileMenuToggle.removeEventListener('touchstart', toggleMenu);
        
        // Add event listeners
        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuToggle.addEventListener('touchstart', toggleMenu, { passive: false });
        
        console.log('Event listeners added to hamburger menu');
    } else {
        console.error('Mobile menu toggle or nav menu not found!');
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