// Initialize AOS with modified settings
AOS.init({
    duration: 800,
    once: false,  // Changed to false to repeat animations
    offset: 50,   // Reduced offset for earlier trigger
    easing: 'ease-out-cubic',
    mirror: true  // Enable mirroring of animations when scrolling up
});

// Add Waitlist widget initialization
document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing thank you modal if it exists
    const existingModal = document.getElementById('thank-you-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create thank you modal for future submissions
    const createThankYouModal = () => {
        const modal = document.createElement('div');
        modal.id = 'thank-you-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>Thank You!</h3>
                <p>You've successfully joined the EcoSearch waitlist.</p>
                <p>We'll notify you when we launch.</p>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            // Refresh the page after closing the modal
            window.location.reload();
        });
        
        return modal;
    };
    
    // Create the modal but keep it hidden
    const thankYouModal = createThankYouModal();
    thankYouModal.style.display = 'none';
    
    // Add nature background elements dynamically
    const createNatureElements = () => {
        // Create additional leaves for a more natural feel
        const natureBg = document.querySelector('.nature-bg');
        
        // Add more leaves dynamically
        for (let i = 0; i < 8; i++) {
            const leafType = Math.floor(Math.random() * 3) + 1;
            const leaf = document.createElement('div');
            leaf.className = `leaf leaf-${leafType}`;
            
            // Random starting positions
            leaf.style.left = `${Math.random() * 100}vw`;
            leaf.style.top = `${Math.random() * 100}vh`;
            
            // Random animations
            const duration = 15 + Math.random() * 30;
            const delay = Math.random() * 15;
            
            leaf.style.animation = `floatLeaf${leafType} ${duration}s ease-in-out ${delay}s infinite`;
            
            natureBg.appendChild(leaf);
        }
        
        // Animate trees
        const treeLeft = document.querySelector('.tree-left');
        const treeRight = document.querySelector('.tree-right');
        
        if (treeLeft) {
            treeLeft.style.animation = 'swayLeft 8s ease-in-out infinite';
        }
        
        if (treeRight) {
            treeRight.style.animation = 'swayRight 10s ease-in-out infinite';
        }
    };
    
    // Initialize nature elements
    createNatureElements();
    
    // Wait for the page to fully load
    window.addEventListener('load', () => {
        // Initialize the widget if it exists
        if (typeof GetWaitlistObject !== 'undefined') {
            try {
                // Initialize the widget
                GetWaitlistObject.init();
                console.log('Waitlist widget initialized');
                
                // Add a MutationObserver to detect when the form is added to the DOM
                const waitlistContainer = document.getElementById('getWaitlistContainer');
                if (waitlistContainer) {
                    const observer = new MutationObserver((mutations) => {
                        const form = waitlistContainer.querySelector('form');
                        if (form && !form.dataset.listenerAdded) {
                            // Add submit event listener to the form
                            form.addEventListener('submit', (e) => {
                                // Let the form submit normally first
                                setTimeout(() => {
                                    // Refresh the page after a short delay
                                    window.location.reload();
                                }, 1500); // Wait 1.5 seconds before refreshing
                            });
                            form.dataset.listenerAdded = 'true';
                            observer.disconnect(); // Stop observing once we've found the form
                        }
                    });
                    
                    // Start observing the container for changes
                    observer.observe(waitlistContainer, { childList: true, subtree: true });
                    
                    // Also check for the button directly
                    setTimeout(() => {
                        const submitButton = waitlistContainer.querySelector('button[type="submit"]');
                        if (submitButton && !submitButton.dataset.listenerAdded) {
                            submitButton.addEventListener('click', () => {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1500);
                            });
                            submitButton.dataset.listenerAdded = 'true';
                        }
                    }, 1000); // Give the widget time to initialize
                }
            } catch (error) {
                console.error('Error initializing waitlist widget:', error);
            }
        }
    });
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