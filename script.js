// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Initialize house animation
    initHouseAnimation();
});

// Simple house animation using GSAP
function initHouseAnimation() {
    // Create a timeline for the house animation
    const tl = gsap.timeline();
    
    // Initially hide all elements
    gsap.set(".house-svg", { opacity: 0, scale: 0.8 });
    gsap.set(".house-svg polygon", { opacity: 0, y: 20 });
    gsap.set(".house-svg rect", { opacity: 0, scale: 0.8 });
    gsap.set(".house-svg circle", { opacity: 0, scale: 0 });
    gsap.set(".house-svg line", { opacity: 0 });
    
    // Animate the house in with a gentle sequence
    tl.to(".house-svg", { 
        duration: 0.8, 
        opacity: 1, 
        scale: 1, 
        ease: "back.out(1.7)" 
    })
    .to(".house-svg polygon", { 
        duration: 0.6, 
        opacity: 1, 
        y: 0, 
        ease: "power2.out" 
    }, "-=0.4")
    .to(".house-svg rect", { 
        duration: 0.5, 
        opacity: 1, 
        scale: 1, 
        stagger: 0.1, 
        ease: "back.out(1.7)" 
    }, "-=0.2")
    .to(".house-svg line", { 
        duration: 0.4, 
        opacity: 1, 
        stagger: 0.05, 
        ease: "power2.out" 
    }, "-=0.3")
    .to(".house-svg circle", { 
        duration: 0.3, 
        opacity: 1, 
        scale: 1, 
        ease: "back.out(1.7)" 
    }, "-=0.2");
    
    console.log('ThermaCheck website loaded with gentle house animation');
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Quote Form Handling
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simple validation
    const requiredFields = ['name', 'email', 'postcode', 'property-type', 'assessment-type'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#22c55e';
        }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        document.getElementById('email').style.borderColor = '#ef4444';
        isValid = false;
    }

    if (isValid) {
        // Show success message
        showNotification('Thank you! Your quote request has been submitted. We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset border colors
        requiredFields.forEach(field => {
            document.getElementById(field).style.borderColor = '#e5e7eb';
        });

        // In a real application, you would send this data to your server
        console.log('Quote form data:', data);
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Simple validation
    const requiredFields = ['contact-name', 'contact-email', 'contact-subject', 'contact-message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === '') {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#22c55e';
        }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data['contact-email'] && !emailRegex.test(data['contact-email'])) {
        document.querySelector('[name="contact-email"]').style.borderColor = '#ef4444';
        isValid = false;
    }

    if (isValid) {
        showNotification('Thank you for your message! We\'ll respond within 24 hours.', 'success');
        this.reset();
        
        // Reset border colors
        requiredFields.forEach(field => {
            document.querySelector(`[name="${field}"]`).style.borderColor = '#e5e7eb';
        });

        // In a real application, you would send this data to your server
        console.log('Contact form data:', data);
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            min-width: 300px;
            max-width: 500px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #ea580c;
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-info {
            border-left: 4px solid #ea580c;
        }
        
        .notification-content {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
            color: ${type === 'success' ? '#ea580c' : type === 'error' ? '#ef4444' : '#ea580c'};
        }
        
        .notification-content span {
            flex: 1;
            color: #374151;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6b7280;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #374151;
        }
    `;

    // Add styles to document if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature, .stat');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Form input animations
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        
        if (numericTarget) {
            let current = 0;
            const increment = numericTarget / 60; // Animate over 1 second at 60fps
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    current = numericTarget;
                    clearInterval(timer);
                }
                
                if (target.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (target.includes('hr')) {
                    stat.textContent = Math.floor(current) + 'hr';
                } else if (target.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        }
    });
}

// Trigger stats animation when section is visible
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

if (aboutSection) {
    observer.observe(aboutSection);
}

// Preload critical resources
function preloadResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', preloadResources);
