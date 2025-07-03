console.clear();

gsap.to("#path2", {
  morphSVG:
    "M 434.36195,150 H 208.15919 c 0,0 -142.521145,0 -142.521145,123.15778",
  duration: 2,
  ease: "none",
  repeat: -1,
  yoyo: true,
  onUpdate: () => {
    gsap.set("#rect3", {
      motionPath: {
        path: "#path2",
        align: "#path2",
        alignOrigin: [0.5, 0.5],
        start: 0
      }
    });
  }
});
