// Helper function to play button click sound (Disabled)
function playButtonClickSound() {
    // Sound has been removed from case studies
    return;
}

// Elegant Cursor Effect with Trail
function initCloudCursor() {
    // Create cursor element
    const cloudCursor = document.createElement('div');
    cloudCursor.className = 'cloud-cursor';
    cloudCursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        mix-blend-mode: difference;
    `;
    
    // Add cursor dot
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 50%;
        top: 0;
        left: 0;
        transition: transform 0.2s ease;
    `;
    cloudCursor.appendChild(dot);
    
    document.body.appendChild(cloudCursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation with trailing effect
    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cloudCursor.style.left = cursorX + 'px';
        cloudCursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cloudCursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cloudCursor.style.opacity = '1';
    });
}

// Theme Switch for Case Studies
function initThemeSwitch() {
    const themeSwitch = document.getElementById('themeSwitch');
    const switchOptions = document.querySelectorAll('.switch-option');
    const switchSlider = document.querySelector('.switch-slider');
    const spaceVideo = document.getElementById('spaceVideo');
    const videoSource = document.getElementById('videoSource');
    
    if (!themeSwitch || !spaceVideo || !videoSource) return;
    
    let themeState = 0; // 0 = day, 1 = sunset, 2 = night
    
    // Video sources for each theme
    const videoThemes = [
        'assets/Eu_Day.mp4',
        'assets/Eu_Sunset.mp4',
        'assets/Eu_Night.mp4'
    ];
    
    // Update switch position and active state
    function updateSwitchPosition() {
        if (switchSlider) {
            switchSlider.classList.remove('pos-1', 'pos-2');
            
            if (themeState === 1) {
                switchSlider.classList.add('pos-1');
            } else if (themeState === 2) {
                switchSlider.classList.add('pos-2');
            }
        }
        
        switchOptions.forEach((option, index) => {
            option.classList.toggle('active', index === themeState);
        });
    }
    
    // Change theme
    function changeTheme(newState) {
        if (newState !== themeState) {
            themeState = newState;
            updateSwitchPosition();
            
            // Update video source
            videoSource.src = videoThemes[themeState];
            spaceVideo.load();
            spaceVideo.play().catch(err => {
                console.log('Video autoplay failed:', err);
            });
        }
    }
    
    // Initialize with day theme
    updateSwitchPosition();
    
    // Add click handlers
    switchOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            changeTheme(index);
        });
    });
}

// Sound Toggle (Disabled - No sound in case studies)
function initSoundToggle() {
    // Sound functionality has been removed from case studies
    return;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Case Study loaded');
    
    // Add fade-in transition on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    // Trigger fade-in after a brief delay
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
    
    // Initialize theme switch
    initThemeSwitch();
    
    // Initialize sound toggle
    initSoundToggle();
    
    // Add click sound to back button and next project link
    const backButton = document.querySelector('.back-button');
    const nextProjectLink = document.querySelector('.next-project-link');
    
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add fade out transition
            document.body.style.transition = 'opacity 0.4s ease-out';
            document.body.style.opacity = '0';
            
            // Navigate after transition
            const href = backButton.getAttribute('href');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    }
    
    if (nextProjectLink) {
        nextProjectLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add fade out transition
            document.body.style.transition = 'opacity 0.4s ease-out';
            document.body.style.opacity = '0';
            
            // Navigate after transition
            const href = nextProjectLink.getAttribute('href');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    }
    
    // Smooth scroll for anchor links
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
});

