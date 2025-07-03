

gsap.registerPlugin(ScrollTrigger)


const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/////////////////////////////////////////

let backColor=document.querySelectorAll("[data-bgcolor]")//속성은 []안으로
// console.log(backColor)
// backColor.forEach(function(one,two,three){
  // one --> backColor 배열 안의 요소들이 차례로 들어옴
  // two --> one의 변수 안에 할당된 아이템의 index 번호
  // three --> backColor 원배열 자체
// })

backColor.forEach(function(item,index){
  let prevBg=index == 0 ?"":backColor[index - 1].dataset.bgcolor
  ScrollTrigger.create({
    trigger:item,
    start:"top 50%",
    end:"bottom 5%",
    duration:1,
    onEnter:function(){
      gsap.to("#contents",{
        backgroundColor:item.dataset.bgcolor
      })
    },
    onLeaveBack:function(){
      gsap.to("#contents",{
        backgroundColor:prevBg
      })
    }
  })
})

// 수평슬라이드
let horSection=document.querySelectorAll('.port_desc .port');

gsap.to(horSection,{
  xPercent:-97 * (horSection.length - 1),
  scrollTrigger:{
    trigger:".port_desc",
    start:"top 20%",
    end:"+=5000",
    scrub:1,
    pin:true
  }
})





//설명
// let sec=document.querySelector("#section1")
// sec.width=300
// console.log(sec.getAttribute("id"))
// sec.setAttribute("id","아이디")
// sec.setAttribute("data-bgcolor","red")
// // data-bgcolor
// console.log(sec.getAttribute("data-bgcolor"))
// sec.dataset.bgcolor="검정" //dataset=data-
// console.log(sec.dataset.bgcolor)