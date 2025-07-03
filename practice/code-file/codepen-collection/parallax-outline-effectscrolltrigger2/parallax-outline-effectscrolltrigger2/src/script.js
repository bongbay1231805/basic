let viewHeight = window.innerHeight;
let viewWidth = window.innerWidth;

let textContainers = document.querySelectorAll('.text-container');

textContainers.forEach((element, index) => {
  let top = element.getBoundingClientRect().top;
  let start = viewHeight - top;

  let firstText = element.querySelector('.parallax-text:first-child');
  let secondText = element.querySelector('.parallax-text:last-child');

  gsap.to(firstText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: start + "px bottom",
      end: "bottom top"
    },
    x: '-54vw',
    transformOrigin: "left center", 
    ease: "none"
  });
  gsap.to(secondText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: start + "px bottom",
      end: "bottom top"
    },
    x: '32vw',
    transformOrigin: "left center", 
    ease: "none"
  });
});

// // for presentation
// let tl = gsap.timeline({
//   repeat: -1
// });

// tl.set({}, {}, 0.6);
// tl.to(window, {
//   duration: 4,
//   scrollTo: {
//     y:"max"
//   },
//   ease: Power2.easeInOut
// });
// tl.to(window, {
//   delay: 0.6,
//   duration: 4,
//   scrollTo: 0,
//   ease: Power2.easeInOut
// });