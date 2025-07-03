const lenis = new Lenis();
console.clear();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//--------------------------------------------

let video = document.querySelector(".page video"),
  videoWidth,
  videoHeight;

function setVideo() {
  videoWidth = video.offsetWidth;
  videoHeight = video.offsetHeight;
}
setVideo();
window.addEventListener("resize", setVideo);
let inset = { x: 0, y: 0, r: 50 };
let snap = gsap.utils.snap(10);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".video-wrapper",
      start: "center center",
      end: "+=1000",
      pin: true,
      scrub: true,
    },
  })
  .fromTo(
    inset,
    {
      x: 0,
      y: 0,
      r: 30,
    },
    {
      duration: 1,
      x: 46,
      y: 34,
      r: 50,
      onUpdate: () => {
        video.style.clipPath = `inset(${(inset.x * videoWidth) / 200}px ${
          (inset.y * videoHeight) / 200
        }px round ${snap(inset.r)}px)`;
      },
    }
  );

//clip-path: inset(20% 30% round 20px);
