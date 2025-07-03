console.clear();

gsap.registerPlugin(SplitText, ScrollTrigger);

const split = new SplitText(".wrapper p", {
  type: "words",
  wordsClass: "word"
});

const tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#textSection",
      start: "top top",
      end: "+=150%",
      pin: true,
      toggleActions: "play none none reset",
      markers: true
    }
  })
  .to(
    split.words,
    {
      opacity: 1,
      duration: 0.25,
      stagger: 0.05
    },
    0.1
  );
