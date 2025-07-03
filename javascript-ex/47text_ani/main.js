Splitting();
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".rotatingHeader",
    start: "top 70%",
    end: "+=200 70%",
    scrub: 1,
    pin: true,
  },
});

function initHeaders() {
    let header = document.querySelector(".rotatingHeader");
    let original = header.querySelector("h1");
    let clone = original.cloneNode(true);
    header.appendChild(clone);

    gsap.set(clone, { yPercent: -100 });

    let originalSplit = document.querySelectorAll("h1:first-child .char");
    let cloneSplit = document.querySelectorAll("h1:last-child .char");

    gsap.set(cloneSplit, {
        rotationX: -90,
        opacity: 0,
        transformOrigin: "50% 50% -50",
      });
    
      tl.to(originalSplit, { duration: 0.4, rotationX: 90, stagger: 0.05,transformOrigin: "50% 50% -50" });
      tl.to(originalSplit, { duration: 0.4, opacity: 0, stagger: 0.05 }, 0);
    
      tl.to(cloneSplit, { duration: 0.05, stagger: 0.05, opacity: 1 }, 0.001);
      tl.to(cloneSplit, { duration: 0.4, rotationX: 0, stagger: 0.05 }, 0);
}

initHeaders()