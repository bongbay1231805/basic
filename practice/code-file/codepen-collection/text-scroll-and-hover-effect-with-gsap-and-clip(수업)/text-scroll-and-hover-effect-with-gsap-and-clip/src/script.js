gsap.registerPlugin(ScrollTrigger);

const textElements = gsap.utils.toArray(".text");

textElements.forEach((text) => {
  gsap.to(text, {
    backgroundSize: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: text,
      start: "center 80%",
      end: "center 20%",
      markers: true,
      scrub: true
    }
  });
});

console.clear();
let scaleTime = { time: 0 };
let tlMarquee = gsap
  .timeline({ paused: true })
  .add("start")
  .fromTo(".mq", { xPercent: -50 }, { duration: 5, xPercent: 0, ease: "none" })
  .add("end");
tlMarquee.tweenTo("end", { repeat: -1 });

let verify = true;
$("body").click(function () {
  if (!verify) {
    verify = true;
    //scaleTime = 1
    tlMarquee.tweenTo("end", {
      onComplete: () => {
        tlMarquee.tweenFromTo("start", "end", { repeat: -1 });
      }
    });

    //gsap.to(tlMarquee, {duration: 1, timeScale: scaleTime })
  } else {
    verify = false;
    tlMarquee.tweenTo("start", {
      onComplete: () => {
        tlMarquee.tweenFromTo("end", "start", { repeat: -1 });
      }
    });

    //scaleTime = 1
    //gsap.to(tlMarquee, {duration: 1, timeScale: scaleTime })
  }
});
