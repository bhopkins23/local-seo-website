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
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked/touched!');
            
            const isActive = mobileMenuToggle.classList.contains('active');
            
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
        
        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuToggle.addEventListener('touchstart', toggleMenu, { passive: false });
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

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuToggle && navMenu) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
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

    // Mobile menu toggle functionality
    let mobileMenuOpen = false;
    const navbar = document.querySelector('.navbar');
    
    // Add click handler for mobile menu (if you add a hamburger menu later)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.mobile-menu-toggle')) {
            mobileMenuOpen = !mobileMenuOpen;
            navbar.classList.toggle('mobile-menu-open', mobileMenuOpen);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && mobileMenuOpen) {
            mobileMenuOpen = false;
            navbar.classList.remove('mobile-menu-open');
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