let boxes = gsap.utils.toArray(".boxes .box");

let boxes_timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".boxes",
    start: "0% 0%",
    pin: ".boxes",
    scrub: true,
    markers: true
  }
});

let depth_multiplier = 1;
boxes.forEach((box) => {
  gsap.set(box, {
    opacity: 0,
    z: -1800 * depth_multiplier
  });

  boxes_timeline.to(box, {
    opacity: 1,
    z: 1000
  });

  depth_multiplier = depth_multiplier + 1;
});
