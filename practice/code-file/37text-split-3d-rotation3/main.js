Splitting();

  
document.querySelectorAll(".rotatingHeader").forEach((header,index)=>{

    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 70%",
          //end: "+=200 bottom",
          scrub:1,
          //pin: true,
        },
      });

function initHeaders(header) {
  //let header = document.querySelector(".rotatingHeader");
  let original = header.querySelector("h1");
  let clone = original.cloneNode(true);
  header.appendChild(clone);
  gsap.set(clone, { yPercent: -100 });

//   let originalSplit = document.querySelectorAll("h1:first-child .char");
//   let cloneSplit = document.querySelectorAll("h1:last-child .char");
let originalSplit=Splitting({target:original})
let cloneSplit=Splitting({target:clone})

console.log(originalSplit)

  gsap.set(cloneSplit[0].chars, {
    rotationX: -90,
    opacity: 0,
    transformOrigin: "50% 50% -50",
  });

  let stagger= {each:0.05,delay:index * 10}

  tl.to(originalSplit[0].chars, { duration: 0.4, rotationX: 90, stagger:stagger,transformOrigin: "50% 50% -50" });
  tl.to(originalSplit[0].chars, { duration: 0.4, opacity: 0, stagger:stagger }, 0);

  tl.to(cloneSplit[0].chars, { duration: 0.05, stagger:stagger, opacity: 1 }, 0.001);
  tl.to(cloneSplit[0].chars, { duration: 0.4, rotationX: 0, stagger: stagger }, 0);
}

initHeaders(header);


})