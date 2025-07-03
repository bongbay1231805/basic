gsap.registerPlugin(ScrollTrigger);

let world=document.querySelector(".world")
let stageEle=document.querySelector(".stage")
let houseEle=document.querySelector(".house")
let mousePos={x:0,y:0}

gsap.to(houseEle ,{
    scrollTrigger:{
        trigger:world,
        start:"top top",
        end:"+=400%",
        pin:true,
        scrub:2,
        onUpdate:(self)=>{
            // console.log(self.progress)
            let mapF=gsap.utils.mapRange(0,1,-490,480)
            let value=mapF(self.progress)
            console.log(value)

            houseEle.style.transform=`translateZ(${value}vw)`;
            // transform:translateZ(-490vw);
        }
    }
  
})

window.addEventListener("mousemove",function(e){
    mousePos.x=(e.clientX / window.innerWidth)*2
    mousePos.y=-(e.clientY / window.innerHeight)*2
    stageEle.style.transform=`rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`
})