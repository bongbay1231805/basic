const lerp = (a, b, t) => a + (b - a) * t;
const items = new Array(10).fill(null);
const positions = new Array(10).fill({ x: 0, y: 0 });
const shadowOffsetX = 3000;
const shadowOffsetY = 3000;
const scale = .1;
let mouse;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * scale;
canvas.height = window.innerHeight * scale;

const handleResize = () => {
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
};

const handleMouse = e => {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  mouse = { x: x * scale, y: y * scale };
};

window.addEventListener("mousemove", handleMouse);
window.addEventListener("resize", handleResize);

function animate(t) {
  if (mouse) {
    for (var i = items.length - 1; i > 0; i--) {
      items[i] = items[i - 1];
    }
    items[0] = { x: mouse.x, y: mouse.y };
  }
  ctx.shadowColor = 'rgba(255, 255, 255, 1)';
  ctx.shadowBlur = 40 * scale;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < items.length; i++) {
    const pos = items[i];
    if (pos) {
      positions[i].x = lerp(positions[i].x, pos.x, .9 - 0.05 * i);
      positions[i].y = lerp(positions[i].y, pos.y, .9 - 0.05 * i);

      ctx.beginPath();
      ctx.arc(positions[i].x - shadowOffsetX, positions[i].y - shadowOffsetY, 40 * scale, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  requestAnimationFrame(animate);
}
animate();