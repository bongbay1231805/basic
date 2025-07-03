console.clear();

gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".card");
gsap.set(cards, { xPercent: -50, yPercent: 100, autoAlpha: 1 });

const tl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power1.inOut"
  },
  scrollTrigger: {
    trigger: ".wrapper",
    start: "top top",
    end: "+=150%",
    pin: "main",
    scrub: true,
    markers: true
  }
});

cards.forEach((card, i) => {
  tl.to(
    card,
    {
      y: -window.innerHeight * 0.4,
      yPercent: 0
    },
    "<"
  ).to(card, {
    autoAlpha: 0,
    duration: 0.5
  });
});
