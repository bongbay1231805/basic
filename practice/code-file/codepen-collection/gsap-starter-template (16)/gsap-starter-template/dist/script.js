document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const slider = document.querySelector(".service-slider_wrapper");
  if (window.innerWidth >= 500 && slider) {
    const rightSections = document.querySelectorAll(".service-slider__item");

    const pin = gsap.to(rightSections, {
      yPercent: -100 * (rightSections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: slider,
        pin: ".pin-wrapper",
        invalidateOnRefresh: true,
        start: "center center-=100",
        scrub: 1,
        end: () => "+=" + (slider.offsetHeight || 0),
        markers: true
      }
    });

    // Clean up function to kill the animation
    window.addEventListener("beforeunload", () => {
      pin.kill();
    });
  }
});