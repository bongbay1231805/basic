gsap.registerPlugin(ScrollTrigger)

let workInfoItems=document.querySelectorAll(".work__photo-item")
workInfoItems.forEach((item,index)=>{
  item.style.zIndex=workInfoItems.length - index
  // workInfoItems.length = 4로 시작하고 index=0
  // 원래는 막내가 제일 위였는데 제일 큰형이 맨 위로
})

//"inset(top right bottom left)"
gsap.set(".work__photo-item",{
  clipPath:function(){
    return "inset(0px 0px 0px 0px)"
  }
})

let ani = gsap.to(".work__photo-item:not(:last-child)",{
  clipPath:function(){
    return "inset(0px 0px 100% 0px)"
  },
  stagger:.5,
  ease:"none"
})

ScrollTrigger.create({
  trigger:".work",
  start:"top top",
  end:"bottom bottom",
  animation:ani,
  scrub:1
})