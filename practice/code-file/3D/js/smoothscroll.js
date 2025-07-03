const initSmoothScrolling = () => {
  const lenis = new Lenis({ lerp: 0.2 });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
  });

  gsap.ticker.lagSmoothing(0);
};

initSmoothScrolling();
