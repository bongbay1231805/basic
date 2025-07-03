console.clear();

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "max",
  pin: true,
  pinSpacing: false
});

const titles = gsap.utils.toArray(".first h3");
titles.forEach((title) => {
  gsap.to(title, {
    y: -50,
    opacity: 0,
    scrollTrigger: {
      trigger: title,
      start: "top 25%",
      end: "+=200",
      scrub: true,
      markers: true
    }
  });
});
