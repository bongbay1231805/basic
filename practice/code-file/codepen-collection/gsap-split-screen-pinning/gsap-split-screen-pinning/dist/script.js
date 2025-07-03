const mainElem = document.querySelector(".splitScreenPinning");
const details = gsap.utils.toArray(".splitScreenPinning__content-section:not(:first-child)")
const photos = gsap.utils.toArray(".splitScreenPinning__image:not(:first-child)")
const allPhotos = gsap.utils.toArray(".splitScreenPinning__image");
let mm = gsap.matchMedia();

gsap.set(photos, { yPercent: 100 });

mm.add("(min-width: 1200px)", () => {

  ScrollTrigger.create({
    trigger:".splitScreenPinning",
    start: "top top",
    end: "bottom bottom",
    pin: ".splitScreenPinning__right",
    scrub: 0.8,
  })

  details.forEach((detail, index)=> {

    let animation = gsap.timeline()
    .to(photos[index], { yPercent: 0 })
    .set(allPhotos[index], { autoAlpha: 0 })
    .to(mainElem, { backgroundColor: detail.dataset.bgColor }, 0);;

    ScrollTrigger.create({
      trigger: detail,
      start: "top 80%",
      end: "top 10%",
      ease: "power4.out",
      animation: animation,
      scrub: true,
    });
  });

});