let rotationX = 0;
let rotationY = 0;
let cube = document.querySelector(".box-area");
let content = document.querySelector(".box-back h2");

function rotateXAxis(n) {
  rotationX = rotationX + 90 * n;
  rotationY = 0;
  console.log(rotationX);
  content.style.transform = `rotateX(180deg) rotateY(180deg)`;
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(0deg)`;
}

function rotateYAxis(n) {
  rotationY = rotationY + 90 * n;
  rotationX = 0;
  console.log(rotationY);
  //transform: rotateX(0deg) rotateY(0deg)
  content.style.transform = `rotateX(0deg) rotateY(0deg)`;
  cube.style.transform = `rotateX(0deg) rotateY(${rotationY}deg)`;
}

function front() {
  rotationX = 0;
  rotationY = 0;
  cube.style.transform = `rotateX(0deg) rotateY(0deg)`;
}
