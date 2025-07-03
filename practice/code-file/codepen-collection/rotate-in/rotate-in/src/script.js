gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".row-container").forEach((row, i) => {  
  gsap.to(row, {
    "--rotation": "0deg",
    "--indicator": "0",
    scrollTrigger: {
      trigger: row,
      start: "top bottom", 
      end: "bottom 60%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true // to make it responsive
    }
  });
});