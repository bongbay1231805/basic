gsap.registerPlugin("ScrollTrigger");

let wheel = document.querySelector(".wheel");
let images = document.querySelectorAll(".wheel__card");

function setup(){
    let radius = wheel.offsetWidth / 2;
    let center = wheel.offsetWidth / 2;
    let total = images.length;
    //let slice =360/total
    let slice =(2*Math.PI)/total

    let centerX = wheel.offsetWidth / 2;
    let centerY = wheel.offsetHeight / 2;

    images.forEach((item, i)=>{
        let angle=i * slice;

        let initalRotation=(angle * 180)/Math.PI - 90

        let x=center + radius*Math.cos(angle);
        let y=center + radius*Math.sin(angle);

        gsap.set(item,{
            rotation:initalRotation,
            xPercent:-50,
            yPercent:-50,
            left:x+"px",
            top:y+"px",
        })
    })
}

document.querySelector(".page").addEventListener("click",function(){
    images.forEach((image)=>{
        image.classList.remove('active')
    })

},true)

images.forEach((item)=>{
 item.addEventListener('click',function(){
    images.forEach((image)=>{
        image.classList.remove('active')
    })
    item.classList.add('active')
 })
})

gsap.to(".wheel",{
    rotate:()=>-360,
    duration:images.length,
    scrollTrigger:{
        trigger:".page",
        start:"top top",
        end:"+=1000",
        pin:true,
        scrub:1,
    },
    onUpdate:()=>{
        images.forEach((image)=>{
            image.classList.remove('active')
        })
    }
})





setup();
window.addEventListener("resize",setup)

