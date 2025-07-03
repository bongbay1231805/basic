gsap.registerPlugin(ScrollTrigger) 

let path1 = document.querySelector('#path');
let path1Length = path1.getTotalLength();//path의 길이
console.log(path1Length)

path1.style.strokeDasharray = path1Length;
path1.style.strokeDashoffset = path1Length;

let tl=gsap.timeline({
    scrollTrigger:{
      trigger:".animation",
      start:"top top",
      end:"200% bottom",
      scrub:1,
      pin:true,
      markers:true
    }
})
tl.to(path1,{strokeDashoffset:0},"plane")
tl.to(".paper-plane",{offsetDistance: "100%"},"plane")

/////////////////////////////
//비행기의 방향
window.addEventListener("wheel",myFunction)

let plane=document.querySelector('.paper-plane')
function myFunction(event){
    let y=event.deltaY;
    console.log(y)

    if(y>0){
        plane.style.transform=`rotate(0deg)`;
    }else{
        plane.style.transform=`rotate(180deg)`;
    }

}
