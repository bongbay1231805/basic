

gsap.registerPlugin(ScrollTrigger);

let initalPath="M0 718V121C26 110 263.03 -0.183935 496.5 0.5C731.72 1.18906 960.858 105.442 999 121V718H0Z"
let targetPath="M0 596.999V-0.000183105C0 -0.000183105 263.03 77.8161 496.5 78.5C731.72 79.1891 999 -0.000183105 999 -0.000183105V596.999H0Z"

let svgWrap = document.querySelectorAll(".svg-container");

svgWrap.forEach((svgWrap)=>{
  let itemSvg=svgWrap.querySelector("svg path")

  itemSvg.setAttribute("d",initalPath)//초기값

  gsap.to(itemSvg,{
    attr:{d:targetPath},
    scrollTrigger: {
      trigger: svgWrap,
      start: "top 70%",
      end: "+=20%",
      ease: "linear",
      scrub: 1,
      markers: true,
    },
  })
})