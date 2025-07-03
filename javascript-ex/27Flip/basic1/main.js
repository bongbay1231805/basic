gsap.registerPlugin(Flip)


//Flip
//F -- First
//l -- Last
//i -- Invert
//p -- Play

let originalContainer=document.querySelector(".originalContainer")
let box=document.querySelector(".box")
let newContainer=document.querySelector(".newContainer")
let button=document.querySelector("button")
//부모.appendChild(자식이름)
button.addEventListener("click",function(){
  let state = Flip.getState(box);//Flip의 F(초기 상태)
   (box.parentNode === originalContainer ? newContainer: originalContainer).appendChild(box)//Flip의 | (최종상태)
  Flip.from(state,{duration:1,ease:"power1.inOut",scale:true})

  //scale:true --> width와 height을 조절하여 크기를 바꾸겠다.
   
})