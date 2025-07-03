console.clear();

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".container",
  start: "top top",
  end: "max",
  pin: true,
  pinSpacing: false,
  markers: true,
  id: "pin"
});

let playhead = { frame: 0 },
  animation = lottie.loadAnimation({
    container: document.querySelector(".lottie-container"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets.codepen.io/35984/tapered_hello.json"
    // path: "https://assets-v2.lottiefiles.com/a/940e9c48-118b-11ee-91bd-379eb366d204/RJaC0UUtyE.json",
  });
animation.addEventListener("DOMLoaded", function () {
  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=200%",
        scrub: true,
        id: "tl",
        markers: { indent: 200 }
      }
    })
    .fromTo(
      "h1",
      {
        opacity: 0,
        y: () => window.innerHeight / 2
      },
      {
        opacity: 1,
        y: () => -(100 + window.innerHeight / 2),
        ease: "power1.inOut"
      }
    )
    .to(playhead, {
      frame: animation.totalFrames - 1,
      ease: "none",
      onUpdate: () => animation.goToAndStop(playhead.frame, true)
    });
});