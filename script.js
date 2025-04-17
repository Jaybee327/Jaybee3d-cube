let camera = {
  position: [0, 0, 5],
  rotation: [0, 0, 0],
  target: [0, 0, 0]
};

let dragging = false;
let previousMousePosition = null;

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

    camera.rotation[0] -= deltaMousePosition[1] * 0.5;
    camera.rotation[1] += deltaMousePosition[0] * 0.5;

    previousMousePosition = currentMousePosition;
  }
});

document.addEventListener('mouseup', () => {
  dragging = false;
});

function updateCubeTransform() {
  const rotateX = camera.rotation[0];
  const rotateY = camera.rotation[1];
  const cube = document.querySelector('.cube');
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function animate() {
  requestAnimationFrame(animate);
  updateCubeTransform();
}
animate();