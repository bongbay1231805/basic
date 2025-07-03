gsap.registerPlugin(ScrollTrigger) 

gsap.to(".pageOneImg", {
    y: -800,
    scrollTrigger: {
        trigger: "#page",
        pin: "#main",
        start: "top top",
        end: "+=500",
        scrub: 1, 
        pinSpacing: true,
    },
});




















// var main =  document.querySelector("#page");
// var image = document.querySelector(".pageOneImg");

// main.addEventListener("mousemove",function(dets){
//   image.style.top = 1-dets.y*0.05 + "px"
//   image.style.left = 1-dets.x *0.05 + "px"
// })
  