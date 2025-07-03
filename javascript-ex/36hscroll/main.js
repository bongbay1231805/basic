gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", (e) => {
  //console.log(e)
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//-----------------------------------

let slider = document.querySelector(".slider");
let slideWrapper = document.querySelector(".slider-wrapper");
let slides = document.querySelectorAll(".slide");

function updateScaleAnPosition() {
  slides.forEach((slide) => {
    let rect = slide.getBoundingClientRect() //upset과 흡사
    // console.log(rect)
    let centerPosition = (rect.left + rect.right) / 2
    let distanceFromCenter = centerPosition
    let scale
    if (distanceFromCenter > 0) {
      // Math.min(10,20) 둘 중 작은 값 //10
      // Math.abs : 절대값
      // window.innerWidth : 화면의 넓이
      scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth)
    } else {
      scale = Math.min(0.5, 1 - Math.abs(distanceFromCenter) / window.innerWidth)
    }
    gsap.set(slide, {
      scale: scale
    })
  })
}
updateScaleAnPosition();

updateScaleAnPosition()
gsap.to(slides, {
  xPercent: -97 * (slides.length - 1),
  scrollTrigger: {
    trigger: '.page',
    start: 'top top',
    end: "+=3000",
    scrub: 1,
    pin: true,
    onUpdate: () => {
      updateScaleAnPosition()
    }

  }
})