console.clear();

const gsapAnimation = () => {
  const cards = gsap.utils.toArray(".box").reverse();
  let tl;

  if (cards.length > 0) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=" + 50 * cards.length + "%",
        scrub: true,
        pin: true,
        markers: true
      }
    });

    cards.forEach((el) => {
      tl.to(el, {
        scale: 1,
        filter: "blur(0px)",
        duration: 1
      }).to(
        el,
        {
          opacity: 0,
          duration: 1
        },
        "-=0.5"
      ); // Adds a delay before starting the opacity animation
    });
  } else {
    console.log("No cards found.");
  }

  // Highlight the navigation link corresponding to the card
  const timelineItems = gsap.utils.toArray(".navigation a");
  if (timelineItems.length > 0) {
    timelineItems.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: {
            y: tl.scrollTrigger.start + window.innerHeight * 0.5 * i
          },
          duration: 1,
          ease: "power1.inOut"
        });
      });
    });
  } else {
    console.log("No timeline items found.");
  }
};

gsapAnimation();
