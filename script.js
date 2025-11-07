// Animation controller for 15-second video
const totalDuration = 15000; // 15 seconds
const scenes = document.querySelectorAll('.scene');
const progressFill = document.querySelector('.progress-fill');

// Scene timings (in milliseconds)
const sceneDurations = [
    3000,  // Scene 1: Introduction (0-3s)
    3000,  // Scene 2: Installation (3-6s)
    3000,  // Scene 3: Protection (6-9s)
    3000,  // Scene 4: Benefits (9-12s)
    3000   // Scene 5: CTA (12-15s)
];

let currentScene = 0;
let startTime = Date.now();

// Start the animation
function startVideo() {
    showScene(0);
    animateProgress();
    scheduleScenes();
}

// Show specific scene
function showScene(index) {
    scenes.forEach((scene, i) => {
        if (i === index) {
            scene.classList.add('active');
        } else {
            scene.classList.remove('active');
        }
    });
    currentScene = index;
}

// Schedule scene transitions
function scheduleScenes() {
    let cumulativeTime = 0;

    sceneDurations.forEach((duration, index) => {
        if (index > 0) {
            cumulativeTime += sceneDurations[index - 1];
            setTimeout(() => {
                showScene(index);
            }, cumulativeTime);
        }
    });

    // Loop the video after completion
    setTimeout(() => {
        startTime = Date.now();
        startVideo();
    }, totalDuration);
}

// Animate progress bar
function animateProgress() {
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        progressFill.style.width = progress + '%';

        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        }
    }
    updateProgress();
}

// Auto-start on page load
window.addEventListener('load', () => {
    setTimeout(startVideo, 100);
});

// Optional: Click to restart
document.querySelector('.video-container').addEventListener('click', () => {
    startTime = Date.now();
    showScene(0);
    animateProgress();
});
