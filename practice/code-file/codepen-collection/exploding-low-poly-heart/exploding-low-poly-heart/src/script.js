const select = s => document.querySelector(s);
const selectAll = s => document.querySelectorAll(s)

const heart = selectAll('polygon')
let together = false;

gsap.set(heart, {
  transformOrigin: 'center'
});

function disperse() {
  heart.forEach(poly => {
    gsap.to(poly, {
      duration: 1,
      x: 'random(-3000, 3000)',
      y: 'random(-3000, 3000)',
      rotation: 'random(0, 360)',
      scale: 'random(1.5, 2.0)',
      ease: 'power2'
    })
  })
  
  gsap.to('#gBlur', {
    duration: 1,
    attr: { stdDeviation: 12 },
    ease: 'power2'
  })
  
  gsap.to('#text', {
    duration: 1,
    autoAlpha: 1
  })
};

function putTogether() {
  gsap.to(heart, {
      duration: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      ease: 'back(0.8)',
      stagger: 0.001
    }
  )
  
  gsap.to('#gBlur', {
    duration: 1,
    attr:{
      stdDeviation: 0
    },
     ease: 'back'
  })
  
  gsap.to('#text', {
    duration: 1,
    autoAlpha: 0,
    delay: 0.5
  })
}

function handleEvents() {
  if(together) {
    disperse();
  } else {
    putTogether();
  }
  together = !together;
}

document.addEventListener('click', handleEvents, false);

disperse();