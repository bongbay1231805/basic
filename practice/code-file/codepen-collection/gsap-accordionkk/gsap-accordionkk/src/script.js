gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".accordions",
    pin: true,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    ease: "linear"
  }
});

tl.to(".accordion .text", {
  height: 0,
  paddingBottom: 0,
  opacity: 0,
  stagger: 0.5
});
tl.to(
  ".accordion",
  {
    marginBottom: -15,
    stagger: 0.5
  },
  "<" // indicates that this animation should start before the previous one finishes
);
