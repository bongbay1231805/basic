gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//create the smooth scroller FIRST!
// const smoother = ScrollSmoother.create({
//  wrapper: "#wrapper",
//  content: "#content",
//  smooth: 2,
//  speed: 3,
//  effects: true
// });

// smoother.effects(".hero__image-cont", {
//  speed: () => gsap.utils.random(0.55, 0.85, 0.05)
// });

gsap.to(".anim-swipe", {
 yPercent: 300,
 delay: 0.2,
 duration: 3,
 stagger: {
  from: "random",
  each: 0.5
 },
 ease: "sine.out"
});

gsap.to(".hero__image-cont > img", {
 scale: 1.5,
 xPercent: 20,
 scrollTrigger: {
  trigger: ".hero",
  start: "top top",
  end: "+=3000px",
  scrub: true
 }
});

const cont = gsap.utils.toArray(".hero__image-cont");

// 이미지들을 순회하면서 각각에 대한 애니메이션을 설정합니다.
cont.forEach((item, index) => {
 gsap.to(item, {
  yPercent: 200 * Math.random(),
  scrollTrigger: {
   trigger: ".hero",
   start: "top top",
   end: "+=3000px",
   scrub: true
  }
 });
});