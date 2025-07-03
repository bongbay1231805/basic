let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#verticalContainer",
    markers: true,
    start: "center center",
    end: "bottom top",
    scrub: true,
    pin: true,
  }
})

tl.to('.left', {
  yPercent: -100
})
.from('.right', {
  yPercent: -100
}, 0)