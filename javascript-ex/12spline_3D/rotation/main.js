gsap.registerPlugin(ScrollTrigger)
function lenis(){
    const lenis = new Lenis()
    
    lenis.on('scroll', (e) => {
      // console.log(e)
    })
    
    lenis.on('scroll', ScrollTrigger.update)
    
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

}
lenis()




import { Application } from 'https://unpkg.com/@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app
.load('https://prod.spline.design/lGbFqJJNNEymupwX/scene.splinecode')
.then(()=>{
   let rotate=app.findObjectByName('rotate')

   gsap.set(rotate.scale,{x:2,y:2,z:2})
   gsap.set(rotate.position,{x:0,y:0,z:0})
   gsap.timeline({
    scrollTrigger:{
        trigger:".third",
        start:"top top",
        end:"+=300%",
        scrub:2,
        pin:true
    }
    })
    .to(rotate.rotation,{y:-Math.PI * 6, x:0},0)
    .to(rotate.position,{x:0,y:4500},0)
    .to(rotate.scale,{x:1,y:1,z:1},0)
})
