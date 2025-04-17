let camera = {
  position: [0, 0, 5],
  rotation: [0, 0, 0],
  target: [0, 0, 0]
};

let dragging = false;
let previousMousePosition = null;
let previousTouchPosition = null;

const rotationSpeed = isMobile() ? 20 * 8 : 1;

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Mouse event listeners
document.addEventListener('mousedown', (event) => {
  dragging = true;
  previousMousePosition = [event.clientX, event.clientY];
});

document.addEventListener('mousemove', (event) => {
  if (dragging) {
    const currentMousePosition = [event.clientX, event.clientY];
    const deltaMousePosition = [
      currentMousePosition[0] - previousMousePosition[0],
      currentMousePosition[1] - previousMousePosition[1]
    ];

    camera.rotation[0] -= deltaMousePosition[1] * rotationSpeed;
    camera.rotation[1] += deltaMousePosition[0] * rotationSpeed;

    previousMousePosition = currentMousePosition;
  }
});

document.addEventListener('mouseup', () => {
  dragging = false;
});

// Touch event listeners
document.addEventListener('touchstart', (event) => {
  dragging = true;
  previousTouchPosition = [event.touches[0].clientX, event.touches[0].clientY];
});

document.addEventListener('touchmove', (event) => {
  event.preventDefault();
  if (dragging) {
    const currentTouchPosition = [event.touches[0].clientX, event.touches[0].clientY];
    const deltaTouchPosition = [
      currentTouchPosition[0] - previousTouchPosition[0],
      currentTouchPosition[1] - previousTouchPosition[1]
    ];

    camera.rotation[0] -= deltaTouchPosition[1] * rotationSpeed;
    camera.rotation[1] += deltaTouchPosition[0] * rotationSpeed;

    previousTouchPosition = currentTouchPosition;
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  dragging = false;
});

// Update cube's transform style based on camera's rotation
function updateCubeTransform() {
  const rotateX = camera.rotation[0];
  const rotateY = camera.rotation[1];
  const cube = document.querySelector('.cube');
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Animate and update cube's transform
function animate() {
  requestAnimationFrame(animate);
  updateCubeTransform();
}
animate();
