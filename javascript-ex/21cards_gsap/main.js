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

///////////////////////////////////

let cardWrapper=document.querySelectorAll(".cards_item");
let cardsEl=document.querySelectorAll(".cards_item .cards_el");
console.log(cardsEl)

cardWrapper.forEach(function(e,i){//e:아이템, i:아이템의 index
    let card=cardsEl[i]
    let img=e.querySelector(".cards_img img");
    let scale =1;
    let rotate=0;

    if(i !== cardsEl.length - 1){
        scale=0.9 + 0.025 * 1;
        rotate= -10;
    }

    gsap.to(card,{
        scale:scale,
        rotateX:rotate,
        transfromOrigin:"center top", //중심축 탑으로 이동
        ease:"none",
        scrollTrigger:{
            trigger:e,
            start:"top " + (100 + 40 * i),
            end:"bottom +=650px", //+= start에서 시작하는 위치에서 650px에서 끝낸다.
            pin:e,
            endTrigger:".end-anim", // 각각의 시작시점에서 애니메이션이 시작되는 것이 아닌 end-anim에서 시작해서 650지점 지난 시점이 바닥이 되어 끝나도록.
            scrub:1,
            pinSpacing:false, //pin을 만들때 공간을 만들지 않겠다.
        }
    },0)
})