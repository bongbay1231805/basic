gsap.registerPlugin(Flip)
let container=document.querySelector(".container")
let box=document.querySelector(".box")

document.addEventListener("click",()=>{
  //F 초기값
  let state=Flip.getState(".box")

  //L 라스트값
  container.appendChild(box)

  Flip.from(state,{durtation:1,ease:"power1.out"})
})