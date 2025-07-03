gsap.registerPlugin(ScrollTrigger);

let cards = gsap.utils.toArray(".card");
let stackHeight = window.innerHeight * 0.25;
console.log(gsap.utils.checkPrefix("filter"))
cards.forEach((card, i) => {
  gsap.fromTo(card.querySelector("img"), {
    scale: 1,
    transformOrigin: "center top",
    filter: "blur(0px)",
  }, {
    y: gsap.utils.mapRange(1, cards.length, -20, -stackHeight + 20, cards.length - i),
    scale: gsap.utils.mapRange(1, cards.length, 0.4, 0.9, i),
    filter: "blur(" + gsap.utils.mapRange(1, cards.length, 4, 25, cards.length - i) + "px)",
    scrollTrigger: {
      trigger: card,
      markers: true,
      scrub: true,
      start: "top " + stackHeight,
      end: "+=" + window.innerHeight * 2,
      invalidateOnRefresh: true
    }
  });
  // pin separately because we want the pinning to last the whole length of the page, but the animation should only be part of it. 
  ScrollTrigger.create({
    trigger: card,
    pin: true,
    start: "top " + stackHeight,
    endTrigger: ".following-content", // when the last card finishes its animation, unpin everything
    end: "top " + (stackHeight + 100),
    pinSpacing: false
  });
});

