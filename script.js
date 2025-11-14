// Theme/Time of Day Switch Functionality
let themeState = 0; // 0 = day, 1 = sunset, 2 = night
const themeSwitch = document.getElementById('themeSwitch');
const switchSlider = document.querySelector('.switch-slider');
const switchOptions = document.querySelectorAll('.switch-option');

// Video elements for crossfading
const video1 = document.getElementById('bgVideo1');
const video2 = document.getElementById('bgVideo2');
let activeVideo = video1;
let inactiveVideo = video2;

// Video sources for each theme
const videoSources = {
    day: 'assets/Eu_Day.mp4',
    sunset: 'assets/Eu_Sunset.mp4',
    night: 'assets/Eu_Night.mp4'
};

// Update switch position and active state
function updateSwitchPosition() {
    // Remove all position classes
    if (switchSlider) {
        switchSlider.classList.remove('pos-1', 'pos-2');
        
        // Add appropriate position class
        if (themeState === 1) {
            switchSlider.classList.add('pos-1');
        } else if (themeState === 2) {
            switchSlider.classList.add('pos-2');
        }
    }
    
    // Update active state on options
    switchOptions.forEach((option, index) => {
        if (index === themeState) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Smooth video transition
function transitionToVideo(newSource) {
    // Don't transition if it's the same video
    const currentSource = activeVideo.querySelector('source').src;
    if (currentSource.includes(newSource.split('/').pop())) {
        return;
    }
    
    // Set up the inactive video with new source
    const source = inactiveVideo.querySelector('source');
    source.src = newSource;
    inactiveVideo.load();
    
    // Wait for the new video to be ready
    inactiveVideo.addEventListener('loadeddata', function onLoaded() {
        inactiveVideo.removeEventListener('loadeddata', onLoaded);
        
        // Start playing the new video
        inactiveVideo.play().then(() => {
            // Crossfade: show inactive video, hide active video
            inactiveVideo.classList.add('active');
            activeVideo.classList.remove('active');
            
            // Swap references
            const temp = activeVideo;
            activeVideo = inactiveVideo;
            inactiveVideo = temp;
        }).catch(err => {
            console.log('Video play failed:', err);
        });
    });
}

// Get video source based on theme state
function getVideoSource() {
    switch(themeState) {
        case 0:
            return videoSources.day;
        case 1:
            return videoSources.sunset;
        case 2:
            return videoSources.night;
        default:
            return videoSources.day;
    }
}

// Change theme to specific state
function changeTheme(newState) {
    if (newState !== themeState) {
        themeState = newState;
        updateSwitchPosition();
        
        // Get new video source and transition
        const newSource = getVideoSource();
        transitionToVideo(newSource);
    }
}

// Set initial state
updateSwitchPosition();

// Add click handlers to each switch option
switchOptions.forEach((option, index) => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        changeTheme(index);
    });
});

// Ensure initial video plays
if (video1) {
    video1.play().catch(err => {
        console.log('Video autoplay failed:', err);
    });
}

// Sound Toggle
    const soundToggleBtn = document.getElementById('soundToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');

if (soundToggleBtn && backgroundAudio) {
    let isMuted = true; // Start muted
    soundToggleBtn.classList.add('muted');
    
    // Set background audio volume
    backgroundAudio.volume = 0.3; // 30% volume
    
    soundToggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        
        if (isMuted) {
            backgroundAudio.pause();
            soundToggleBtn.classList.add('muted');
        } else {
            backgroundAudio.play().catch(err => {
                console.log('Audio play error:', err);
                // If play fails, reset to muted
                isMuted = true;
                soundToggleBtn.classList.add('muted');
            });
            soundToggleBtn.classList.remove('muted');
        }
    });
}

// Projects navigation and carousel
const projectsButton = document.getElementById('projectsButton');
const heroCta = document.getElementById('heroCta');
const heroVideoBtn = document.getElementById('heroVideoBtn');
const aboutTrigger = document.getElementById('aboutTrigger');
const introVideoOverlay = document.getElementById('introVideoOverlay');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const introVideo = document.getElementById('introVideo');
const introDeck = document.getElementById('introDeck');
const aboutOverlay = document.getElementById('aboutOverlay');
const closeAboutBtn = document.getElementById('closeAboutBtn');
const projectsSection = document.getElementById('projectsSection');
const backButton = document.getElementById('backButton');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevProjectBtn');
const nextBtn = document.getElementById('nextProjectBtn');

let currentProjectIndex = 0;

// Show projects section
function showProjects() {
    console.log('Showing projects');
    document.body.classList.add('projects-active');
    if (projectsSection) {
        projectsSection.classList.add('active');
    }
    updateCarousel();
}

// Hide projects section
function hideProjects() {
    console.log('Hiding projects');
    document.body.classList.remove('projects-active');
    if (projectsSection) {
        projectsSection.classList.remove('active');
    }
}

// Update carousel positioning with circular wrapping
function updateCarousel() {
    const totalCards = projectCards.length;
    
    projectCards.forEach((card, index) => {
        // Calculate offset with circular wrapping
        let offset = index - currentProjectIndex;
        
        // Wrap around for circular effect
        if (offset > totalCards / 2) {
            offset -= totalCards;
        } else if (offset < -totalCards / 2) {
            offset += totalCards;
        }
        
        // Remove active class from all
        card.classList.remove('active');
        
        if (offset === 0) {
            // Center card (active) - fully visible
            card.style.transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)';
            card.style.opacity = '1';
            card.style.zIndex = '50';
            card.style.pointerEvents = 'auto';
            card.classList.add('active');
        } else if (offset === 1) {
            // First card to the right - visible and clickable
            card.style.transform = `translateX(200px) translateZ(-150px) rotateY(-20deg) scale(0.85)`;
            card.style.opacity = '0.7';
            card.style.zIndex = '40';
            card.style.pointerEvents = 'auto';
        } else if (offset === -1) {
            // First card to the left - visible and clickable
            card.style.transform = `translateX(-200px) translateZ(-150px) rotateY(20deg) scale(0.85)`;
            card.style.opacity = '0.7';
            card.style.zIndex = '40';
            card.style.pointerEvents = 'auto';
        } else if (offset > 1) {
            // Cards further right - stacked behind
            card.style.transform = `translateX(${200 + (offset - 1) * 50}px) translateZ(-${150 + (offset - 1) * 80}px) rotateY(-25deg) scale(0.7)`;
            card.style.opacity = '0.4';
            card.style.zIndex = `${40 - offset}`;
            card.style.pointerEvents = 'none';
        } else {
            // Cards further left - stacked behind
            card.style.transform = `translateX(-${200 + (Math.abs(offset) - 1) * 50}px) translateZ(-${150 + (Math.abs(offset) - 1) * 80}px) rotateY(25deg) scale(0.7)`;
            card.style.opacity = '0.4';
            card.style.zIndex = `${40 + offset}`;
            card.style.pointerEvents = 'none';
        }
    });
    
    // Update project details
    updateProjectDetails();
}

// Update project details panel
function updateProjectDetails() {
    const currentCard = projectCards[currentProjectIndex];
    const description = currentCard.getAttribute('data-description');
    const keywords = currentCard.getAttribute('data-keywords').split(', ');
    const role = currentCard.getAttribute('data-role');
    const timeline = currentCard.getAttribute('data-timeline');
    const impact = currentCard.getAttribute('data-impact');
    
    document.getElementById('projectDescription').textContent = description;
    document.getElementById('projectRole').textContent = role;
    document.getElementById('projectTimeline').textContent = timeline;
    document.getElementById('projectImpact').textContent = impact;
    
    const keywordsContainer = document.getElementById('projectKeywords');
    keywordsContainer.innerHTML = '';
    keywords.forEach(keyword => {
        const span = document.createElement('span');
        span.className = 'keyword';
        span.textContent = keyword;
        keywordsContainer.appendChild(span);
    });
}

// Next project - infinite loop
function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projectCards.length;
    updateCarousel();
}

// Previous project - infinite loop
function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projectCards.length) % projectCards.length;
    updateCarousel();
}

// Projects button click handler
if (projectsButton) {
    projectsButton.addEventListener('click', () => {
        showProjects();
    });
}

// Hero CTA button click handler
if (heroCta) {
    heroCta.addEventListener('click', () => {
        showProjects();
    });
}

function openIntroVideo() {
    if (!introVideoOverlay) return;
    introVideoOverlay.classList.add('visible');
    introVideoOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-open');
    if (introVideo) {
        introVideo.currentTime = 0;
        introVideo.play().catch(err => {
            console.log('Intro video play failed:', err);
        });
    } else if (introDeck) {
        introDeck.focus();
    }
}

function closeIntroVideo() {
    if (!introVideoOverlay) return;
    introVideoOverlay.classList.remove('visible');
    introVideoOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-open');
    if (introVideo) {
        introVideo.pause();
    }
}

if (heroVideoBtn) {
    heroVideoBtn.addEventListener('click', () => {
        openIntroVideo();
    });
}

if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeIntroVideo();
    });
}

if (introVideoOverlay) {
    introVideoOverlay.addEventListener('click', (e) => {
        if (e.target === introVideoOverlay) {
            closeIntroVideo();
        }
    });
}

function openAboutOverlay() {
    if (!aboutOverlay) return;
    aboutOverlay.classList.add('visible');
    aboutOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('about-open');
}

function closeAboutOverlay() {
    if (!aboutOverlay) return;
    aboutOverlay.classList.remove('visible');
    aboutOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('about-open');
}

if (aboutTrigger) {
    aboutTrigger.addEventListener('click', () => {
        openAboutOverlay();
    });
}

if (closeAboutBtn) {
    closeAboutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAboutOverlay();
    });
}

if (aboutOverlay) {
    aboutOverlay.addEventListener('click', (e) => {
        if (e.target === aboutOverlay) {
            closeAboutOverlay();
        }
    });
}

// Back button click handler
if (backButton) {
    console.log('Back button found, adding click listener');
    backButton.addEventListener('click', (e) => {
        console.log('Back button clicked!');
        e.preventDefault();
        e.stopPropagation();
            hideProjects();
        });
} else {
    console.error('Back button NOT found!');
}

// Navigation buttons with debounce
let buttonCooldown = false;

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (buttonCooldown) return;
        buttonCooldown = true;
        prevProject();
        setTimeout(() => {
            buttonCooldown = false;
        }, 650);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (buttonCooldown) return;
        buttonCooldown = true;
        nextProject();
        setTimeout(() => {
            buttonCooldown = false;
        }, 650);
    });
}

// Project card click handlers - go to case study
projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (index === currentProjectIndex) {
            // If clicking the active card, navigate to case study
            const link = card.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        } else {
            // If clicking a non-active card, make it active
            currentProjectIndex = index;
            updateCarousel();
        }
    });
});

// Keyboard navigation with debounce
let keyboardCooldown = false;

document.addEventListener('keydown', (e) => {
    const videoOpen = introVideoOverlay && introVideoOverlay.classList.contains('visible');
    const aboutOpen = aboutOverlay && aboutOverlay.classList.contains('visible');
    
    if (videoOpen && e.key === 'Escape') {
        closeIntroVideo();
        return;
    }
    
    if (aboutOpen && e.key === 'Escape') {
        closeAboutOverlay();
        return;
    }
    
    // If projects are active
    if (projectsSection && projectsSection.classList.contains('active')) {
        if (keyboardCooldown && e.key !== 'Escape') return;
        
        if (e.key === 'ArrowLeft') {
            keyboardCooldown = true;
            prevProject();
            setTimeout(() => {
                keyboardCooldown = false;
            }, 650);
        } else if (e.key === 'ArrowRight') {
            keyboardCooldown = true;
            nextProject();
            setTimeout(() => {
                keyboardCooldown = false;
            }, 650);
        } else if (e.key === 'Escape') {
            hideProjects();
        } else if (e.key === 'Enter' || e.key === ' ') {
            // Press Enter or Space on active card to view it
            const activeCard = projectCards[currentProjectIndex];
            const link = activeCard.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        }
    } else {
        // If on homepage
        if (videoOpen || aboutOpen) {
            return;
        }
        
        if (e.key === 'w' || e.key === 'W') {
            // Press 'W' to view work/projects
            showProjects();
        }
    }
});

// Mouse wheel scrolling
let isScrolling = false;

if (projectsSection) {
    projectsSection.addEventListener('wheel', (e) => {
        if (!projectsSection.classList.contains('active')) return;
        
            e.preventDefault();
        
        if (isScrolling) return;
        
        isScrolling = true;
        
        if (e.deltaY > 0 || e.deltaX > 0) {
            // Scroll down or right - next project
            nextProject();
        } else if (e.deltaY < 0 || e.deltaX < 0) {
            // Scroll up or left - previous project
            prevProject();
        }
        
        // Debounce matches animation duration
        setTimeout(() => {
            isScrolling = false;
        }, 650);
    }, { passive: false });
}

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let isSwiping = false;

if (projectsSection) {
    projectsSection.addEventListener('touchstart', (e) => {
        if (!projectsSection.classList.contains('active')) return;
        if (isSwiping) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    projectsSection.addEventListener('touchend', (e) => {
        if (!projectsSection.classList.contains('active')) return;
        if (isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only register horizontal swipes (not vertical scrolling)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
        isSwiping = true;
        
        if (deltaX > 0) {
            // Swipe right - previous project
            prevProject();
        } else {
            // Swipe left - next project
            nextProject();
        }
        
        // Reset swipe lock
        setTimeout(() => {
            isSwiping = false;
        }, 650);
    }
}

// Check if coming from a case study (hash = #projects)
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#projects') {
        // Small delay to ensure page is loaded
        setTimeout(() => {
            showProjects();
        }, 100);
    }
});
