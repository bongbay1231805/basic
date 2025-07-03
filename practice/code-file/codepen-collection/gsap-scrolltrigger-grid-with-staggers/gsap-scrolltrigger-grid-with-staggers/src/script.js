console.clear();

gsap.registerPlugin(ScrollTrigger);

const boxes = gsap.utils.toArray(".box");

const pulseTl = gsap
  .timeline({
    repeat: -1,
    repeatDelay: 2
  })
  .to(boxes, {
    borderColor: "#6cf994",
    ease: "power1.inOut",
    stagger: {
      amount: 1,
      grid: "auto",
      from: 1
    }
  })
  .to(
    boxes,
    {
      borderColor: "#0ae448",
      ease: "power1.inOut",
      stagger: {
        amount: 1,
        grid: "auto",
        from: 1
      }
    },
    "-=0.75"
  );

const scaleTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".panel",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      markers: true
    }
  })
  .to(boxes, {
    scale: 0,
    transformOrigin: "center center",
    ease: "power1.inOut",
    stagger: {
      amount: 1,
      grid: "auto",
      from: [0.5, 0]
    }
  });
