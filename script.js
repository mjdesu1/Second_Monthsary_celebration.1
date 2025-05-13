document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts for the header
    createFloatingHearts();
    
    // Initialize animations with GSAP
    initAnimations();
    
    // Setup gallery image modal
    setupGalleryModal();
    
    // Setup music player
    setupMusicPlayer();
    
    // Set up countdown to next milestone
    setupNextMilestoneCountdown();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
});

// Create floating hearts in the background
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const numHearts = 20;
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomize position, size, and animation delay
        const size = Math.random() * 20 + 20;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Initialize GSAP animations
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in timeline items
    gsap.utils.toArray('.timeline-content').forEach(item => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Fade in and scale memory cards
    gsap.utils.toArray('.memory-card').forEach(card => {
        gsap.from(card, {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
}

// Setup gallery image modal functionality
function setupGalleryModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image-display');
    const captionText = document.getElementById('modal-caption-text');
    const closeBtn = document.querySelector('.close-modal');
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.querySelector('img').src;
            captionText.innerHTML = this.querySelector('.gallery-caption').textContent;
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Setup music player functionality
function setupMusicPlayer() {
    const playPauseBtn = document.getElementById('play-pause');
    const audio = document.getElementById('background-music');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';
    const nowPlayingText = document.querySelector('.now-playing');
    
    // Set up music file URL here (can update with an actual URL when you have it)
    // For now, I'll leave it commented out since the placeholder won't work
    // audio.src = "your-song-url.mp3";
    
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = pauseIcon;
            nowPlayingText.textContent = "Now playing";
        } else {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
            nowPlayingText.textContent = "Click to play our song";
        }
    });
}

// Set up countdown to next milestone
function setupNextMilestoneCountdown() {
    const countdownElement = document.getElementById('next-milestone');
    
    // Calculate the next monthsary date (May 15, 2025)
    const startDate = new Date('March 15, 2025');
    const nextMonthsary = new Date('May 15, 2025');
    const today = new Date();
    
    // Calculate days remaining
    const daysRemaining = Math.ceil((nextMonthsary - today) / (1000 * 60 * 60 * 24));
    
    // Display the countdown
    countdownElement.textContent = `${daysRemaining} days until our 2nd Monthsary`;
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        // Toggle mobile nav menu
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "100%";
            navLinks.style.left = "0";
            navLinks.style.right = "0";
            navLinks.style.backgroundColor = "white";
            navLinks.style.padding = "1rem";
            navLinks.style.boxShadow = "0 5px 10px rgba(0,0,0,0.1)";
        }
    });
    
    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = "none";
            }
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


}

// Calculate and display days together since relationship began
function updateDaysTogether() {
    const daysElement = document.getElementById('days-together');
    const startDate = new Date('March 15, 2025');
    const today = new Date();
    
    // Calculate difference in days
    const timeDiff = today - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Update the element
    daysElement.textContent = daysDiff;
}



// Call updateDaysTogether on page load
updateDaysTogether();