// Create a canvas for the particles
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Append the canvas to the body and set its position
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '1000';
document.body.appendChild(canvas);

let particles = [];
const particleCount = 100; // Adjust particle density
const particleSize = 3;   // Maximum size of particles
const particleSpeed = 0.5; // Speed of movement

// Update canvas size dynamically
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create particle objects
function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * particleSize + 1,
            xSpeed: (Math.random() - 0.5) * particleSpeed,
            ySpeed: (Math.random() - 0.5) * particleSpeed,
            alpha: Math.random() * 0.8 + 0.2,
        });
    }
}

// Update and draw particles
function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        // Move particle
        particle.x += particle.xSpeed;
        particle.y += particle.ySpeed;

        // Bounce particles off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.xSpeed *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.ySpeed *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.fill();
    });

    requestAnimationFrame(updateParticles);
}

// Initialize particles and animation
createParticles();
updateParticles();
