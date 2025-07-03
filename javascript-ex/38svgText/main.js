gsap.registerPlugin(ScrollTrigger);

const svgText = document.querySelector("#textOnPath1");
const svgText2 = document.querySelector("#textOnPath2");
console.log(svgText);

gsap.fromTo(
    [svgText, svgText2],
    {
      attr: { startOffset: "100%" },
    },
    {
      attr: { startOffset: "0%" },
      scrollTrigger: {
        trigger: ".svg",
        start: "top top",
        scrub: 1,
        end: "+=100%",
      },
    }
  );
  