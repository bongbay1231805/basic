  // // document.documentElement.classList.add("overflow");
  // // document.body.classList.add("overflow");

  // // setTimeout(() => {
  // //   document.documentElement.classList.remove("overflow");
  // //   document.body.classList.remove("overflow");
  // // }, 2500);

  gsap.registerPlugin(ScrollTrigger);

  var $animeCard = document.querySelector(".anime-card-inner");
  //loader img
  gsap.set($animeCard, {//메인 이미지
    rotationY: 90,
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    width: "40vh",
    height: "40vh",
    scale: 1
  });

  // //img set
  gsap.set(".anime-card-front img", {
    attr: { src: "https://www.yudiz.com/codepen/gsap-landing-page/tanjiro.jpg" }
  });
  gsap.set(".anime-card-back img", {
    attr: { src: "https://www.yudiz.com/codepen/gsap-landing-page/zenitsu.jpg" }
  });

  // //Main card-wrapper 화면전체 영역잡는다.이미지들의 전체영역
  gsap.set(".anime-card", { x: "50%", y: "50%" });
  gsap.set(".banner-content", { opacity: 0, yPercent: 50 });
  // //🚀제목글자  Main-text  Kimetsu no Yaiba
  // //Main text load   
  gsap.set(".main-txt", { opacity: 0, yPercent: 50 });

  const mainTxt = gsap.timeline({
    scrollTrigger: {
      trigger: ".banner",
      start: "top 30%",
      end: "bottom 90%",
      markers: false,
      scrub: 1
    }
  });

  mainTxt.to(".main-txt", { opacity: 1, yPercent: -50, duration: 2 })

  //Main text opacity down
 .to(".main-txt", { opacity: 0, ease: "linear",duration: 2 },"+=2")
   
//💚글자묶음
.to(".banner-content", {
  ease: "linear",
  yPercent: 150,
  opacity: 1,
},"+=1");
 //end💚글자묶음


  // 🚀end 제목글자 

 
 
 
   // 🍅이미지 나타나기 //loader to scale
   const tl_img = gsap.timeline({
      scrollTrigger:{
        trigger:".banner",
        start:"top 70%",
         end:"+=330%",
         scrub:1,
         markers:true,
        //pin:true
       toggleActions:"restart resume resume reverse",
    }
  })
  .to($animeCard, {
    rotationY: 0,
    ease: Expo.easeIn,
    duration:2,
    scale: 1,
    width: "100vw",
    height: "100vh"
  })
   // end🍅이미지 나타나기 
  // 🍄오른쪽으로 이동하기 작아짐 //Banner one image scale down
 
    .to($animeCard, {
      height: "60vh",
      width: "535px",
      left: "calc(275px + (50% - 660px) + 770px)",
      duration: 2,
      delay:0.5
   
    })

   // 🍄오른쪽으로 이동하기 작아짐 //Banner one image scale down

   //🍰 이미지 바뀌기
  .to(".main-wallpaper", {
    opacity: 0,
    delay:0.5
  },"<")
   //end 🍰 이미지 바뀌기
  // //Banner text-animation

  


  // // //Banner two animation
  .to($animeCard, {
    ease: "linear",
      rotationY: -180,
      height: "100vh",
      width: "100vw",
      left: "50%",
      duration:2
    
  })
   .to($animeCard, {
      rotationY: -180,
      height: "100vh",
      width: "100vw",
      left: "50%",
      duration: 2,
    })
      .to($animeCard, {
      rotationY: -360,
      height: "60vh",
      width: "535px",
      left: "calc((50% - 660px) + 275px)",
      duration: 2,
    })
    .to($animeCard, {
        rotationY: -180,
        height: "100vh",
        width: "100vw",
        left: "50%",  duration: 2,
      });


  // // // Main wrapper card
  gsap.to(".anime-card", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".anime-card",
      start: "top top",
      end: "top bottom",
      endTrigger: ".slider-card ",
      markers: false,
      pin: true,  //.anime-card 를 fixed를 주지 말아야한다//여기서 고정위치를 잡는다.
      pinSpacing: false,
      scrub: 1
    }
  });




  // // //slider-left img animation
  gsap.set(".slider-left img:first-child", { xPercent: 50 });
  gsap.set(".slider-left img:not(:first-child)", { xPercent: 100 });
  gsap.to(".slider-left .img-1", {
    ease: "none",
    xPercent: -95,
    scale: 0.6,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 180 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-2", {
    ease: "none",
    xPercent: -70,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 360 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-3", {
    ease: "none",
    xPercent: -40,
    scale: 0.8,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 540 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-4", {
    ease: "none",
    xPercent: -10,
    scale: 0.9,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 720 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-left .img-5", {
    ease: "none",
    xPercent: 20,
    scale: 1,
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center+=" + 800 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });

  // // // slider right img animation
   gsap.set(".slider-right img:first-child", { xPercent: -50 });
   gsap.set(".slider-right img:not(:first-child)", { xPercent: -100 });
  gsap.to(".slider-right .img-1", {
    ease: "none",
    xPercent: 95,
    scale: 0.6,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 180 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-2", {
    ease: "none",
    xPercent: 70,
    scale: 0.7,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 360 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-3", {
    ease: "none",
    xPercent: 40,
    scale: 0.8,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 540 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-4", {
    ease: "none",
    xPercent: 10,
    scale: 0.9,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 720 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });
  gsap.to(".slider-right .img-5", {
    ease: "none",
    xPercent: -20,
    scale: 1,
    scrollTrigger: {
      trigger: ".slider-card ",
      start: "center+=" + 800 + " center",
      end: "center+=" + 900 + " center",
      markers: false,
      scrub: 1
    }
  });

  // // //slider card
  gsap.to(".slider-card", {
    ease: "linear",
    scrollTrigger: {
      trigger: ".slider-card",
      start: "center center",
      end: "+=1000",
      markers: false,
      pin: true,
      pinSpacing: true,
      scrub: 1
    }
  });

  // // // image source changed
  gsap.to(".anime-card-front img", {
    attr: {
      src: "https://www.yudiz.com/codepen/gsap-landing-page/inosuke.jpg"
    },
    scrollTrigger: {
      trigger: ".banner-three",
      start: "top bottom",
      //end: "top bottom",
     // endTrigger: ".slider-card ",
      markers: false,
      scrub: 1
    }
  });

  gsap.to(".anime-card-back img", {
    attr: { src: "https://www.yudiz.com/codepen/gsap-landing-page/nezuko.png" },
    scrollTrigger: {
      trigger: ".banner-four",
      start: "top bottom",
      end: "top bottom",
      endTrigger: ".slider-card ",
      markers: false,
      scrub: 1
    }
  });