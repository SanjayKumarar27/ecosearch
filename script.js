// Initialize AOS with modified settings
AOS.init({
    duration: 800,
    once: false,  // Changed to false to repeat animations
    offset: 50,   // Reduced offset for earlier trigger
    easing: 'ease-out-cubic',
    mirror: true  // Enable mirroring of animations when scrolling up
});

// Enhanced scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .section-heading, .gradient-text, .glitch-text');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 50) && (elementBottom > 0);
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            if (element.classList.contains('feature-card')) {
                element.style.transform = 'translateY(0) scale(1)';
            }
        } else {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            if (element.classList.contains('feature-card')) {
                element.style.transform = 'translateY(30px) scale(0.95)';
            }
        }
    });

    // Animate background shapes
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const scrolled = window.pageYOffset;
        shape.style.transform = `translate(${scrolled * 0.1 * (index + 1)}px, ${scrolled * 0.05 * (index + 1)}px) rotate(${scrolled * 0.05}deg)`;
    });

    // Update scroll progress
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll', scrollProgress.toString());
};

// Add scroll event listener
window.addEventListener('scroll', () => {
    requestAnimationFrame(animateOnScroll);
});

// Initial animation trigger
animateOnScroll();

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Magnetic effect
document.querySelectorAll('.magnetic').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const position = element.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0px, 0px)';
    });
});

// Add leaf parallax effect
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const leaves = document.querySelectorAll('.leaf');
        
        leaves.forEach((leaf, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            leaf.style.transform = `translateY(${yPos}px)`;
        });
    });
}); 