console.clear();

const sections = gsap.utils.toArray(".section");
const titles = gsap.utils.toArray(".title-wrapper");

// Initial position for all but the first title
gsap.set(titles, {
  yPercent: (i) => (i ? 100 : 0)
});

const tl = gsap.timeline({
  repeat: -1
});

titles.forEach((title, i) => {
  if (i) {
    const section = sections[i - 1];
    console.log("not first & not last", i);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "clamp(bottom center)",
          end: "bottom top",
          scrub: true,
          markers: {
            indent: 150 * (i - 1),
            startColor: "fuchsia"
          },
          id: i
        }
      })
      .to(titles[i - 1], { yPercent: -100 })
      .to(title, { yPercent: 0 }, "+=0.5");
  }
});