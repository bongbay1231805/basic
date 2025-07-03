gsap.registerPlugin(ScrollTrigger)

function lenis() {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    // console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

}
lenis()
/////////////////////////////////
$(function(){
  $(".nav>ul>li ").mouseover(function(){
    $(".nav>ul>li>ul").stop().slideDown()
    $("#header").addClass('on')
  })
  $(".nav>ul>li").mouseout(function(){
    $(".nav>ul>li>ul").stop().slideUp()
    $("#header").removeClass('on')
  })
})
/////////////////////////////////
gsap.to('.label',{
    rotation:360,
    duration:7,
    ease:"none",
    repeat:-1,
})
/////////////////////////////////
gsap.timeline()
.to('#section1 .text',{
  opacity:0,
  scrollTrigger:{
    trigger:"#section1",
    start:"top top",
    end:"bottom top",
    scrub:1
  }
})

gsap.set('#section2 .text',{x:-400})
gsap.timeline()
.to('#section2 .text',{
    x:0,
    scrollTrigger:{
        trigger:"#section2",
        start:"top 80%",
        end:"bottom center",
        scrub:1,
        opacity:1,
        duration:1
    }
})
gsap.set('#section3 .text',{x:-400})
gsap.timeline()
.to('#section3 .text',{
    x:0,
    scrollTrigger:{
        trigger:"#section3",
        start:"top 80%",
        end:"bottom center",
        scrub:1,
        opacity:1,
        duration:1
    }
})
gsap.set('#section4 .text',{x:-400})
gsap.timeline()
.to('#section4 .text',{
    x:0,
    scrollTrigger:{
        trigger:"#section4",
        start:"top 80%",
        end:"bottom center",
        scrub:1,
        opacity:1,
        duration:1
    }
})
gsap.set('#section5 .text',{y:100})
gsap.timeline()
.to('#section5 .text',{
    y:400,
    scrollTrigger:{
        trigger:"#section5",
        start:"top 100%",
        end:"bottom center",
        scrub:1,
        opacity:1,
        duration:1
    }
})


/////////////////////////////////
$(document).ready(function(){
  $(".heart").click(function(){
      $(this).toggleClass("far fas");
  });
});
/////////////////////////////////
import {
  Application
} from 'https://unpkg.com/@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app
  .load('https://prod.spline.design/hxnaZYm-OEPQwBqF/scene.splinecode')
  .then(() => {
    let bean = app.findObjectByName('bean')
    let icecoffee = app.findObjectByName('icecoffee')
    let cappuccino = app.findObjectByName('cappuccino')
    let javachip = app.findObjectByName('javachip')
    let blended = app.findObjectByName('blended')
    let tea = app.findObjectByName('tea')

    let objects = [bean, icecoffee, cappuccino, javachip, blended, tea]
        objects.forEach(function(object){
          gsap.set(object.scale,{x:0,y:0,z:0})
          gsap.to(object?.rotation,5,{y:Math.PI*2,repeat:-1,ease:"none"})
        })
        gsap.set(bean.position,{x:-500,y:0,z:0})
        gsap.set(bean.rotation,{x:0,y:0,z:0})

///////////////////////////////////////////////

//bean
gsap.timeline({
  scrollTrigger: {
    trigger: '#section3',
    start: 'top 55%',
    end: 'bottom 80%',
    scrub: 2,
  }
})
.to(bean.scale, { x: 1, y: 1, z: 1 })
.to(bean.position, { x: 500, y: 0, z: 0 })
.to(bean.rotation, { x: 0, y: 0, z: 5 })
.to(bean.position, { x: 100, y: 0, z: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '#section4',
    start: 'top 80%',
    end: 'bottom 80%',
    scrub: 2,
  }
})
.to(bean.scale, { x: 1.3, y: 1.3, z: 1.3 })
.to(bean.rotation, { x: 0, y: 16, z: 5 })
.to(bean.position,{x:300, y:0, z:0})
.to(bean.position,{x:0, y:0, z:0})

gsap.timeline({
  scrollTrigger: {
    trigger: '#section5',
    start: 'top 80%',
    end:'bottom 90%',
    scrub: 2,
  }
})
.to(bean.scale, {x:0, y:0, z:0})


//icecoffee
gsap.timeline({
  scrollTrigger: {
    trigger: '#section6',
    start: 'top 90%',
    end:'bottom 100%',
    scrub: 2,
    // markers:true
  }
})
.to(icecoffee.scale, { x: 1, y: 1, z: 1 })
.to(icecoffee.position, { x: -400, y: 0, z: 0 })
.to(icecoffee.scale, { x: 1.2, y: 1.2, z: 1.2 })
.to(icecoffee.rotation, { x: 6.3, y: 0, z: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '#section7',
    start: 'top 100%',
    end: '30% 100%',
    scrub: 1,
    // markers: true
  }
})
.to(icecoffee.position, { x: 0, y: 0, z: 0 })
.to(icecoffee.scale, { x: 0, y: 0, z: 0 })


//cappuccino
gsap.timeline({
  scrollTrigger: {
    trigger: '#section7',
    start: '30% 100%',
    end: 'bottom bottom',
    scrub: 1,
    // markers: true
  }
})
.to(cappuccino.scale, { x: 1, y: 1, z: 1 })
.to(cappuccino.position, { x: 400, y: 0, z: 0 })
.to(cappuccino.scale, { x: 1.2, y: 1.2, z: 1.2 })
.to(cappuccino.rotation, { x: 6.3, y: 0, z: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '#section8',
    start: 'top 100%',
    end: '30% 100%',
    scrub: 1,
    // markers: true
  }
})
.to(cappuccino.position, { x: 0, y: 0, z: 0 })
.to(cappuccino.scale, { x: 0, y: 0, z: 0 })


//javachip
gsap.timeline({
  scrollTrigger: {
    trigger: '#section8',
    start: '30% 100%',
    end: 'bottom bottom',
    scrub: 1,
    // markers: true
  }
})
.to(javachip.scale, { x: 1, y: 1, z: 1 })
.to(javachip.position, { x: -400, y: 0, z: 0 })
.to(javachip.scale, { x: 1.2, y: 1.2, z: 1.2 })
.to(javachip.rotation, { x: 6.3, y: 0, z: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '#section9',
    start: 'top 100%',
    end: '30% 100%',
    scrub: 1,
    // markers: true
  }
})
.to(javachip.position, { x: 0, y: 0, z: 0 })
.to(javachip.scale, { x: 0, y: 0, z: 0 })


//blended
gsap.timeline({
  scrollTrigger: {
    trigger: '#section9',
    start: '30% 100%',
    end: 'bottom bottom',
    scrub: 1,
    // markers: true
  }
})
.to(blended.scale, { x: 1, y: 1, z: 1 })
.to(blended.position, { x: 400, y: 0, z: 0 })
.to(blended.scale, { x: 1.2, y: 1.2, z: 1.2 })
.to(blended.rotation, { x: 6.3, y: 0, z: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '#section10',
    start: 'top 100%',
    end: '30% 100%',
    scrub: 1,
    // markers: true
  }
})
.to(blended.position, { x: 0, y: 0, z: 0 })
.to(blended.scale, { x: 0, y: 0, z: 0 })


// tea
gsap.timeline({
  scrollTrigger: {
    trigger: '#section10',
    start: '30% 100%',
    end: 'bottom bottom',
    scrub: 1,
    // markers: true
  }
})
.to(tea.scale, { x: 1, y: 1, z: 1 })
.to(tea.position, { x: -400, y: 0, z: 0 })
.to(tea.scale, { x: 1.2, y: 1.2, z: 1.2 })
.to(tea.rotation, { x: 6.3, y: 0, z: 0 })

gsap.timeline({
  scrollTrigger: {
    trigger: '#section11',
    start: 'top 75%',
    end: 'bottom 100%',
    scrub: 1,
    // markers: true
  }
})
.to(tea.position, { x: 420, y: 0, z: 0 })
.to(tea.scale, { x: 0, y: 0, z: 0 })


})