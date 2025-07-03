gsap.registerPlugin(ScrollTrigger) 



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
