// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 2px 10px rgba(90, 71, 68, 0.1)';
        navLinks.style.animation = 'slideDown 0.3s ease-out forwards';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Navbar background change on scroll with smooth transition
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(90, 71, 68, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.style.boxShadow = 'none';
    }

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('stagger-fade')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        }
    });
}, observerOptions);

// Apply animations to elements
document.querySelectorAll('.card, .service-card').forEach(element => {
    element.classList.add('fade-up');
    observer.observe(element);
});

document.querySelectorAll('.about-cards, .services-grid').forEach(grid => {
    grid.classList.add('stagger-fade');
    observer.observe(grid);
});

// Form handling with enhanced feedback
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        button.style.background = '#4CAF50';
        this.reset();
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// Add smooth hover effect to cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.1)';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-up {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-up.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .stagger-fade > * {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .stagger-fade.animate > * {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);