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
.load('https://prod.spline.design/dkfaroo-XbJuhCKA/scene.splinecode')
.then(()=>{
    let Pretzel=app.findObjectByName('Pretzel')
    let Hamburger=app.findObjectByName('Hamburger')
    let Cake=app.findObjectByName('Cake')
    let Donut=app.findObjectByName('Donut')
    let Plate=app.findObjectByName('Plate')

    let objects=[Pretzel,Hamburger,Cake,Donut,Plate]

    function showObject(object,scale){
      objects.forEach((object)=>{
        gsap.to(object.scale,{x:0,y:0,z:0})})
        gsap.to(object.scale,0.3,{x:scale, y:scale, z:scale, delay:0.5, ease:"expo.inOut"},0)
    }

    function reduceObjectNo(duration){
      objects.forEach((object)=>{
        gsap.to(object.scale,duration,{x:0,y:0,z:0},0)
        gsap.to(Plate.scale,duration,{x:1,y:1,z:1},0)
    })
    }

    objects.forEach((object)=>{
        gsap.set(object.scale,{x:0,y:0,z:0})
        gsap.to(object.rotation,10,{y:Math.PI*2,repeat:-1,ease:"none"})
    })
    gsap.set(Pretzel.scale,{x:1,y:1,z:1})
    gsap.set(Pretzel.position,{x:300,y:0,z:0})


    gsap.timeline({
        scrollTrigger:{
            trigger:".first",
            start:"top top",
            end:"90% top",
            scrub:2,
            markers:true,
        }
    })
    .to(Pretzel.position,{x:0,y:0,z:0},0)
    .to(Pretzel.rotation,{x:Math.PI * 2},0)

    gsap.timeline({
        scrollTrigger:{
            trigger:".first",
            start:"100% top",
            toggleActions:"restart none reverse none"
        }
    })
    .to(Pretzel.scale,{x:0,y:0,z:0},0)
    /////
    gsap.timeline({
        scrollTrigger:{
            trigger:".second",
            start:"top top",
            end:"100% top",
            scrub:2
        }
    })
    .to(Hamburger.scale,{x:1,y:1,z:1},0)
    .to(Hamburger.rotation,{x:Math.PI * 2,ease:"expo.inOut"},0)
    /////
    gsap.timeline({
        scrollTrigger:{
            trigger:".third",
            start:"top top",
            end:"100% top",
            scrub:2
        }
    })
    .to(Hamburger.scale,{x:0,y:0,z:0},0)
    .to(Cake.scale,{x:1,y:1,z:1},0)
    .to(Cake.rotation,{x:Math.PI * 2,ease:"expo.inOut"},0)
    /////
    gsap.timeline({
        scrollTrigger:{
            trigger:".four",
            start:"top top",
            end:"100% top",
            scrub:2
        }
    })
    .to(Cake.scale,{x:0,y:0,z:0},0)
    .to(Donut.scale,{x:1,y:1,z:1},0)
    .to(Donut.rotation,{x:Math.PI * 2,ease:"expo.inOut"},0)
    /////
    gsap.timeline({
        scrollTrigger:{
            trigger:".five",
            start:"top top",
            end:"95% top",
            scrub:2,
            onEnterBack:()=>{reduceObjectNo(0)},
            onLeaveBack:()=>{
              reduceObjectNo(0)
            }
        }
    })
    .to(Donut.scale,{x:0,y:0,z:0},0)
    .to(Plate.scale,{x:1,y:1,z:1},0)
    .to(Plate.rotation,{x:Math.PI * 2,ease:"expo.inOut"},0)


    document.querySelector('#toPretzel').addEventListener("click",()=>{showObject(Pretzel,1)})
    document.querySelector('#toHamburger').addEventListener("click",()=>{showObject(Hamburger,1)})
    document.querySelector('#toCake').addEventListener("click",()=>{showObject(Cake,1)})
    document.querySelector('#toDonut').addEventListener("click",()=>{showObject(Donut,1)})
    document.querySelector('#toPlate').addEventListener("click",()=>{showObject(Plate,1)})

})
