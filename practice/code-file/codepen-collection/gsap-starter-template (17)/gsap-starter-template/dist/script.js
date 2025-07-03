console.clear();

let animating = false;
let currentIndex = 0;

const sections = gsap.utils.toArray(".js-project-slide");

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => !animating && gotoSection(currentIndex - 1, false),
  onUp: () => !animating && gotoSection(currentIndex + 1, true),
  tolerance: 10,
  preventDefault: true
});

gotoSection = (index, direction) => {
  if (direction && currentIndex < sections.length - 1) {
    // Next slide
    currentIndex++;
    animating = true;
    gsap.to(sections[currentIndex], {
      yPercent: direction ? 0 : 100,
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => (animating = false)
    });
  } else if (!direction && currentIndex > 0) {
    // Previous slide
    animating = true;
    gsap.to(sections[currentIndex], {
      yPercent: direction ? 0 : 100,
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => (animating = false)
    });
    currentIndex--;
  }
};

gsap.set(sections, { opacity: 1, yPercent: 100 });
gsap.set(sections[0], { yPercent: 0 });