gsap.registerPlugin(ScrollTrigger);
let sections = gsap.utils.toArray(".panel");

let tl_1 = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,

    end: () => "+=" + document.querySelector(".container").offsetWidth,
  },
});

gsap.to(".b", {
  x: 1000,
  ease: "none",
  scrollTrigger: {
    trigger: ".gg",
    markers: true,
    pin: true,
    containerAnimation: tl_1,
    scrub: 1,
  },
});