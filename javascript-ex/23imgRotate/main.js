gsap.registerPlugin(ScrollTrigger)

function smooth() {
  const lenis = new Lenis()
  lenis.on('scroll', (e) => {
    console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}

// smooth()
///////////////////////////////////

let animeCard = document.querySelector(".anime-card-inner")

gsap.set(animeCard, {
  rotateY: 90,
  top: "50%",
  left: "50%",
  xPercent: -50,
  yPercent: -50,
  width: "40vh",
  height: "40vh",
  scale: 1
})

gsap.set(".anime-card-front img", {
  attr: {
    src: "https://www.yudiz.com/codepen/gsap-landing-page/tanjiro.jpg"
  }
})
gsap.set(".anime-card-back img", {
  attr: {
    src: "https://www.yudiz.com/codepen/gsap-landing-page/zenitsu.jpg"
  }
})
gsap.set(".anime-card", {
  x: "50%",
  y: "50%"
})
gsap.set(".banner-content", {
  opacity: 0,
  yPercent: 50
})
gsap.set(".main-txt", {
  opacity: 0,
  yPercent: 50,
  xPercent: -50
})

let mainText = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner",
      start: "top 30%",
      end: "bottom 90%",
      scrub: 1
    }
  })
  .to(".main-txt", {
    opacity: 1,
    yPercent: -50,
    duration: 2
  })
  .to(".main-txt", {
    opacity: 0,
    ease: "linear",
    duration: 2
  }, "+=2")

  //글자 묶음
  .to(".banner-content", {
    ease: "linear",
    yPercent: 150,
    opacity: 1,
    duration: 1
  }, "+=1")


//img set
let tl_img = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner",
      start: "top 70%",
      end: "+=330%",
      scrub: 1,
      // marks: true
    }
  })
  .to(animeCard, {
    rotationY: 0,
    ease: "Expo.easeIn",
    duration: 2,
    scale: 1,
    width: "100vw",
    height: "100vh",
  })
  .to(animeCard, {
    height: "60vh",
    width: "535px",
    left: "calc(50% + 500px)",
    duration: 2,
    delay: 0.5,
  })
  //오른쪽으로 이동하면서 이미지 바뀐다.
  .to(".main-wallpaper", {
    opacity: 0,
    delay: 0.5
  }, "<") //앞의 애니와 같은 시간에 이루어짐

  //두번째 banner
  .to(animeCard, {
    ease: "linear",
    rotationY: -180,
    height: "100vh",
    width: "100vw",
    left: "50%",
    duration: 2
  })
  .to(animeCard, {
    ease: "linear",
    rotationY: -180,
    height: "100vh",
    width: "100vw",
    left: "50%",
    duration: 2
  })
  .to(animeCard, {
    ease: "linear",
    rotationY: -360,
    height: "60vh",
    width: "535px",
    left: "calc(50% - 550px)",
    duration: 2
  })
  .to(animeCard, {
    ease: "linear",
    rotationY: -180,
    height: "100vh",
    width: "100vw",
    left: "50%",
    duration: 2
  })

gsap.to(".anime-card", {
  ease: "linear",
  scrollTrigger: {
    trigger: ".anime-card",
    start: "top top",
    end: "top bottom",
    endTrigger: ".slider-card",
    pin: true,
    pinSpacing: false,
    scrub: 1
  }
})

// gsap.set(".anime-card-front img", {
//   attr: {
//     src: "https://www.yudiz.com/codepen/gsap-landing-page/tanjiro.jpg"
//   }
// })
// gsap.set(".anime-card-back img", {
//   attr: {
//     src: "https://www.yudiz.com/codepen/gsap-landing-page/zenitsu.jpg"
//   }
// })

//이미지 바꾸기
gsap.to(".anime-card-front img", {
  attr: {
    src: "https://www.yudiz.com/codepen/gsap-landing-page/inosuke.jpg"
  },
  scrollTrigger: {
    trigger: ".banner-three",
    start: "top bottom",
    scrub: 1
  }
})
gsap.to(".anime-card-back img", {
  attr: {
    src: "https://www.yudiz.com/codepen/gsap-landing-page/nezuko.png"
  },
  scrollTrigger: {
    trigger: ".banner-four",
    start: "top bottom",
    end:"top bottom",
    endTrigger:".slider-card",
    scrub: 1
  }
})

//slider-card-left
gsap.set(".slider-left img:first-child",{xPercent:50})
gsap.set(".slider-left img:not(:first-child)",{xPercent:100})

gsap.to(".slider-left .img-1",{
  ease:"none",
  xPercent:-95,
  scale:0.6,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+180+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-left .img-2",{
  ease:"none",
  xPercent:-70,
  scale:0.7,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+360+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-left .img-3",{
  ease:"none",
  xPercent:-40,
  scale:0.8,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+540+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-left .img-4",{
  ease:"none",
  xPercent:-10,
  scale:0.9,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+720+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-left .img-5",{
  ease:"none",
  xPercent:20,
  scale:1,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+800+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})


//slider-card-right
gsap.set(".slider-right img:first-child",{xPercent:-50})
gsap.set(".slider-right img:not(:first-child)",{xPercent:-100})

gsap.to(".slider-right .img-1",{
  ease:"none",
  xPercent:95,
  scale:0.6,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+180+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-right .img-2",{
  ease:"none",
  xPercent:70,
  scale:0.7,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+360+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-right .img-3",{
  ease:"none",
  xPercent:40,
  scale:0.8,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+540+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-right .img-4",{
  ease:"none",
  xPercent:10,
  scale:0.9,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+720+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})

gsap.to(".slider-right .img-5",{
  ease:"none",
  xPercent:-20,
  scale:1,
  scrollTrigger:{
    trigger:".slider-card",
    start:"center+="+800+" center",
    end:"center+="+900+" center",
    scrub:1
  }
})



//slider-card에 공간 만들고 pin설정
gsap.to(".slider-card",{
  ease:"linear",
  scrollTrigger:{
    trigger:".slider-card",
    start:"center center",
    end:"+=1000",
    pin:false,
    pin:true,
    scrub:1
  }
})