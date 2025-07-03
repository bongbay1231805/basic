const cards = gsap.utils.toArray(document.querySelectorAll(".wrap"));
const oddCards = document.querySelectorAll(".wrap:nth-child(even)");

// Animate cards
cards.forEach((card) => {
  const img = card.querySelector("img");
  const minScale = 0.6;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    },
    defaults: { ease: "none" }
  });
  tl.from(img, {
    scale: minScale,
    transformOrigin: "50% 0%"
  })
    .to(img, { scale: 1 })
    .to(img, {
      scale: minScale,
      transformOrigin: "50% 100%"
    });
});

function hide() {
  const state = Flip.getState(cards);
  oddCards.forEach((card) => card.classList.toggle("hide"));
  ScrollTrigger.refresh();
  Flip.from(state, {
    duration: 1,
    scale: true,
    absolute: true,
    absoluteOnLeave: true,
    // stagger: 0.12,
    ease: "circ.inOut",
    zIndex: -1,
    onEnter: (elements) => {
      gsap.fromTo(
        elements,
        {
          filter: "blur(16px)",
          rotation: -25,
          xPercent: -250,
          scale: 1.2
        },
        {
          filter: "blur(0px)",
          rotation: 0,
          xPercent: 0,
          scale: 1,
          duration: 0.6,
          // delay: 0.4,
          // stagger: 0.12,
          ease: "circ.out"
        }
      );
    },
    onLeave: (elements) => {
      gsap.to(elements, {
        filter: "blur(16px)",
        rotation: 25,
        xPercent: 250,
        scale: 1.2,
        duration: 0.6,
        // stagger: 0.12,
        ease: "circ.in"
      });
    },
    onComplete: () => ScrollTrigger.refresh()
  });
}
