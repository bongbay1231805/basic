gsap.registerPlugin(ScrollTrigger);

let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".banner-container card",
    start: "top 20px",
    end: "600px top",
    // scrub:1,
    // markers:true,
    toggleActions: "restart pause restart pause"
  }
});
tl1
  .from(".banner-container .text h1", { x: 200, opacity: 0, duration: 1 })
  .from(".banner-container .text p", { y: 300, opacity: 0, duration: 1 }, "-=1")
  .from(".banner-container .card", { y: -300, opacity: 0, duration: 1 }, "-=1");

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".last-container",
    start: "top top",
    end: "300px center",
    scrub: 2,
    // markers:true,
    toggleActions: "restart pause reverse pause"
  }
});
tl2.from(".last-container .vertical p", { y: 300, opacity: 0, duration: 1 });

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-container .panel.one",
    start: "80px center",
    end: "80px bottom",
    scrub: 3,
    // markers:true,
    toggleActions: "restart pause reverse pause"
  }
});
tl3
  .from(".horizontal-container .panel.one h2", {
    y: -80,
    opacity: 0,
    duration: 0.8
  })
  .from(
    ".horizontal-container .panel.one .card",
    { y: 300, opacity: 0, duration: 0.8 },
    "<0.4"
  );

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-container .panel.two .card:nth-child(4)",
    start: "1600px top",
    end: "1600px bottom",
    scrub: 3,
    // markers:true,
    toggleActions: "restart pause reverse pause"
  }
});
tl4.from(".horizontal-container .panel.two .card", {
  y: 400,
  opacity: 0,
  duration: 1.2,
  stagger: 0.6
});

let tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".horizontal-container .panel.three p",
    start: "4600px top",
    end: "4600px bottom",
    scrub: 3,
    // markers:true,
    toggleActions: "restart pause reverse pause"
  }
});
tl5
  .from(".horizontal-container .panel.three .card", {
    y: 400,
    opacity: 0,
    duration: 1.2
  })
  .from(
    ".horizontal-container .panel.three p",
    { x: 500, opacity: 0, duration: 1.2 },
    "<.7"
  );

let sections = gsap.utils.toArray(".panel"),
  container = document.querySelector(".horizontal-container");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    id: "trigger",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + container.offsetWidth
  }
});