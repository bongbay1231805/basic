// https://github.com/aayushchouhan24/sheryjs

Shery.mouseFollower();//커서가 생긴다
Shery.makeMagnet(".magnet");
Shery.hoverWithMediaCircle(".hvr", {
  videos: ["./0.mp4", "./2.mp4", "./3.mp4"],
});

// gsap.to(".fleftelm", {
//   scrollTrigger: {
//     trigger: "#fimages",
//     pin: true,
//     start: "top 60%",
//     //end: "bottom bottom",
//     endTrigger: ".last",
//     scrub: 1,
//   },
//   y: "-300%",
//   ease: Power1,
// });

// let sections = document.querySelectorAll(".fleftelm");
// Shery.imageEffect(".images", {
//   style: 4,//img태그가 4개이다
//   //config: { onMouse: { value: 1 } },
//   slideStyle: (setScroll) => {
//     sections.forEach(function (section,index) {
//       ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         scrub: 1,
//         markers:true,
//         // onUpdate: function (prog) {
//         //   console.log(prog)
//         //   setScroll(prog.progress + index);
//         // },
//       });
//     });
//   },
// });

// gsap.to(".fleftelm", {
//   scrollTrigger: {
//     trigger: ".fleftelm",
//     pin: true,
//     start: "top 60%",
//     //end: "bottom bottom",
//     endTrigger: ".last",
//     scrub: 1,
//     onEnter:()=>textTarket,
//   },
//   ease: Power1,
// });


// let textTarket=()=>{
// Shery.textAnimate(".text-target" /* Element to target.*/, {
//   //Parameters are optional.
//   style: 1,
//   y: 10,
//   delay: 0.1,
//   duration: 2,
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   multiplier: 0.1,
// });
// }







// gsap.to(".fleftelm", {
//   scrollTrigger: {
//     trigger: ".fleftelm",
//     //pin: true,
//     start: "top 60%",
//     endTrigger: ".last",
//     scrub: 1,
//     onEnter: animateTextTargets, // 여러 .text-target 엘리먼트에 대한 애니메이션을 시작하는 함수
//   },
//   ease: Power1,
// });

// function animateTextTargets() {
//   // 여러 .text-target 엘리먼트를 선택
//   const textTargets = document.querySelectorAll(".text-target");

//   // 각 .text-target 엘리먼트에 대해 애니메이션 적용
//   textTargets.forEach((textTarget, index) => {
//     Shery.textAnimate(textTarget, {
//       //Parameters are optional.
//       style: 1,
//       y: 10,
//       delay: 0.1 * index, // 각 엘리먼트에 대해 다른 지연 값을 적용하려면 인덱스를 사용할 수 있습니다.
//       duration: 2,
//       ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//       multiplier: 0.1,
//     });
//   });
// }







    Shery.textAnimate(".text-target", {
      //Parameters are optional.
      style: 1,
      y: 10,
      duration: 1,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      multiplier: 0.1,
    });
