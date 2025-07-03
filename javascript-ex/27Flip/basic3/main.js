gsap.registerPlugin(Flip)

let group=document.querySelector(".group")
let button=document.querySelector(".button")
button.addEventListener("click",()=>{
  //F 초기 상태
  let state=Flip.getState(".group, .box")

  //L 마지막 상태
  group.classList.toggle("reorder")

  Flip.from(state,{
    absolute: true, //크기 동일
    duration:0.5,
    stagger:0.2, //규칙적으로 도착함
    ease:"power1.inOut"
  })
  
})

// let activeItem; //어떤 항목이 열려있는지 추적함

// gsap.set(detailContent,{yPercent:-100})

// function showDetails(item){
//   let onLoad=()=>{
//     // Flip.fit(무엇을, 어디에, 어떻게)
//     Flip.fit(details, 어디에, 어떻게)
//   }
// }
// items.forEach((item)=>item.addEventListener("click",()=>showDetails(item)))

// gsap.to(".app",{autoAlpha:1,duration:0.2})
// gsap.from(".item",{autoAlpha:0,yPercent:30,stagger:0.05})