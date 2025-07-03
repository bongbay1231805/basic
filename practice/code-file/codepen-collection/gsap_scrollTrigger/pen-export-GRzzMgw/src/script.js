const el_list = document.querySelector('.list')
gsap.set(el_list, { width: el_list.clientWidth})

 ScrollTrigger.batch(".listItem", {
      onEnter: batch => gsap.to(batch, {opacity: 1, stagger: 0.2}),
      onLeaveBack: batch => gsap.to(batch, {opacity: 0.2}),
      start: "top center",
      markers: true,
  });


gsap.to('.container', {
    padding: 0,
    scrollTrigger: {
      trigger: '.container',
      start:'center center',
      end: '=+200%',
      pin: ".wrapper",
      markers: true,
      scrub: true,
  }
})