'use strict';

let now = new Date();
const log = (str) => console.log(`${str}\n⌚${new Date() - now}`);

class Ball {
  constructor(x, y) {
    this.ball;
    this.x = x;
    this.y = y;
    this.size = 100;
    this.speed = 400;
    this.deg = this.generateDeg();
    this.tick;

    this.create();
    this.push(this.deg);
  }

  generateDeg() {
    return Math.floor(Math.random() * 361);
  }

  degToRad(deg) {
    return deg * Math.PI/180;
  }

  create() {
    this.ball = document.createElement('div');
    this.ball.classList.add('ball');
    this.ball.style.width = this.size + 'px';
    this.ball.style.height = this.size + 'px';
    let top = this.y - this.size / 2;
    let left = this.x - this.size / 2;
    if (top < 0) top = 0;
    if (left < 0) left = 0;
    if (top + this.size > window.innerHeight) top = window.innerHeight - this.size;
    if (left + this.size > window.innerWidth) left = window.innerWidth - this.size;
    this.ball.style.top = top + 'px';
    this.ball.style.left = left + 'px';
    document.body.insertAdjacentElement('beforeend', this.ball);
  }

  move(deg) {
    const rect = this.ball.getBoundingClientRect();
    const changeX = this.speed * Math.cos(this.degToRad(deg));
    const changeY = this.speed * Math.sin(this.degToRad(deg));
    this.ball.style.left = rect.left + changeX * 2 + 'px';
    this.ball.style.top = rect.top + changeY * 2 + 'px';
  }

  push(deg) {
    this.deg = deg;
    this.move(deg);
    this.tick = setInterval(() => {
      this.move(deg);
    }, 1000);
  }

  remove() {
    clearInterval(this.tick);
    this.ball.remove();
  }
}

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log('raw', entry);
    if (entry.isIntersecting) return;
    const ball = entry.target.ball;
    const intersection = entry.intersectionRect;
    const root = entry.rootBounds;
    let newDeg;

    if (intersection.left <= 0 || intersection.right >= root.width) {
      newDeg = 180 - ball.deg;
      if (newDeg < 0) newDeg = 360 + newDeg;
    }
    if (intersection.bottom >= root.height || intersection.top <= 0) {
      newDeg = Math.abs(360 - ball.deg); 
    }

    clearInterval(ball.tick);

    ball.push(newDeg);
  });
}, {
  root: document.body,
  threshold: [1]
})

document.addEventListener('click', function(e) {
  const ball = new Ball(e.clientX, e.clientY);
  ball.ball.ball = ball; // I'm sorry xD Just need a reference to the Class within html element
  io.observe(ball.ball);
  // MORE BALLS!
});

document.addEventListener('keydown', function(e) {
  if (e.code === 'Escape') {
    document.querySelectorAll('.ball').forEach(ball => {
      ball.ball.remove();
    });
  }
});