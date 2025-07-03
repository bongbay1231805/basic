console.clear();

gsap.registerPlugin(ScrollTrigger);

// pin the image
const heroSt = ScrollTrigger.create({
  trigger: ".hero",
  start: "bottom 250",
  end: "top bottom",
  endTrigger: ".spacer",
  pin: true,
  pinSpacing: false,
  markers: true,
  id: "hero"
});

// Pin left column
ScrollTrigger.create({
  trigger: ".left-row",
  start: () => heroSt.start,
  end: () => heroSt.end,
  pin: true,
  pinSpacing: false,
  markers: { indent: 150 },
  id: "lft"
});

// Pin right column
ScrollTrigger.create({
  trigger: ".right-row",
  start: "top 250",
  end: heroSt.end,
  pin: true,
  pinSpacing: false,
  markers: { indent: 300 },
  id: "rgt"
});