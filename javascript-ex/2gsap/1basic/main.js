gsap.registerPlugin(ScrollTrigger)

gsap.timeline({
    scrollTrigger:{
        trigger:'.sec02 ul',
        start:"top 90%",
        end:"20% 20%",
        scrub:true,
        markers:true,
    }
})
.from('.sec02 li:nth-child(1)',{y:400},"0.2")
.from('.sec02 li:nth-child(2)',{y:400},"0.4")
.from('.sec02 li:nth-child(3)',{y:400},"0.6")
.from('.sec02 li:nth-child(4)',{y:400},"0.8")

gsap.timeline({
    scrollTrigger:{
        trigger:".sec03",
        start:"top 100%",
        end:"100% 100%",
        scrub:true,
        markers:true,
    }
})
// .fromTo(뭐를,{from},{To})
.fromTo(".sec03 .a",{y:'400%'},{y:0},1.2)
.fromTo(".sec03 .b",{y:'400%'},{y:0},1.4)
.fromTo(".sec03 .c",{y:'400%'},{y:0},1.6)
.fromTo(".sec03 .d",{y:'400%'},{y:0},1.8)
.fromTo(".sec03 .e",{y:'400%'},{y:0},2)