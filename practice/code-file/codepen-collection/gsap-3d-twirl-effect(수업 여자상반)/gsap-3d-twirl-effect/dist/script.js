gsap.registerPlugin(CSSPlugin, ScrollTrigger);

gsap.defaults({
  overwrite: "auto",
});

gsap.fromTo(".pic",{y:-25}, {duration:1, y:25, ease:"sine.inOut",  stagger: { each:0.1, yoyo:true, repeat:-1 } });

gsap.fromTo(".pic",{rotationY:-90}, {
    scrollTrigger: {
      trigger: ".pic",
      scrub: true,
      start: "top bottom",
      end: "bottom top"
    },
    rotationY:90,
    ease: "none",
    stagger: 0.03
  });

  gsap.fromTo(".pic",{opacity:0}, {
    scrollTrigger: {
      trigger: ".pic",
      scrub: true,
      start: "top bottom",
      end: "bottom center"
    },
    opacity:1,
    ease: "none",
    stagger: 0.03
  });