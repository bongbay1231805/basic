gsap.registerPlugin(ScrollTrigger);

let contentHolderHeight=document.querySelector('.content-holder').offsetHeight;
let imgHolderHeight=window.innerHeight;
let additionalScrollHeight=window.innerHeight;

let totalBodyHeight=contentHolderHeight + imgHolderHeight + additionalScrollHeight;
document.body.style.height=`${totalBodyHeight}px`;

ScrollTrigger.create({
    trigger:'.website-content',
    start:"bottom top",
    end:"+=500% bottom",
    markers:true,
    onEnter:()=>{
        gsap.set(".website-content",{position:"absolute",top:"195%"})
    },
    onLeaveBack:()=>{
        gsap.set(".website-content",{position:"fixed",top:"0"})
    }

});

gsap.to(".header .letters:first-child",{
    x:() => -innerWidth *3,
    scale:10,
    ease: "power2.inOut",
    scrollTrigger:{
        start:'top top',
        end:`+=200%`,
        scrub:1,
        //markers:true
    }
})

gsap.to(".header .letters:last-child",{
    x:() => innerWidth *3,
    scale:10,
    ease: "power2.inOut",
    scrollTrigger:{
        start:'top top',
        end:`+=200%`,
        scrub:1,
        //markers:true
    }
})


gsap.to(".img-holder",{
    rotation:0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    scrollTrigger:{
        start:'top top',
        end:`+=200%`,
        scrub:1,
        //markers:true
    }
},"<")

gsap.to(".img-holder img",{
    scale:1,
    ease: "power2.inOut",
    scrollTrigger:{
        start:'top top',
        end:`+=200%`,
        scrub:1,
        //markers:true
    }
},"<")